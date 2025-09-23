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
  reorderLevel: number;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
}
