import { cn } from "@/utils/cn";
import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

type CardProps = PropsWithChildren & HTMLAttributes<HTMLDivElement> & {};

const Card = ({ children, className, ...props }: CardProps): ReactElement => {
  return (
    <div
      {...props}
      className={cn(
        "w-[23rem] bg-white m-5 py-3 px-2 rounded-3xl shadow-xl cursor-pointer hover:scale-105 transition-all md:w-[28rem] relative",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
