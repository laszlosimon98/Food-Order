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

const Menu = (): ReactElement => {
  const { isOverlayVisible } = useAppSelector((state) => state.overlay.data);

  const { isCartVisible } = useAppSelector((state) => state.cart.data);

  const dispatch = useAppDispatch();

  return (
    <>
      <header className="top-0 h-20 w-full flex flex-row justify-between bg-background items-center px-10 z-10">
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
            <CartItemCounter>10</CartItemCounter>
          </Icon>
          {isCartVisible && <Cart></Cart>}
        </div>
      </header>
    </>
  );
};

export default Menu;
