import { useGetUserQuery } from "@/features/auth/api/authApi";
import Button from "@/features/shared/components/Button";
import Redirect from "@/features/shared/components/Redirect";
import LoginRequired from "@/features/shared/components/Redirect";
import { UserRoles } from "@/utils/types/user.type";
import { PropsWithChildren, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: UserRoles[];
};

const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps): ReactElement => {
  const { data: currentUser, isLoading } = useGetUserQuery();
  const navigate = useNavigate();

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
