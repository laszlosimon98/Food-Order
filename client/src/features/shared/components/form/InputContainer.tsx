import { cn } from "@/utils/cn";
import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

type InputContainerProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    label: string;
  };

const InputContainer = ({
  children,
  label,
  className,
}: InputContainerProps): ReactElement => {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center w-inputWidth",
        className
      )}
    >
      <label
        htmlFor={label}
        className="py-1 pl-3 text-xl font-semibold text-baseColor"
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default InputContainer;
