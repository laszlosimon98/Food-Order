import ListElement from "@/features/menu/components/ListElement";
import RoutesContainer from "@/features/menu/components/routes/RoutesContainer";
import { RolesEnum } from "@/utils/roles";
import { ReactElement } from "react";

const AdminRoutes = (): ReactElement => {
  return (
    <RoutesContainer roles={[RolesEnum.ADMIN]}>
      <ListElement link="/users">Felhasználók</ListElement>
    </RoutesContainer>
  );
};

export default AdminRoutes;
