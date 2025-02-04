import { cn } from "@/utils/cn";
import {
  FontAwesomeIconProps,
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";
import { PropsWithChildren, ReactElement } from "react";

type IconProps = FontAwesomeIconProps & PropsWithChildren;

const Icon = ({
  children,
  className,
  ...iconProps
}: IconProps): ReactElement => {
  return (
    <>
      <FontAwesomeIcon
        className={cn(
          "relative border-none bg-inherit transition-all text-inherit",
          className
        )}
        {...iconProps}
      />
      {children}
    </>
  );
};

export default Icon;
