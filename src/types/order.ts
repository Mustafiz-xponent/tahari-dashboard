export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  CONFIRMED = "CONFIRMED",
}
export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  LOCKED = "LOCKED",
}

export interface Order {
  orderId: number;
  customerId: number;
  totalAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  orderDate: string;
  deliveryDate: string | null;
  shippingAddress: string;
  billingAddress: string;
  paymentMethod: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  customer: object;
  orderItems: object[];
}
