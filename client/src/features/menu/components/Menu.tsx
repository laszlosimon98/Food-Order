import Navigation from "@/menu/components/Navigation";
import { useAppDispatch, useAppSelector } from "@/storeHooks/store.hooks";
import { closeOverlay, openOverlay } from "features/overlay/slice/overlaySlice";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

import {
  faBars,
  faCartShopping,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "@/shared/components/Icon";
import Cart from "features/cart/components/Cart";
import { closeCart, toogleCart } from "features/cart/slice/cartSlice";
import CartItemCounter from "features/cart/components/CartItemCounter";
import CartItem from "features/cart/components/CartItem";

const Menu = (): ReactElement => {
  const { isOverlayVisible } = useAppSelector((state) => state.overlay.data);
  const { isCartVisible } = useAppSelector((state) => state.cart.data);

  const dispatch = useAppDispatch();
  const { cartItems, totalItems } = useAppSelector((state) => state.cart.data);

  return (
    <>
      <header
        className="top-0 h-20 w-full flex flex-row justify-between bg-background items-center px-10 z-10"
        onClick={() => {
          if (isCartVisible) {
            dispatch(closeCart());
          }
        }}
      >
        <Link to={"/"}>
          <h1 className="text-3xl font-bold  italic hover:scale-105 transition-all">
            Ételrendelő
          </h1>
        </Link>

        <div className="flex gap-8 flex-row-reverse md:flex-row">
          <div className="md:hidden">
            {!isOverlayVisible && (
              <Icon
                icon={faBars}
                size="2x"
                onClick={() => {
                  dispatch(openOverlay());
                  dispatch(closeCart());
                }}
              />
            )}

            {isOverlayVisible && (
              <Icon
                icon={faClose}
                size="2x"
                onClick={() => dispatch(closeOverlay())}
              />
            )}
          </div>

          <Navigation
            isOverlayVisible={isOverlayVisible}
            closeMenu={() => dispatch(closeOverlay())}
          />

          <Icon
            icon={faCartShopping}
            size="2x"
            onClick={() => dispatch(toogleCart())}
          >
            {totalItems > 0 && <CartItemCounter>{totalItems}</CartItemCounter>}
          </Icon>

          {isCartVisible && (
            <Cart>
              {Object.keys(cartItems).length > 0 ? (
                Object.keys(cartItems).map((id) => {
                  return <CartItem key={id} id={id} />;
                })
              ) : (
                <div className="h-full flex justify-center items-center">
                  A kosár üres
                </div>
              )}
            </Cart>
          )}
        </div>
      </header>
    </>
  );
};

export default Menu;
