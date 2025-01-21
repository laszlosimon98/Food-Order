import { useGetUserQuery } from "@/features/auth/api/authApi";
import Redirect from "@/features/shared/components/Redirect";
import { UserRoles } from "@/utils/types/user.type";
import { PropsWithChildren, ReactElement } from "react";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: UserRoles[];
};

const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps): ReactElement => {
  const { data: currentUser, isLoading } = useGetUserQuery();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (currentUser === undefined) {
    return (
      <Redirect
        message="Az oldal megtekintéséhez be kell jelentkezni!"
        route="/login"
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
