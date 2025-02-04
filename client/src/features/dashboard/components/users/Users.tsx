import UserCard from "@/features/dashboard/components/users/User";
import FilterRoles from "@/features/fitler-order-limit/components/FilterRoles";
import Loading from "@/features/shared/components/Loading";
import { useGetUsersQuery } from "@/features/user/api/userApi";
import { useAppSelector } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

const Users = (): ReactElement => {
  const role = useAppSelector((state) => state.filter.data.role);
  const { data: users, isLoading } = useGetUsersQuery({ role });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-1/2">
      <h1 className="text-2xl font-bold text-center">Felhasználók</h1>
      <FilterRoles />
      {users && users.map((user) => <UserCard key={user.userId} user={user} />)}
    </div>
  );
};

export default Users;
