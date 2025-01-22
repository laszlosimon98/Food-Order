import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  HTMLProps,
  ReactElement,
} from "react";

type InputProps = HTMLAttributes<HTMLInputElement> &
  HTMLProps<HTMLInputElement> & {
    label: string;
  };

const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): ReactElement => {
    return (
      <div className="flex flex-col justify-center items-center pb-2">
        <label
          htmlFor={`${label}`}
          className="py-2 pl-5 self-start text-xl font-semibold text-baseColor"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={`${label}`}
          placeholder={`${label}`}
          {...props}
          className={`border-2 w-full h-10 rounded-xl px-4 text-lg focus:outline-baseColor [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        />
      </div>
    );
  }
);

export default TextInput;
