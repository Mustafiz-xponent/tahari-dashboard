import React from "react";
import { formatIsoDate } from "@/lib";
import { Badge } from "@/components/ui/badge";
import { RecentOrders } from "@/types/dashbord";
import { TbCurrencyTaka } from "react-icons/tb";
import { Card, CardHeader } from "@/components/ui/card";
import { OrderStatus, PaymentStatus } from "@/types/order";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RecentOrdersTable = ({ orders }: { orders: RecentOrders[] }) => {
  const orderStatusClasses = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case OrderStatus.PROCESSING:
        return "bg-indigo-100 text-indigo-800";
      case OrderStatus.SHIPPED:
        return "bg-purple-100 text-purple-800";
      case OrderStatus.DELIVERED:
        return "bg-green-100 text-green-800";
      case OrderStatus.CANCELLED:
        return "bg-red-100 text-red-800";
      case OrderStatus.CONFIRMED:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const paymentStatusClasses = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case PaymentStatus.COMPLETED:
        return "bg-green-100 text-green-800";
      case PaymentStatus.FAILED:
        return "bg-red-100 text-red-800";
      case PaymentStatus.REFUNDED:
        return "bg-purple-100 text-purple-800";
      case PaymentStatus.LOCKED:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const tableHeaders = [
    "OrderId",
    "Customer",
    "Date",
    "Order Status",
    "Payment Status",
    "Type",
    "Amount",
  ];
  const handleOrderType = (isSubscription: boolean, isPreorder: boolean) => {
    if (isSubscription) return "Subscription";
    if (isPreorder) return "Preorder";
    return "Standard";
  };
  return (
    <Card className="p-6 rounded-md shadow-none">
      <CardHeader className="p-0">
        <h4 className="font-secondary text-2xl font-bold text-typography-100">
          Recent Orders
        </h4>
        <p className="font-secondary text-sm text-typography-50">
          Latest customer orders
        </p>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders?.map((header, index) => (
              <TableHead
                key={index}
                className="py-4 font-secondary text-typography-50"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="font-secondary">
          {orders?.length > 0 &&
            orders?.map((order: RecentOrders, index: number) => (
              <TableRow key={index}>
                <TableCell className="py-4">{order?.orderId}</TableCell>
                <TableCell>{order.customer?.user?.name}</TableCell>
                <TableCell>{formatIsoDate(order?.orderDate)}</TableCell>
                <TableCell>
                  <Badge
                    className={`${orderStatusClasses(
                      order?.status as OrderStatus
                    )}`}
                  >
                    {order?.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${paymentStatusClasses(
                      order?.paymentStatus as PaymentStatus
                    )}`}
                  >
                    {order?.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-gray-200 text-typography-75">
                    {handleOrderType(order?.isSubscription, order?.isPreorder)}
                  </Badge>
                </TableCell>
                <TableCell className="flex  items-center">
                  <TbCurrencyTaka className="text-typography-50 text-xl" />
                  {order?.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          {/* No recent orders */}
          {orders?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-4 text-typography-50 text-base font-secondary text-center"
              >
                No recent orders
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RecentOrdersTable;
