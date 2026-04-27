import z from "zod";

export const createSubscriptionPlanSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  frequency: z.enum(["WEEKLY", "MONTHLY"]),
  price: z.number().min(0, "Price must be positive"),
  description: z.string().optional(),
  productId: z.number().min(1, "Product is required"),
});

export const editSubscriptionPlanSchema = z.object({
  name: z.string().min(1).optional(),
  frequency: z.enum(["WEEKLY", "MONTHLY"]).optional(),
  price: z.number().min(0).optional(),
  description: z.string().optional(),
  productId: z.number().min(1).optional(),
});

export const createSubscriptionSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  status: z.enum(["ACTIVE", "PAUSED", "CANCELLED", "EXPIRED", "PENDING"]),
  renewalDate: z.string().optional(),
  customerId: z.number().min(1, "Customer is required"),
  planId: z.number().min(1, "Plan is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  shippingAddress: z.string().min(1, "Shipping address is required"),
  planPrice: z.number().min(0, "Plan price must be positive"),
  nextDeliveryDate: z.string().optional(),
});

export const editSubscriptionSchema = z.object({
  startDate: z.string().min(1).optional(),
  endDate: z.string().optional(),
  status: z.enum(["ACTIVE", "PAUSED", "CANCELLED", "EXPIRED", "PENDING"]).optional(),
  renewalDate: z.string().optional(),
  customerId: z.number().min(1).optional(),
  planId: z.number().min(1).optional(),
  paymentMethod: z.string().min(1).optional(),
  shippingAddress: z.string().min(1).optional(),
  planPrice: z.number().min(0).optional(),
  nextDeliveryDate: z.string().optional(),
});
