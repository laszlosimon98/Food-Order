import Redirect from "@/features/shared/components/Redirect";
import { useAppSelector } from "@/store/hooks/store.hooks";
import { RolesEnum } from "@/utils/roles";
import { PropsWithChildren, ReactElement } from "react";
import { Outlet, useLocation } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: RolesEnum[];
};

const ProtectedRoute = ({
  allowedRoles,
}: ProtectedRouteProps): ReactElement => {
  const currentUser = useAppSelector((state) => state.auth.data.currentUser);
  const location = useLocation();

  if (currentUser === undefined) {
    return (
      <Redirect
        message="Az oldal megtekintéséhez be kell jelentkezni!"
        route="/login"
        redirectTo={location.pathname}
        buttonText="Bejelentkezés"
      />
    );
  }

  if (
    currentUser !== undefined &&
    allowedRoles &&
    !allowedRoles.includes(currentUser.role)
  ) {
    return (
      <Redirect
        message="Az oldal megtekintéséhez nincs jogosultságod!"
        route="/"
        buttonText="Vissza a főoldalra"
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
