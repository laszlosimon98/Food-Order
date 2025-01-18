import { PropsWithChildren, ReactElement } from "react";

type FoodHeaderProps = PropsWithChildren & {};

const FoodHeader = ({ children }: FoodHeaderProps): ReactElement => {
  return <h1 className="text-center font-semibold text-xl">{children}</h1>;
};

export default FoodHeader;
