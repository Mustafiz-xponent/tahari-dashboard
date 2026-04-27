// User roles
export enum UserRole {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  SUPPORT = "SUPPORT",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
}
// Type definitions for user
export interface User {
  userId: number;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  address: string[];
  status: UserStatus;
}

export interface Customer {
  customerId: number;
  userId: number;
  user: User;
  orders: object[];
  subscriptions: object[];
  wallet: object;
}
