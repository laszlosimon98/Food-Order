import CartItemContainer from "@/features/cart/components/CartItemContainer";
import CartTotal from "@/features/cart/components/CartTotal";
import { clearCart } from "@/features/cart/slice/cartSlice";
import Button from "@/features/shared/components/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { PropsWithChildren, ReactElement } from "react";
import { Link } from "react-router-dom";

type CartProps = PropsWithChildren & {};

const Cart = ({ children }: CartProps): ReactElement => {
  const cartItems = useAppSelector((state) => state.cart.data.cartItems);

  const dispatch = useAppDispatch();

  return (
    <div className="bg-white absolute w-cartWidth top-[4.5rem] right-5 rounded-3xl shadow-xl z-30">
      <div className="w-full h-[24rem]">
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
    </div>
  );
};

export default Cart;
