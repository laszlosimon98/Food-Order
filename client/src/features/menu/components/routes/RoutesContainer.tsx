import { useAppSelector } from "@/store/hooks/store.hooks";
import { hasPermission, RolesEnum } from "@/utils/roles";
import { PropsWithChildren, ReactElement } from "react";

type RoutesContainerProps = PropsWithChildren & {
  roles: RolesEnum[];
};

const RoutesContainer = ({
  children,
  roles,
}: RoutesContainerProps): ReactElement => {
  const currentUser = useAppSelector((state) => state.auth.data.currentUser);

  return <>{hasPermission(roles, currentUser) && children}</>;
};

export default RoutesContainer;
