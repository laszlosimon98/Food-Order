import ListElement from "@/features/menu/components/ListElement";
import RoutesContainer from "@/features/menu/components/routes/RoutesContainer";
import { RolesEnum } from "@/utils/roles";
import { ReactElement } from "react";

const EmployeeRoutes = (): ReactElement => {
  return (
    <RoutesContainer roles={[RolesEnum.EMPLOYEE]}>
      <ListElement link="/orders">Rendelések</ListElement>
    </RoutesContainer>
  );
};

export default EmployeeRoutes;
