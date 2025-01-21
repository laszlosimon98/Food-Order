import { IdType } from "@/utils/types/query.type";

export type UserType = {
  userId: number;
  fullname: string;
  username: string;
  role: string;
  address: string | null;
  phoneNumber: string | null;
};

export type UserDetailsType = {
  address: string | null;
  phoneNumber: string | null;
};

export type PasswordChangeType = {
  oldPassword: string;
  newPassword: string;
};

export type UpdateRoles = IdType & {
  role: "user" | "empoloyee";
};
