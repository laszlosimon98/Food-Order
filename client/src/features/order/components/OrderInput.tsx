import { HTMLAttributes, HTMLProps, ReactElement } from "react";

type OrderInputProps = HTMLAttributes<HTMLInputElement> &
  HTMLProps<HTMLInputElement> & {
    value: number;
  };

const OrderInput = ({ value, ...props }: OrderInputProps): ReactElement => {
  return (
    <input
      {...props}
      type="number"
      defaultValue={value}
      className="border-2 text-center w-16 h-6 rounded-xl px-4 text-lg focus:outline-baseColor [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
  );
};

export default OrderInput;
