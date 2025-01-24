import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactElement } from "react";

type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    type?: "button" | "submit";
    variant?: "primary" | "secondary";
    size?: "default" | "sm" | "icon";
    disabled?: boolean;
  };

const Button = ({
  className,
  variant,
  size,
  type,
  disabled = false,
  ...props
}: ButtonProps): ReactElement => {
  return (
    <button
      type={type ? type : "button"}
      disabled={disabled}
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  );
};

const buttonVariants = cva(
  "rounded-md font-semibold hover:opacity:50 hover:scale-105 active:scale-100 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-baseColor",
        secondary: "bg-white text-baseColor border border-baseColor",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-2",
        icon: "h-10 w-10 ",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export default Button;
