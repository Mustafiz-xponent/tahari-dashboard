import z from "zod";

export const createInventoryPurchaseSchema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitCost: z.number().min(0, "Unit cost must be positive"),
  totalCost: z.number().min(0, "Total cost must be positive"),
  purchaseDate: z.string().min(1, "Purchase date is required"),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]),
  notes: z.string().optional(),
  farmerId: z.number().min(1, "Farmer is required"),
  productId: z.number().min(1, "Product is required"),
  packageSize: z.number().min(0.1, "Package size must be positive"),
});

export const editInventoryPurchaseSchema = z.object({
  quantity: z.number().min(1).optional(),
  unitCost: z.number().min(0).optional(),
  totalCost: z.number().min(0).optional(),
  purchaseDate: z.string().min(1).optional(),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]).optional(),
  notes: z.string().optional(),
  farmerId: z.number().min(1).optional(),
  productId: z.number().min(1).optional(),
  packageSize: z.number().min(0.1).optional(),
});
