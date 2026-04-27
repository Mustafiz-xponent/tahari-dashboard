// import { z } from "zod";

// export const createOrderTrackingSchema = z.object({
//   orderId: z.number().min(1, "Order is required"),
//   status: z.enum([
//     "PENDING",
//     "PICKED_UP",
//     "IN_TRANSIT",
//     "OUT_FOR_DELIVERY",
//     "DELIVERED",
//     "FAILED_DELIVERY",
//     "RETURNED",
//   ]),
//   location: z.string().min(1, "Location is required"),
//   latitude: z.number().min(-90).max(90, "Invalid latitude"),
//   longitude: z.number().min(-180).max(180, "Invalid longitude"),
//   estimatedDelivery: z.date({ required_error: "Estimated delivery date is required" }),
//   actualDelivery: z.date().optional(),
//   carrier: z.string().min(1, "Carrier is required"),
//   trackingNumber: z.string().min(1, "Tracking number is required"),
//   notes: z.string().optional(),
// });

// export const updateOrderTrackingSchema = createOrderTrackingSchema.partial();


// ------------------------ 222222222222222222222222222 ---------------------------
import { z } from "zod";
import { OrderTrackingStatus } from "@/types/orderTracking";

const orderStatusEnum = z.nativeEnum(OrderTrackingStatus);

export const createOrderTrackingSchema = z.object({
  orderId: z.number().positive("Order ID must be positive"),
  status: orderStatusEnum,
  description: z.string().optional(),
});

export const updateOrderTrackingSchema = createOrderTrackingSchema.partial();