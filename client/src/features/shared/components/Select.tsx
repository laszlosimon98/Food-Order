import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  HTMLProps,
  PropsWithChildren,
  ReactElement,
} from "react";

type SelectProps = PropsWithChildren &
  HTMLAttributes<HTMLSelectElement> &
  HTMLProps<HTMLSelectElement> & {
    label: string;
  };

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, children, ...props }: SelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ): ReactElement => {
    return (
      <div className="flex justify-between items-center gap-10">
        <label htmlFor={label}>{label}</label>
        <select
          ref={ref}
          id={label}
          {...props}
          className="border-2 focus:outline-baseColor shadow-sm rounded-lg py-1 px-3"
        >
          {children}
        </select>
      </div>
    );
  }
);

export default Select;
