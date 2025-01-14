import ListElement from "@/menu/components/ListElement";
import { ReactElement } from "react";

type NavigationPropsType = {
  isOverlayVisible: boolean;
  closeMenu: () => void;
};

const Navigation = ({
  isOverlayVisible,
  closeMenu,
}: NavigationPropsType): ReactElement => {
  return (
    <nav className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0">
      <ul
        className={`flex flex-col gap-8 text-3xl font-semibold italic text-amber-500 justify-center items-center ${
          !isOverlayVisible ? "hidden" : ""
        } cursor-pointer md:text-black md:flex md:text-xl md:flex-row`}
        onClick={closeMenu}
      >
        <ListElement link="/">Főoldal</ListElement>
        <ListElement link="/login">Bejelentkezés</ListElement>
        <ListElement link="/register">Regisztráció</ListElement>
      </ul>
    </nav>
  );
};

export default Navigation;
