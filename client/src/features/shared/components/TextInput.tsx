import { ReactElement } from "react";

type InputProps = React.HTMLAttributes<HTMLInputElement> &
  React.HTMLProps<HTMLInputElement> & {
    label: string;
  };

const TextInput = ({ label, ...props }: InputProps): ReactElement => {
  return (
    <div className="flex flex-col justify-center items-center pb-2">
      <label
        htmlFor=""
        className="py-2 pl-5 self-start text-xl font-semibold text-baseColor"
      >
        {label}
      </label>
      <input
        {...props}
        placeholder={`${label}`}
        className="border-2 w-full h-10 rounded-xl px-4 text-lg"
      />
    </div>
  );
};

export default TextInput;
