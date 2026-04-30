// export enum DiscountType {
//   PERCENTAGE = "PERCENTAGE",
//   FLAT = "FLAT",
// }
// export interface Deal {
//   dealId: string;
//   title: string;
//   description: string;
//   discountType: DiscountType;
//   discountValue: number;
//   startDate: string;
//   endDate: string;
//   isGlobal: boolean;
//   productIds: string[];
//   createdAt: string;
//   updatedAt: string;
// }

import { Product } from "./product";

// -------------------------- 22222222222222222222 ----------------------
export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FLAT = "FLAT",
}

export interface Deal {
  dealId: string;
  title: string;
  description: string | null;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  isGlobal: boolean;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
}

export interface DealResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Deal | Deal[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
