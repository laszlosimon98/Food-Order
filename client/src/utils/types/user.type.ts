import { IdType } from "@/utils/types/query.type";

export type UserRoles = "admin" | "employee" | "user";

export type UserType = {
  id: number;
  fullname: string;
  username: string;
  role: UserRoles;
  address: string | null;
  phoneNumber: string | null;
};

export type UserDetailsType = {
  fullname?: string;
  address?: string;
  phoneNumber?: string;
};

export type PasswordChangeType = {
  oldPassword: string;
  newPassword: string;
};

export type UpdateRoles = IdType & {
  role: Omit<UserRoles, "admin">;
};
