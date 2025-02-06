import ListElement from "@/features/menu/components/ListElement";
import { ReactElement } from "react";

const DashBoardMenu = (): ReactElement => {
  return (
    <header className="w-48 min-h-dvh bg-baseColor">
      <h1 className="text-2xl pt-5 pb-10 text-center font-bold">Dashboard</h1>
      <nav className="w-full">
        <ul className="w-28 mx-auto flex flex-col justify-center gap-7 text-xl font-semibold">
          <ListElement link="foods">Ételek</ListElement>
          <ListElement link="categories">Kategóriák</ListElement>
          <ListElement link="promotions">Akciók</ListElement>

          <ListElement link="users">Felhasználók</ListElement>
          <ListElement link="/">Kilépés</ListElement>
        </ul>
      </nav>
    </header>
  );
};

export default DashBoardMenu;
