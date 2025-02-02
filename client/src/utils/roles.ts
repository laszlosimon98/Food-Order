import { UserType } from "@/utils/types/user.type";

export enum RolesEnum {
  USER = "user",
  EMPLOYEE = "employee",
  ADMIN = "admin",
}

export const hasPermission = <T extends { userId: number }>(
  roles: RolesEnum[],
  currentUser?: UserType,
  action?: T
): boolean => {
  if (
    (roles && !currentUser) ||
    (roles &&
      currentUser &&
      (roles.every((role) => role !== currentUser.role) ||
        (action && action.userId !== currentUser.userId)))
  ) {
    return false;
  }

  return true;
};
