export interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  dateOfBirth: string;
  gender: CustomerGender;
  registrationDate: string;
  lastLoginDate: string;
  isActive: boolean;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  preferredPaymentMethod: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export enum CustomerGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
}