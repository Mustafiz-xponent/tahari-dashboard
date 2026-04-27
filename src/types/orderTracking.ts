// export interface OrderTracking {
//   trackingId: number;
//   orderId: number;
//   status: string;
//   location: string;
//   latitude: number;
//   longitude: number;
//   estimatedDelivery?: string;
//   actualDelivery?: string | null;
//   carrier: string;
//   trackingNumber: string;
//   notes?: string;
//   updatedAt?: string;
//   createdAt?: string;
//   order?: object;
// }

// export enum OrderTrackingStatus {
//   PENDING = "PENDING",
//   PICKED_UP = "PICKED_UP",
//   IN_TRANSIT = "IN_TRANSIT",
//   OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
//   DELIVERED = "DELIVERED",
//   FAILED_DELIVERY = "FAILED_DELIVERY",
//   RETURNED = "RETURNED",
// }

// -------------------------- 2222222222222222222222222 -------------------------
export enum OrderTrackingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface OrderTracking {
  trackingId: number;
  orderId: number;
  status: OrderTrackingStatus;
  description?: string;
  createdAt?: string;
  updateDate?: string;
}