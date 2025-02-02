import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLAttributes, ReactElement } from "react";

type StarProps = HTMLAttributes<HTMLSpanElement> & {
  rating: number;
};

const Star = ({ rating, ...props }: StarProps): ReactElement => {
  return (
    <>
      {Array(rating)
        .fill("")
        .map((_star, index) => (
          <span key={index} {...props}>
            <FontAwesomeIcon icon={faStar} />
          </span>
        ))}{" "}
    </>
  );
};

export default Star;
