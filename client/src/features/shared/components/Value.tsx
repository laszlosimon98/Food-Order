import { PropsWithChildren, ReactElement } from "react";

type ValueProps = PropsWithChildren & {};

const Value = ({ children }: ValueProps): ReactElement => {
  return <div className="text-xl font-semibold">{children}</div>;
};

export default Value;
