import { PropsWithChildren, ReactElement } from "react";

type ListElementProps = {} & PropsWithChildren;

const ListElement = ({ children }: ListElementProps): ReactElement => {
  return (
    <li className="italic text-xl cursor-pointer hover:opacity-50">
      {children}
    </li>
  );
};

export default ListElement;
