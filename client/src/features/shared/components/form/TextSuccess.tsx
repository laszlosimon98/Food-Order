import { cn } from "@/utils/cn";
import { PropsWithChildren, HTMLAttributes, ReactElement } from "react";

type TextSuccessProps = PropsWithChildren & HTMLAttributes<HTMLDivElement> & {};

const TextSuccess = ({
  children,
  className,
}: TextSuccessProps): ReactElement => {
  return (
    <div className={cn("text-sm -mt-2 pl-5 text-green-500", className)}>
      {children}
    </div>
  );
};

export default TextSuccess;
