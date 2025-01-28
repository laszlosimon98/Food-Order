import { useGetCurrentUserQuery } from "@/features/auth/api/authApi";
import Loading from "@/features/shared/components/Loading";
import Redirect from "@/features/shared/components/Redirect";
import { UserRoles } from "@/utils/types/user.type";
import { PropsWithChildren, ReactElement } from "react";
import { useLocation } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: UserRoles[];
};

const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps): ReactElement => {
  const { data: currentUser, isLoading } = useGetCurrentUserQuery();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

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

  return <>{children}</>;
};

export default ProtectedRoute;
