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
