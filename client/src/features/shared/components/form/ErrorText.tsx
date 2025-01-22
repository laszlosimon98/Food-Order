import { cn } from "@/utils/cn";
import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

type TextErrorProps = PropsWithChildren & HTMLAttributes<HTMLDivElement> & {};

const TextError = ({ children, className }: TextErrorProps): ReactElement => {
  return (
    <div className={cn("text-sm -mt-2 pl-5 text-red-500", className)}>
      {children}
    </div>
  );
};

export default TextError;
