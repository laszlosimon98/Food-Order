import { useGetUserQuery } from "@/features/auth/api/authApi";
import ChangePassword from "@/features/profile/components/ChangePassword";
import ModifyData from "@/features/profile/components/ModifyData";
import { UserType } from "@/utils/types/user.type";
import { ReactElement } from "react";

const Profile = (): ReactElement => {
  const { data: currentUser, isLoading } = useGetUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(currentUser);

  return (
    <div className="flex justify-around">
      <ModifyData currentUser={currentUser as UserType} />
      <ChangePassword />
    </div>
  );
};

export default Profile;
