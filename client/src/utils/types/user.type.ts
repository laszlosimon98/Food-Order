import { RolesEnum } from "@/utils/roles";
import { IdType } from "@/utils/types/query.type";

export type UserType = {
  userId: number;
  fullname: string;
  username: string;
  role: RolesEnum;
  address: string | null;
  phoneNumber: string | null;
};

export type UserDetailsType = {
  userId: number;
  fullname?: string;
  address?: string;
  phoneNumber?: string;
};

export type PasswordChangeType = {
  userId: number;
  oldPassword: string;
  newPassword: string;
};

export type UpdateRoles = IdType & {
  role: Omit<RolesEnum, "admin">;
};
