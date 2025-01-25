import { PropsWithChildren, ReactElement } from "react";

type PropertyProps = PropsWithChildren & {};

const Property = ({ children }: PropertyProps): ReactElement => {
  return <div className="text-xl">{children}</div>;
};

export default Property;
