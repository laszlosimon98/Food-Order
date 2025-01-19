import Button from "@/shared/components/Button";
import CartItemContainer from "features/cart/components/CartItemContainer";
import { PropsWithChildren, ReactElement } from "react";

type CartProps = PropsWithChildren & {};

const Cart = ({ children }: CartProps): ReactElement => {
  return (
    <div className="bg-white absolute w-[24rem] top-[4.5rem] right-5 rounded-3xl shadow-xl">
      <div className="w-full h-80">
        <h1 className="text-center mt-3 text-3xl font-bold italic">Kosár</h1>
        <CartItemContainer>{children}</CartItemContainer>
        <Button
          variant="primary"
          className="absolute bottom-5 right-1/2 translate-x-1/2 text-lg w-40 mt-5"
        >
          Megrendelem
        </Button>
      </div>
    </div>
  );
};

export default Cart;
