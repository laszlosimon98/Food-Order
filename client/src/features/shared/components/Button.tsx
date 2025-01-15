import { cva, VariantProps } from "class-variance-authority";
import { ReactElement } from "react";
import { cn } from "utils/cn";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    variant?: "primary" | "secondary";
    size?: "default" | "sm";
  };

const Button = ({
  className,
  variant,
  size,
  ...props
}: ButtonProps): ReactElement => {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  );
};

const buttonVariants = cva(
  "rounded-md font-semibold hover:opacity:50 active:scale-95 cursor-pointer mt-3",
  {
    variants: {
      variant: {
        primary: "bg-baseColor",
        secondary: "bg-white text-baseColor border border-baseColor",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export default Button;
