export type UserStatus = "Active" | "Inactive" | "Pending" | "Blacklisted";

export type User = {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: UserStatus;
  loansCount?: number;
  savingsCount?: number;
};
