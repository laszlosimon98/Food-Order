import { PropsWithChildren, ReactElement } from "react";

type CartButtonProps = PropsWithChildren & {};

const CartButton = ({ children }: CartButtonProps): ReactElement => {
  return (
    <div className="rounded-full hover:scale-110 hover:cursor-pointer w-6">
      {children}
    </div>
  );
};

export default CartButton;
