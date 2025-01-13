import ListElement from "@/header/components/ListElement";
import { ReactElement } from "react";

const NavElement = (): ReactElement => {
  return (
    <ul className="flex gap-12">
      <ListElement>Főoldal</ListElement>
      <ListElement>Bejelentkezés</ListElement>
      <ListElement>Regisztráció</ListElement>
    </ul>
  );
};

export default NavElement;
