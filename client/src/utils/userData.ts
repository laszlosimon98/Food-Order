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
      street: address
        .slice(2, address.length - 1)
        .join(" ")
        .trim(),
      houseNumber: address[address.length - 1],
    };

    return result[key];
  }

  return "";
};
