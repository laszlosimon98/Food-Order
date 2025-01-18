import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";

type IconProps = FontAwesomeIconProps;

const Icon = ({ ...props }: IconProps): ReactElement => {
  return (
    <FontAwesomeIcon
      {...props}
      className="cursor-pointer hover:scale-125 transition-all"
    />
  );
};

export default Icon;
