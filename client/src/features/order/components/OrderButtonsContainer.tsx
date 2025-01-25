import { PropsWithChildren, ReactElement } from "react";

type OrderButtonsContainerProps = PropsWithChildren & {};

const OrderButtonsContainer = ({
  children,
}: OrderButtonsContainerProps): ReactElement => {
  return <div className="flex justify-between w-24">{children}</div>;
};

export default OrderButtonsContainer;
