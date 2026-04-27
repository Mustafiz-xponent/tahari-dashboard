import { z } from "zod";

export const createDealSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  discountType: z.enum(["PERCENTAGE", "FLAT"]),
  discountValue: z.number().min(0, "Discount value must be positive"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  isGlobal: z.boolean(),
  productIds: z.array(z.string()).optional(),
});

export const updateDealSchema = createDealSchema.partial();