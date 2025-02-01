import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactElement } from "react";

type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    variant?: "primary" | "secondary" | "danger";
    size?: "default" | "sm" | "icon";
    disabled?: boolean;
  };

const Button = ({
  className,
  variant,
  size,
  disabled = false,
  ...props
}: ButtonProps): ReactElement => {
  return (
    <button
      {...props}
      disabled={disabled}
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
        danger: "bg-red-500 ",
      },
      size: {
        default: "h-10 min-w-28 w-fit px-4",
        sm: "h-8 min-w-20 w-fit px-4",
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
