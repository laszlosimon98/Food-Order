import { useGetCurrentUserQuery } from "@/features/auth/api/authApi";
import ChangePassword from "@/features/profile/components/ChangePassword";
import ModifyData from "@/features/profile/components/ModifyData";
import Button from "@/features/shared/components/Button";
import Loading from "@/features/shared/components/Loading";
import { UserType } from "@/utils/types/user.type";
import { ReactElement, useState } from "react";

const Profile = (): ReactElement => {
  const { data: currentUser, isLoading } = useGetCurrentUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [isPasswordChangeFormVisible, setIsPasswordChangeFormVisible] =
    useState<boolean>(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="">
      {!isPasswordChangeFormVisible && (
        <>
          <ModifyData currentUser={currentUser as UserType} />

          <Button onClick={() => setIsPasswordChangeFormVisible(true)}>
            Jelszó változtatás
          </Button>
        </>
      )}

      {isPasswordChangeFormVisible && (
        <ChangePassword
          setIsPasswordChangeFormVisible={setIsPasswordChangeFormVisible}
        />
      )}
    </div>
  );
};

export default Profile;
