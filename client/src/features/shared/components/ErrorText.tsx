import { PropsWithChildren, ReactElement } from "react";

type TextErrorProps = PropsWithChildren & {};

const TextError = ({ children }: TextErrorProps): ReactElement => {
  return <div className="text-sm -mt-2 pl-5 text-red-500">{children}</div>;
};

export default TextError;
