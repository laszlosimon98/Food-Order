import ListElement from "@/features/menu/components/ListElement";
import { ReactElement } from "react";

const DashBoardMenu = (): ReactElement => {
  return (
    <header className="w-80 min-h-dvh bg-baseColor">
      <h1 className="text-3xl pt-5 pb-10 text-center font-bold">Dashboard</h1>
      <nav className="w-full">
        <ul className="w-[80%] mx-auto flex flex-col justify-center gap-7 text-xl font-semibold">
          <ListElement link="create-food">Étel hozzáadás</ListElement>
          <ListElement link="create-category">Kategória létrehozás</ListElement>
          <ListElement link="create-promotion">Akció létrehozás</ListElement>
          <ListElement link="/">Kilépés</ListElement>
        </ul>
      </nav>
    </header>
  );
};

export default DashBoardMenu;
