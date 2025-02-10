import InputContainer from "@/features/shared/components/form/InputContainer";
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  HTMLProps,
  ReactElement,
} from "react";

type InputDateProps = HTMLAttributes<HTMLInputElement> &
  HTMLProps<HTMLInputElement> & {
    label: string;
  };

const InputDate = forwardRef<HTMLInputElement, InputDateProps>(
  (
    { label, ...props }: InputDateProps,
    ref: ForwardedRef<HTMLInputElement>
  ): ReactElement => {
    return (
      <InputContainer label={label}>
        <input
          {...props}
          ref={ref}
          type="datetime-local"
          className={
            "border-2 h-10 rounded-xl px-4 text-lg focus:outline-baseColor"
          }
        />
      </InputContainer>
    );
  }
);

export default InputDate;
