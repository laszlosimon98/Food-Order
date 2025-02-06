import ListElement from "@/features/menu/components/ListElement";
import DropdownContainer from "@/features/shared/components/DropdownContainer";
import Icon from "@/features/shared/components/Icon";
import { useAppSelector } from "@/store/hooks/store.hooks";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, ReactElement, SetStateAction } from "react";

type UserIconProps = {
  isDropdownVisible: boolean;
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
};

const UserIcon = ({
  isDropdownVisible,
  logout,
  setIsDropdownVisible,
}: UserIconProps): ReactElement => {
  const currentUser = useAppSelector((state) => state.auth.data.currentUser);

  return (
    <Icon
      icon={faUser}
      size="lg"
      className="hidden md:block"
      onClick={() => setIsDropdownVisible(!isDropdownVisible)}
    >
      {isDropdownVisible && (
        <DropdownContainer className="min-w-52 right-14 top-10 min-h-fit py-4 flex flex-col items-center gap-3 text-black">
          <div className="flex gap-8 items-center">
            <FontAwesomeIcon icon={faUser} />
            <p>{currentUser?.fullname}</p>
          </div>

          <ListElement link="/profile">Profilom</ListElement>
          <ListElement link="/" onClick={logout}>
            Kijelentkezés
          </ListElement>
        </DropdownContainer>
      )}
    </Icon>
  );
};

export default UserIcon;
