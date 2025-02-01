import {
  useGetCurrentUserQuery,
  useLogoutMutation,
} from "@/features/auth/api/authApi";
import { removeToken } from "@/features/auth/slice/authSlice";
import ListElement from "@/features/menu/components/ListElement";
import DropdownContainer from "@/features/shared/components/DropdownContainer";
import Icon from "@/features/shared/components/Icon";
import Loading from "@/features/shared/components/Loading";
import { useAppSelector, useAppDispatch } from "@/store/hooks/store.hooks";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

type NavigationPropsType = {
  isMenuOverlayOpen: boolean;
  closeMenu: () => void;
};

const Navigation = ({
  isMenuOverlayOpen,
  closeMenu,
}: NavigationPropsType): ReactElement => {
  const { data: currentUser, isLoading } = useGetCurrentUserQuery();
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const { isAuthenticated } = useAppSelector((state) => state.auth.data);
  const [useLogout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await useLogout();
    dispatch(removeToken());
    navigate("/");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <nav className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 z-20">
      <ul
        className={`flex flex-col gap-8 text-3xl font-semibold italic text-baseColor justify-center items-center ${
          !isMenuOverlayOpen ? "hidden" : ""
        } cursor-pointer md:text-black md:flex md:text-xl md:flex-row`}
        onClick={() => {
          closeMenu();
          if (isDropdownVisible) setIsDropdownVisible(false);
        }}
      >
        <ListElement link="/">Főoldal</ListElement>

        {!isAuthenticated ? (
          <>
            <ListElement link="/login">Bejelentkezés</ListElement>
            <ListElement link="/register">Regisztráció</ListElement>
          </>
        ) : (
          <>
            {currentUser && currentUser.role === "user" && (
              <>
                <ListElement link="/my-orders">Rendeléseim</ListElement>
                <ListElement link="/favorite-foods">Kedvenceim</ListElement>
              </>
            )}

            {currentUser && currentUser.role === "employee" && (
              <>
                <ListElement link="/orders">Rendelések</ListElement>
              </>
            )}

            {currentUser && currentUser.role === "admin" && (
              <>
                <ListElement link="/users">Felhasználók</ListElement>
              </>
            )}

            <Icon
              icon={faUser}
              size="lg"
              className="hidden md:block relative"
              onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            >
              {isDropdownVisible && (
                <DropdownContainer className="min-w-52 right-0 top-10 min-h-fit py-4 flex flex-col items-center gap-3 text-black">
                  <h2 className="text-normal p-2 font-semibold">
                    Felhasználó: <p>{currentUser.fullname}</p>
                  </h2>
                  <ListElement link="/profile">Profilom</ListElement>
                  <ListElement link="/" onClick={logout}>
                    Kijelentkezés
                  </ListElement>
                </DropdownContainer>
              )}
            </Icon>

            <div className="inline-flex flex-col justify-center items-center gap-8 md:hidden">
              <ListElement link="/profile">Profilom</ListElement>

              <ListElement link="/" onClick={logout}>
                Kijelentkezés
              </ListElement>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
