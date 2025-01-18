import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { PropsWithChildren, ReactElement } from "react";

type IconProps = FontAwesomeIconProps & PropsWithChildren;

const Icon = ({ children, ...props }: IconProps): ReactElement => {
  return (
    <div className="relative">
      <FontAwesomeIcon
        {...props}
        className="cursor-pointer hover:scale-125 transition-all"
      />
      {children}
    </div>
  );
};

export default Icon;
