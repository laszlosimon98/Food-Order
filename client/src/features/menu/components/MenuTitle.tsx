import { ReactElement } from "react";
import { Link } from "react-router-dom";

type MenuTitleProps = {};

const MenuTitle = ({}: MenuTitleProps): ReactElement => {
  return (
    <Link to={"/"}>
      <h1 className="text-3xl font-bold  italic hover:scale-105 transition-all">
        Ételrendelő
      </h1>
    </Link>
  );
};

export default MenuTitle;
