import CartItemContainer from "@/features/cart/components/CartItemContainer";
import CartTotal from "@/features/cart/components/CartTotal";
import { clearCart } from "@/features/cart/slice/cartSlice";
import Button from "@/features/shared/components/Button";
import DropdownContainer from "@/features/shared/components/DropdownContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { PropsWithChildren, ReactElement } from "react";
import { Link } from "react-router-dom";

type CartProps = PropsWithChildren & {};

const Cart = ({ children }: CartProps): ReactElement => {
  const cartItems = useAppSelector((state) => state.cart.data.cartItems);

  const dispatch = useAppDispatch();

  return (
    <DropdownContainer className="w-cartWidth top-10 right-0">
      <div className="w-full h-[24rem] mb-4 px-2">
        <h1 className="text-center mt-3 text-3xl font-bold italic">Kosár</h1>

        <CartItemContainer>{children}</CartItemContainer>

        <CartTotal />

        <div className="flex justify-around items-end mt-3">
          <Link to={"/order-summary"}>
            <Button
              variant="primary"
              disabled={Object.keys(cartItems).length === 0}
            >
              Tovább
            </Button>
          </Link>

          <Link to={"/"}>
            <Button variant="secondary" onClick={() => dispatch(clearCart())}>
              Kosár törlése
            </Button>
          </Link>
        </div>
      </div>
    </DropdownContainer>
  );
};

export default Cart;
