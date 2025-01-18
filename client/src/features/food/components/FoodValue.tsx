import { PropsWithChildren, ReactElement } from "react";

type FoodValueProps = PropsWithChildren & {};

const FoodValue = ({ children }: FoodValueProps): ReactElement => {
  return <div className="text-xl font-semibold">{children}</div>;
};

export default FoodValue;
