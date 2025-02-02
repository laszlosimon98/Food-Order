import Button from "@/features/shared/components/Button";
import { cn } from "@/utils/cn";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

type IconProps = FontAwesomeIconProps &
  HTMLAttributes<HTMLButtonElement> &
  PropsWithChildren;

const Icon = ({
  children,
  className,
  onClick,
  ...iconProps
}: IconProps): ReactElement => {
  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={onClick}
      className={cn(
        "relative border-none bg-inherit transition-all text-inherit",
        className
      )}
    >
      <FontAwesomeIcon {...iconProps} />
      {children}
    </Button>
  );
};

export default Icon;
