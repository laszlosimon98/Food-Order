import { cn } from "@/utils/cn";
import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";
import { Link } from "react-router-dom";

type ListElementProps = HTMLAttributes<HTMLLIElement> &
  PropsWithChildren & {
    link: string;
  };

const ListElement = ({
  link,
  children,
  className,
  ...props
}: ListElementProps): ReactElement => {
  return (
    <Link to={link}>
      <li
        {...props}
        className={cn("hover:scale-110 transition-all", className)}
      >
        {children}
      </li>
    </Link>
  );
};

export default ListElement;
