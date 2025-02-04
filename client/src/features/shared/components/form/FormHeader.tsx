import { cn } from "@/utils/cn";
import { HTMLAttributes, ReactElement } from "react";

type FormHeaderProps = HTMLAttributes<HTMLHeadingElement> & {
  title: string;
};

const FormHeader = ({ title, className }: FormHeaderProps): ReactElement => {
  return (
    <h1
      className={cn(
        "text-center text-3xl font-bold italic underline text-baseColor",
        className
      )}
    >
      {title}
    </h1>
  );
};

export default FormHeader;
