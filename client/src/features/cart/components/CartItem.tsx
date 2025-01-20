import { PropsWithChildren, ReactElement } from "react";

type CartItemProps = PropsWithChildren & {};

const CartItem = ({ children }: CartItemProps): ReactElement => {
  return <div className="w-full h-12">{children}</div>;
};

export default CartItem;
