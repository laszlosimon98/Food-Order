import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";
import { Link } from "react-router-dom";

type ListElementProps = HTMLAttributes<HTMLLIElement> &
  PropsWithChildren & {
    link: string;
  };

const ListElement = ({
  link,
  children,
  ...props
}: ListElementProps): ReactElement => {
  return (
    <Link to={link}>
      <li {...props}>{children}</li>
    </Link>
  );
};

export default ListElement;
