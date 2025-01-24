import { AddressType } from "@/features/profile/components/ModifyData";
import { UserType } from "@/utils/types/user.type";

export const getDefaultAddress = (
  currentUser: UserType,
  key: string
): string => {
  if (currentUser.address) {
    const address = currentUser.address.replace(",", "").split(" ");

    const result: AddressType = {
      zipCode: address[0],
      city: address[1],
      street: "".concat(address[2], " ", address[3], " ", address[4]),
      houseNumber: address[5],
    };

    return result[key];
  }

  return "";
};
