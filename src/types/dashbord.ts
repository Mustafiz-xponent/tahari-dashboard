export interface LowStockProduct {
  createdAt: string;
  farmerId: string;
  farmName: string;
  name: string;
  productId: string;
  reorderLevel: number;
  stockQuantity: number;
  unitType: string;
}
export interface RecentOrders {
  customer: {
    customerId: string;
    userId: string;
    user: {
      name: string;
    };
  };
  isPreorder: boolean;
  isSubscription: boolean;
  orderDate: string;
  orderId: string;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  totalAmount: string;
}
export interface MetricsData {
  customer: {
    changeLabel: string;
    changePercentage: number;
    totalCustomers: number;
  };
  order: {
    changeLabel: string;
    changePercentage: number;
    totalOrders: number;
  };
  product: {
    changeLabel: string;
    changePercentage: number;
    totalProducts: number;
  };
  revenue: {
    changeLabel: string;
    changePercentage: number;
    totalRevenue: number;
  };
  subscription: {
    changeLabel: string;
    changePercentage: number;
    totalActiveSubscriptions: number;
  };
}
