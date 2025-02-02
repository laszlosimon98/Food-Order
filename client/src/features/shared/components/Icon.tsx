import Button from "@/features/shared/components/Button";
import { cn } from "@/utils/cn";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { PropsWithChildren, ReactElement } from "react";

type IconProps = FontAwesomeIconProps & PropsWithChildren;

const Icon = ({ children, className, ...props }: IconProps): ReactElement => {
  return (
    <Button
      size="icon"
      variant="secondary"
      className={cn(
        "relative border-none bg-inherit transition-all text-inherit",
        className
      )}
    >
      <FontAwesomeIcon {...props} />
      {children}
    </Button>
  );
};

export default Icon;
