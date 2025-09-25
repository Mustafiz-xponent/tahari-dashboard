import { Farmer } from "@/types/farmer";

export enum ProductUnitType {
  KG = "KG",
  GM = "GM",
  L = "L",
  ML = "ML",
  PCS = "PCS",
  PACK = "PACK",
  BUNDLE = "BUNDLE",
  DOZEN = "DOZEN",
}
export interface Product {
  productId: string;
  name: string;
  unitType: ProductUnitType;
  unitPrice: string;
  packageSize: number;
  reorderLevel: number;
  stockQuantity: number;
  accessibleImageUrls: string[];
  farmer: Farmer;
  isSubscription: boolean;
  isPreorder: boolean;
  createdAt: string;
  updatedAt: string;
}
