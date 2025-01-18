import { PropsWithChildren, ReactElement } from "react";

type FoodPropertyProps = PropsWithChildren & {};

const FoodProperty = ({ children }: FoodPropertyProps): ReactElement => {
  return <div className="text-xl">{children}</div>;
};

export default FoodProperty;
