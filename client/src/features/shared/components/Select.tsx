import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

type SelectProps = PropsWithChildren & HTMLAttributes<HTMLSelectElement> & {};

const Select = ({ children, ...props }: SelectProps): ReactElement => {
  return (
    <select
      {...props}
      className="border-2 focus:outline-baseColor shadow-sm rounded-lg py-1 px-3"
    >
      {children}
    </select>
  );
};

export default Select;
