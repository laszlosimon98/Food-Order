import { PropsWithChildren, ReactElement } from "react";
import { Link } from "react-router-dom";

type ListElementProps = {
  link: string;
} & PropsWithChildren;

const ListElement = ({ link, children }: ListElementProps): ReactElement => {
  return (
    <Link to={link}>
      <li>{children}</li>{" "}
    </Link>
  );
};

export default ListElement;
