import { useLogoutMutation } from "@/features/auth/api/authApi";
import { removeToken } from "@/features/auth/slice/authSlice";
import ListElement from "@/features/menu/components/ListElement";
import { useAppSelector, useAppDispatch } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type NavigationPropsType = {
  isMenuOverlayOpen: boolean;
  closeMenu: () => void;
};

const Navigation = ({
  isMenuOverlayOpen,
  closeMenu,
}: NavigationPropsType): ReactElement => {
  const { isAuthenticated } = useAppSelector((state) => state.auth.data);

  const [useLogout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    useLogout();
    dispatch(removeToken());
    navigate("/");
  };

  return (
    <nav className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0">
      <ul
        className={`flex flex-col gap-8 text-3xl font-semibold italic text-baseColor justify-center items-center ${
          !isMenuOverlayOpen ? "hidden" : ""
        } cursor-pointer md:text-black md:flex md:text-xl md:flex-row`}
        onClick={closeMenu}
      >
        <ListElement link="/">Főoldal</ListElement>

        {!isAuthenticated ? (
          <>
            <ListElement link="/login">Bejelentkezés</ListElement>
            <ListElement link="/register">Regisztráció</ListElement>
          </>
        ) : (
          <ListElement link="/" onClick={logout}>
            Kijelentkezés
          </ListElement>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
