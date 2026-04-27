import { z } from "zod";

export const createOrderSchema = z.object({
  customerId: z.number().min(1, "Customer is required"),
  totalAmount: z.number().min(0, "Total amount must be positive"),
  orderStatus: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "CONFIRMED"]),
  paymentStatus: z.enum(["PENDING", "COMPLETED", "FAILED", "REFUNDED", "LOCKED"]),
  deliveryDate: z.string().optional(),
  shippingAddress: z.string().min(1, "Shipping address is required"),
  billingAddress: z.string().min(1, "Billing address is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  notes: z.string().optional(),
});

export const updateOrderSchema = createOrderSchema.partial();