import React from "react";
import { BarChart } from "@/components/Charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics = () => {
  // Mock data for analytics
  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4500 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 5500 },
  ];

  const customerData = [
    { month: "Jan", customers: 100 },
    { month: "Feb", customers: 120 },
    { month: "Mar", customers: 150 },
    { month: "Apr", customers: 140 },
    { month: "May", customers: 180 },
    { month: "Jun", customers: 200 },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed analytics and insights for your business.
        </p>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data_1={salesData.map(d => d.sales)} data_2={[]} title_1="Sales" title_2="" bgColor_1="hsl(121, 19%, 56%)" bgColor_2="" labels={salesData.map(d => d.month)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data_1={customerData.map(d => d.customers)} data_2={[]} title_1="Customers" title_2="" bgColor_1="hsl(221, 83%, 53%)" bgColor_2="" labels={customerData.map(d => d.month)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
