import { PropsWithChildren, ReactElement } from "react";

type CartItemContainerProps = PropsWithChildren & {};

const CartItemContainer = ({
  children,
}: CartItemContainerProps): ReactElement => {
  return (
    <div className="w-[90%] h-full mx-auto mt-5 max-h-[15rem] overflow-y-auto">
      {children}
    </div>
  );
};

export default CartItemContainer;
