import { cn } from "@/utils/cn";
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  HTMLProps,
  ReactElement,
} from "react";

type InputProps = HTMLAttributes<HTMLTextAreaElement> &
  HTMLProps<HTMLTextAreaElement> & {
    label: string;
  };

const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  (
    { label, className, ...props }: InputProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): ReactElement => {
    return (
      <div
        className={cn(
          "flex flex-col justify-center items-center pb-2 w-inputWidth mx-auto",
          className
        )}
      >
        <label
          htmlFor={`${label}`}
          className="py-2 pl-3 self-start text-xl font-semibold text-baseColor"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={`${label}`}
          placeholder={`${label}`}
          {...props}
          className="border-2 w-full h-24 rounded-xl px-4 text-lg pt-1 focus:outline-baseColor"
        />
      </div>
    );
  }
);

export default TextArea;
