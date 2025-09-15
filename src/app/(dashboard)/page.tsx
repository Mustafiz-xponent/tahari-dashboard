import React from "react";
import { ShieldAlert } from "lucide-react";
import { BarChart } from "@/components/Charts";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dasborad = () => {
  const metricData = [
    {
      title: "Total Revenue",
      value: 847520,
      valueType: "CURRENCY",
      changeLabel: "Last 7 days",
      change: 12,
      trend: "UP",
    },
    {
      title: "Total Orders",
      value: 2847,
      valueType: "NUMBER",
      changeLabel: "Last 7 days",
      change: 12,
      trend: "DOWN",
    },
    {
      title: "Active Subscriptions",
      value: 127,
      valueType: "NUMBER",
      changeLabel: "Last 7 days",
      change: 12,
      trend: "UP",
    },
    {
      title: "Total Products",
      value: 111,
      valueType: "NUMBER",
      changeLabel: "Last 7 days",
      change: 12,
      trend: "UP",
    },
  ];
  const stockAlertsData = [
    {
      product: "Organic Carrots",
      quantity: 12,
      reorderLevel: 10,
      supplier: "Green Valley Farm",
    },
    {
      product: "Organic Potatoes",
      quantity: 8,
      reorderLevel: 5,
      supplier: "Riverside Organics",
    },
    {
      product: "Organic Tomatoes",
      quantity: 6,
      reorderLevel: 3,
      supplier: "Sunflower Farms",
    },
  ];
  const tableHeaders = ["OrderId", "Customer", "Date", "Status", "Amount"];
  const tableData = [
    {
      orderId: "ORD-123",
      customer: "John Doe",
      date: "2023-08-01",
      status: "Pending",
      amount: "$50.00",
    },
    {
      orderId: "ORD-456",
      customer: "Jane Smith",
      date: "2023-08-02",
      status: "Delivered",
      amount: "$100.00",
    },
    {
      orderId: "ORD-789",
      customer: "Bob Johnson",
      date: "2023-08-03",
      status: "Cancelled",
      amount: "$75.00",
    },
    {
      orderId: "ORD-101",
      customer: "Alice Brown",
      date: "2023-08-04",
      status: "Delivered",
      amount: "$150.00",
    },
    {
      orderId: "ORD-202",
      customer: "Charlie Davis",
      date: "2023-08-05",
      status: "Pending",
      amount: "$25.00",
    },
  ];
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-secondary  text-typography-100 tracking-tight text-2xl font-bold">
          Dashboard
        </h2>
        <p className="text-typography-75 font-secondary">
          Overview of your farm produce operations
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricData?.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            valueType={metric.valueType as "NUMBER" | "CURRENCY" | "PERCENTAGE"}
            changeLabel={metric.changeLabel}
            change={metric.change}
            trend={metric.trend as "UP" | "DOWN" | "NEUTRAL"}
          />
        ))}
      </div>
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-[55%_45%] w-full">
        <Card className="shadow-none rounded-md p-6">
          <CardHeader className="p-0">
            <h3 className="font-secondary text-2xl font-bold">
              Sales Overview
            </h3>
            <p className="font-secondary text-sm text-typography-50">
              Monthly sales data for the current year
            </p>
          </CardHeader>
          <CardContent className="p-0 h-80 lg:h-96">
            <BarChart
              data_1={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              data_2={[]}
              title_1="Revenue"
              title_2=""
              bgColor_1={`hsl(121, 19%, 56%)`}
              bgColor_2=""
              labels={[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ]}
            />
          </CardContent>
        </Card>
        <Card className="shadow-none rounded-md p-6">
          <CardHeader className="p-0">
            <h3 className="font-secondary text-2xl font-bold">Stock Alerts</h3>
            <p className="font-secondary text-sm text-typography-50">
              Products below reorder level
            </p>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            {stockAlertsData?.map((alert, index) => (
              <div
                key={index}
                className="w-full border-[1px] border-red-200 rounded-md p-6"
              >
                <div className="flex items-center justify-between gap-1">
                  <p className="text-red-400 font-secondary flex items-center gap-2">
                    {" "}
                    <ShieldAlert className="text-red-400" />{" "}
                    <span>{alert.product}</span>
                  </p>
                  <p className="text-red-400 font-secondary">
                    {alert.quantity}/{alert.reorderLevel}
                  </p>
                </div>
                <p className="pt-4 font-secondary text-typography-50 text-sm">
                  <span className="font-semibold">Supplier:</span>{" "}
                  {alert.supplier}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
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
          <TableBody>
            {tableData?.map((order, index) => (
              <TableRow key={index}>
                <TableCell className="py-4 font-secondary">
                  {order.orderId}
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Dasborad;
