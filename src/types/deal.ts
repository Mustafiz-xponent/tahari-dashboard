export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FLAT = "FLAT",
}
export interface Deal {
  dealId: string;
  title: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  isGlobal: boolean;
  productIds: string[];
  createdAt: string;
  updatedAt: string;
}
