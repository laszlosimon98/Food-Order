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

export type Roles = {
  role: "user" | "empoloyee";
};
