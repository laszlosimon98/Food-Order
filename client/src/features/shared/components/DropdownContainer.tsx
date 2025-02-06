import { cn } from "@/utils/cn";
import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

type DropdownContainerProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {};

const DropdownContainer = ({
  children,
  className,
}: DropdownContainerProps): ReactElement => {
  return (
    <div
      className={cn("bg-white absolute rounded-3xl shadow-xl z-10", className)}
    >
      {children}
    </div>
  );
};

export default DropdownContainer;
