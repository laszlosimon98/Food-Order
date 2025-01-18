import { PropsWithChildren, ReactElement } from "react";

type CartItemContainerProps = PropsWithChildren & {};

const CartItemContainer = ({
  children,
}: CartItemContainerProps): ReactElement => {
  return (
    <div className="w-[90%] mx-auto mt-5 h-full overflow-y-auto">
      {children}
    </div>
  );
};

export default CartItemContainer;
