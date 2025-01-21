import { cn } from "@/utils/cn";
import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

type FoodHeaderProps = PropsWithChildren &
  HTMLAttributes<HTMLHeadingElement> & {};

const FoodHeader = ({ children, className }: FoodHeaderProps): ReactElement => {
  return (
    <h1 className={cn("text-center font-semibold text-xl", className)}>
      {children}
    </h1>
  );
};

export default FoodHeader;
