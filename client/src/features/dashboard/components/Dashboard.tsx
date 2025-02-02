import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const Dashboard = (): ReactElement => {
  return (
    <div className="min-h-dvh w-dashboard flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default Dashboard;
