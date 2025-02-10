import InputContainer from "@/features/shared/components/form/InputContainer";
import { cn } from "@/utils/cn";
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  HTMLProps,
  ReactElement,
} from "react";

type InputTextProps = HTMLAttributes<HTMLInputElement> &
  HTMLProps<HTMLInputElement> & {
    label: string;
  };

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    { label, className, ...props }: InputTextProps,
    ref: ForwardedRef<HTMLInputElement>
  ): ReactElement => {
    return (
      <InputContainer label={label}>
        <input
          ref={ref}
          id={`${label}`}
          placeholder={`${label}`}
          {...props}
          className="border-2 w-full h-10 rounded-xl px-4 text-lg focus:outline-baseColor [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </InputContainer>
    );
  }
);

export default InputText;
