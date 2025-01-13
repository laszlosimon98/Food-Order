import CloseButton from "features/menu/components/CloseButton";
import OpenButton from "features/menu/components/OpenButton";
import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";

const Menu = (): ReactElement => {
  const [isOverLayVisible, setIsOverLayVisible] = useState<boolean>(false);

  const closeMenu = () => {
    setIsOverLayVisible(false);
  };

  const openMenu = () => {
    setIsOverLayVisible(true);
  };

  return (
    <>
      {isOverLayVisible && (
        <div
          className="absolute top-0 left-0 bg-black bg-opacity-50 inset-0"
          onClick={closeMenu}
        ></div>
      )}

      <header className="h-16 w-full bg-amber-500 flex flex-row justify-between items-center px-5">
        <h1 className="text-2xl font-bold italic">Ételrendelő</h1>

        <div className="md:hidden">
          {isOverLayVisible && <CloseButton closeMenu={closeMenu} />}
          {!isOverLayVisible && <OpenButton openMenu={openMenu} />}
        </div>

        <nav className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0">
          <ul
            className={`flex flex-col gap-8 text-3xl font-semibold italic text-amber-500 justify-center items-center ${
              !isOverLayVisible ? "hidden" : ""
            } cursor-pointer md:text-black md:flex md:text-xl md:flex-row`}
          >
            <li onClick={closeMenu}>
              <Link to={"/"}>Főoldal</Link>
            </li>

            <li onClick={closeMenu}>
              <Link to={"/login"}>Bejelentkezés</Link>
            </li>

            <li onClick={closeMenu}>
              <Link to={"/register"}>Regisztráció</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Menu;
