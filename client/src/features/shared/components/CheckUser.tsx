import { useGetCurrentUserQuery } from "@/features/auth/api/authApi";
import Loading from "@/features/shared/components/Loading";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const CheckUser = (): ReactElement => {
  const { isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default CheckUser;
