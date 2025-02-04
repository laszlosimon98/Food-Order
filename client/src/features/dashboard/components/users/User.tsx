import { setRole } from "@/features/fitler-order-limit/slice/filterOrderLimitSlice";
import Button from "@/features/shared/components/Button";
import TextInput from "@/features/shared/components/form/TextInput";
import Properties from "@/features/shared/components/Properties";
import {
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} from "@/features/user/api/userApi";
import { RolesEnum } from "@/utils/roles";
import { UserType } from "@/utils/types/user.type";
import { ChangeEvent, ReactElement, useState } from "react";

type UserProps = {
  user: UserType;
};

export const translateRole = (role: RolesEnum) => {
  if (role === RolesEnum.ADMIN) return "Admin";
  if (role === RolesEnum.EMPLOYEE) return "Dolgozó";
  if (role === RolesEnum.USER) return "Felhasználó";
};

const UserCard = ({ user }: UserProps): ReactElement => {
  const [isRoleChanging, setIsRoleChanging] = useState<boolean>(false);
  const [newRole, setNewRole] = useState<RolesEnum>(RolesEnum.USER);

  const [useUpdateUserRole] = useUpdateUserRoleMutation();
  const [useDeleteUser] = useDeleteUserMutation();

  const updateRole = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = Object.keys(RolesEnum).indexOf(e.target.value.toUpperCase());
    setNewRole(Object.values(RolesEnum)[index]);
  };

  const handleButtonClick = () => {
    if (isRoleChanging) {
      handleUpdate(user.userId);
      setIsRoleChanging(false);
    } else {
      setIsRoleChanging(true);
    }
  };

  const handleUpdate = async (userId: number) => {
    const index = Object.keys(RolesEnum).indexOf(newRole.toUpperCase());
    const role = Object.values(RolesEnum)[index];
    console.log(role);
    await useUpdateUserRole({ id: userId, role });
  };

  const handleDeleteUser = async (userId: number) => {
    await useDeleteUser({ id: userId });
  };

  return (
    <div className="w-full shadow-md rounded-lg my-5 p-5">
      <div className="w-3/4 mx-auto">
        <Properties property="Név" value={user.fullname} />

        {isRoleChanging ? (
          <>
            <label htmlFor="changeRole">Új szerepkör</label>
            <select onChange={updateRole}>
              <option value={RolesEnum.USER}>Felhasználó</option>
              <option value={RolesEnum.EMPLOYEE}>Dolgozó</option>
            </select>
          </>
        ) : (
          <Properties
            property="Szerepkör"
            value={translateRole(user.role) as RolesEnum}
          />
        )}

        {user.address && (
          <Properties property="Cím" value={`${user.address}`} />
        )}
        {user.phoneNumber && (
          <Properties property="Telefonszám" value={`${user.phoneNumber}`} />
        )}
      </div>

      <div className="w-full flex justify-center">
        {user.role !== RolesEnum.ADMIN && (
          <div className="flex gap-10">
            <Button onClick={handleButtonClick}>Szerepkör módosítás</Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteUser(user.userId)}
            >
              Felhasználó törlés
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
