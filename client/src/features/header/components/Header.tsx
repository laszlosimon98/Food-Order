import NavElement from "@/header/components/NavElement";
import { ReactElement } from "react";

const Header = (): ReactElement => {
  return (
    <header className="w-full bg-amber-500 h-16 flex justify-between items-center px-10">
      <h1 className="text-2xl font-semibold italic">Ételrendelő</h1>
      <NavElement />
    </header>
  );
};

export default Header;
