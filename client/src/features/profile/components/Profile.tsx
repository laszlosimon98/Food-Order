import ChangePassword from "@/features/profile/components/ChangePassword";
import ModifyData from "@/features/profile/components/ModifyData";
import Button from "@/features/shared/components/Button";
import { useAppSelector } from "@/store/hooks/store.hooks";
import { UserType } from "@/utils/types/user.type";
import { ReactElement, useState } from "react";

const Profile = (): ReactElement => {
  const currentUser = useAppSelector((state) => state.auth.data.currentUser);

  const [isPasswordChangeFormVisible, setIsPasswordChangeFormVisible] =
    useState<boolean>(false);

  return (
    <div>
      {!isPasswordChangeFormVisible && (
        <div className="flex justify-center items-center flex-col">
          <Button onClick={() => setIsPasswordChangeFormVisible(true)}>
            Jelszó változtatás
          </Button>

          <ModifyData currentUser={currentUser as UserType} />
        </div>
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
