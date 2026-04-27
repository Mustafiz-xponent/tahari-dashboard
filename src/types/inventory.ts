// export interface InventoryPurchase {
//   purchaseId: number;
//   quantity: number;
//   unitCost: number;
//   totalCost: number;
//   purchaseDate: string;
//   status: InventoryPurchaseStatus;
//   notes: string | null;
//   createdAt: string;
//   updatedAt: string;
//   farmerId: number;
//   productId: number;
//   packageSize: number;
//   farmer: object;
//   product: object;
//   stockTransactions: object[];
// }

// export enum InventoryPurchaseStatus {
//   PENDING = "PENDING",
//   COMPLETED = "COMPLETED",
//   CANCELLED = "CANCELLED",
// }

// ----------------------------- 2222222222222222222222222222 ----------------------------
export interface InventoryPurchase {
  purchaseId: string | number;
  quantity: number;
  unitCost: string | number;
  totalCost: string | number;
  purchaseDate: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  notes?: string;
  farmerId: string | number;
  productId: string | number;
  packageSize: number;
  createdAt: string;
  updatedAt: string;
  farmer?: {
    farmerId: string | number;
    name: string;
    farmName: string;
  };
  product?: {
    productId: string | number;
    name: string;
    description?: string;
  };
}

export interface CreateInventoryPurchaseDto {
  quantity: number;
  unitCost: number;
  totalCost: number;
  purchaseDate?: string;
  status?: "PENDING" | "COMPLETED" | "CANCELLED";
  notes?: string;
  farmerId: string | number;
  productId: string | number;
  packageSize?: number;
}

export interface UpdateInventoryPurchaseDto {
  quantity?: number;
  unitCost?: number;
  totalCost?: number;
  purchaseDate?: string;
  status?: "PENDING" | "COMPLETED" | "CANCELLED";
  notes?: string;
  farmerId?: string | number;
  productId?: string | number;
  packageSize?: number;
}

export interface InventoryFilters {
  search: string;
  limit: number;
  page: number;
  status?: "PENDING" | "COMPLETED" | "CANCELLED";
  farmerId?: string;
  productId?: string;
}

// ✅ Added missing type
export interface SingleInventoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: InventoryPurchase;
}

export interface InventoryPaginationResponse {
  data: InventoryPurchase[];
  pagination: {
    totalPages: number;
    currentPage: number;
    totalCount: number;
    limit: number;
  };
}
