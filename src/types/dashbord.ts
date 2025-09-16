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
