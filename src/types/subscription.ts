import { Product } from "./product";
import { OrderStatus } from "./order";

export interface Subscription {
  subscriptionId: number;
  startDate: string;
  endDate: string | null;
  status: SubscriptionStatus;
  renewalDate: string | null;
  createdAt: string;
  updatedAt: string;
  customerId: number;
  planId: number;
  paymentMethod: string;
  isProcessing: boolean;
  shippingAddress: string;
  planPrice: number;
  nextDeliveryDate: string | null;
  customer: object;
  subscriptionPlan: SubscriptionPlan;
  subscriptionDeliveries: SubscriptionDelivery[];
}

export interface SubscriptionPlan {
  planId: number;
  name: string;
  frequency: SubscriptionPlanType;
  price: number;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  productId: number;
  subscriptions: Subscription[];
  product: Product;
}

export interface SubscriptionDelivery {
  deliveryId: number;
  deliveryDate: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  subscriptionId: number;
  orderId: number;
  order: object;
  subscription: Subscription;
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
  PENDING = "PENDING",
}

export enum SubscriptionPlanType {
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}
