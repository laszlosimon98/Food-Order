import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

type OrderFoodSectionContainerProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {};

const OrderFoodSectionContainer = ({
  children,
  ...props
}: OrderFoodSectionContainerProps): ReactElement => {
  return (
    <div {...props} className="py-3 flex justify-between items-center">
      {children}
    </div>
  );
};

export default OrderFoodSectionContainer;
