import Button from "@/shared/components/Button";
import { useAppDispatch } from "@/storeHooks/store.hooks";
import CartItemContainer from "features/cart/components/CartItemContainer";
import CartTotal from "features/cart/components/CartTotal";
import { clearCart } from "features/cart/slice/cartSlice";
import { PropsWithChildren, ReactElement } from "react";

type CartProps = PropsWithChildren & {};

const Cart = ({ children }: CartProps): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white absolute w-[24rem] top-[4.5rem] right-5 rounded-3xl shadow-xl z-30">
      <div className="w-full h-[24rem]">
        <h1 className="text-center mt-3 text-3xl font-bold italic">Kosár</h1>

        <CartItemContainer>{children}</CartItemContainer>

        <CartTotal />

        <div className="flex justify-around items-end mt-3">
          <Button variant="primary">Megrendelem</Button>
          <Button variant="secondary" onClick={() => dispatch(clearCart())}>
            Kosár törlése
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
