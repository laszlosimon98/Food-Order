import ListElement from "@/features/menu/components/ListElement";
import RoutesContainer from "@/features/menu/components/routes/RoutesContainer";
import { RolesEnum } from "@/utils/roles";
import { ReactElement } from "react";

const UserRoutes = (): ReactElement => {
  return (
    <RoutesContainer roles={[RolesEnum.USER]}>
      <ListElement link="/my-orders">Rendeléseim</ListElement>
      <ListElement link="/favorite-foods">Kedvenceim</ListElement>
    </RoutesContainer>
  );
};

export default UserRoutes;
