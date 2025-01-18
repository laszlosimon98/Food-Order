import Button from "@/shared/components/Button";
import CartItemContainer from "features/cart/components/CartItemContainer";
import { PropsWithChildren, ReactElement } from "react";

type CartProps = PropsWithChildren & {};

const Cart = ({ children }: CartProps): ReactElement => {
  return (
    <div className="bg-amber-50 absolute w-cartWidth h-[32rem] top-[4.5rem] right-5  rounded-lg shadow-lg">
      <div className="w-full h-[22rem]">
        <h1 className="text-center mt-3 text-3xl font-bold italic">Kosár</h1>
        <CartItemContainer>{children}</CartItemContainer>
        <Button
          variant="primary"
          className="absolute bottom-5 right-1/2 translate-x-1/2 text-cartButton"
        >
          Tovább a rendeléshez!
        </Button>
      </div>
    </div>
  );
};

export default Cart;
