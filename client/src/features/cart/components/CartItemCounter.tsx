import { PropsWithChildren, ReactElement } from "react";

type CartItemCounterProps = PropsWithChildren & {};

const CartItemCounter = ({ children }: CartItemCounterProps): ReactElement => {
  return (
    <div className="w-6 h-6 bg-red-300 text-black absolute -bottom-3 -right-3 font-semibold flex justify-center items-center rounded-full">
      {children}
    </div>
  );
};

export default CartItemCounter;
