// export interface Customer {
//   customerId: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
//   dateOfBirth: string;
//   gender: CustomerGender;
//   registrationDate: string;
//   lastLoginDate: string;
//   isActive: boolean;
//   totalOrders: number;
//   totalSpent: number;
//   loyaltyPoints: number;
//   preferredPaymentMethod: string;
//   notes: string | null;
//   createdAt: string;
//   updatedAt: string;
// }

// export enum CustomerGender {
//   MALE = "MALE",
//   FEMALE = "FEMALE",
//   OTHER = "OTHER",
//   PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
// }

// ---------------------------- 2222222222222222222222 ---------------------
export interface Customer {
  customerId: string; // BigInt serialized as string
  userId: string;
  name: string | null;
  email: string | null;
  phone: string;
  lastMessageId: string | null;
  lastMessage: string | null;
  lastMessageCreatedAt: string | null;
  unreadMessageCount: number;
}

export interface CustomersApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Customer[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  meta: {
    totalUnreadMessageCount: number;
  };
}

export interface SingleCustomerApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Customer;
}
