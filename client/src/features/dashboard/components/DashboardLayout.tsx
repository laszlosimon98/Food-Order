import DashBoardMenu from "@/features/dashboard/components/DashboardMenu";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = (): ReactElement => {
  return (
    <div className="flex">
      <DashBoardMenu />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
