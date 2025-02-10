import { ForwardedRef, forwardRef, ReactElement } from "react";

type InputCheckboxProps = {
  label: string;
};

const InputCheckbox = forwardRef<HTMLInputElement, InputCheckboxProps>(
  (
    { label }: InputCheckboxProps,
    ref: ForwardedRef<HTMLInputElement>
  ): ReactElement => {
    return (
      <div className="flex w-full justify-between gap-10">
        <label htmlFor={label}>{label}</label>
        <input ref={ref} type="checkbox" id={label} />
      </div>
    );
  }
);

export default InputCheckbox;
