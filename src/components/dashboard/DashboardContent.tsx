"use client";
import React, { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { BarChart } from "@/components/Charts";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useGetDashboardSummaryQuery,
  useGetSalesOverviewQuery,
} from "@/redux/services/dashboardApi";
import { generateYearList, getTrendDirection } from "@/lib";
import { LowStockProduct } from "@/types/dashbord";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ChartNoAxesCombined } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RecentOrdersTable from "./RecentOrdersTable";

const DashboardContent = () => {
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const { data: summaryData, isLoading } = useGetDashboardSummaryQuery({});
  const { data: salesOverviewData } = useGetSalesOverviewQuery(selectedYear);

  const metricsData = [
    {
      title: "Total Revenue",
      value: summaryData?.data?.revenue?.totalRevenue,
      valueType: "CURRENCY",
      changeLabel: summaryData?.data?.revenue?.changeLabel,
      change: summaryData?.data?.revenue?.changePercentage,
      trend: getTrendDirection(summaryData?.data?.revenue?.changePercentage),
    },
    {
      title: "Total Orders",
      value: summaryData?.data?.order?.totalOrders,
      valueType: "NUMBER",
      changeLabel: summaryData?.data?.order?.changeLabel,
      change: summaryData?.data?.order?.changePercentage,
      trend: getTrendDirection(summaryData?.data?.order?.changePercentage),
    },
    {
      title: "Active Subscriptions",
      value: summaryData?.data?.subscription?.totalActiveSubscriptions,
      valueType: "NUMBER",
      changeLabel: summaryData?.data?.subscription?.changeLabel,
      change: summaryData?.data?.subscription?.changePercentage,
      trend: getTrendDirection(
        summaryData?.data?.subscription?.changePercentage
      ),
    },
    {
      title: "Total Products",
      value: summaryData?.data?.product?.totalProducts,
      valueType: "NUMBER",
      changeLabel: summaryData?.data?.product?.changeLabel,
      change: summaryData?.data?.product?.changePercentage,
      trend: getTrendDirection(summaryData?.data?.product?.changePercentage),
    },
  ];

  const minYear = salesOverviewData?.meta?.yearRange?.min;
  const maxYear = salesOverviewData?.meta?.yearRange?.max;
  const yearOptions = generateYearList(minYear, maxYear);

  if (isLoading)
    return <LoadingSpinner height="50vh" size={50} color="#59b77d" />;
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData?.map((metric, index) => (
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
      </section>
      {/* Sales Overview Charts */}
      <section className="grid gap-4 grid-cols-1 lg:grid-cols-[55%_45%] w-full lg:w-[calc(100%-16px)]">
        <Card className="shadow-none rounded-md p-6">
          <CardHeader className="p-0 flex justify-between sm:flex-row flex-col gap-y-4">
            <div>
              <h3 className="font-secondary text-2xl font-bold">
                Sales Overview
              </h3>
              <p className="font-secondary text-sm text-typography-50">
                Monthly sales data for the current year
              </p>
            </div>
            <Select
              value={selectedYear}
              onValueChange={(value) => setSelectedYear(value)}
            >
              <SelectTrigger className="w-[180px] self-end focus-visible:border-border focus-visible:ring-0">
                <SelectValue placeholder="Filter by year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0 h-80 lg:h-96">
            <BarChart
              data_1={salesOverviewData?.data?.data}
              data_2={[]}
              title_1="Revenue"
              title_2=""
              bgColor_1={`hsl(121, 19%, 56%)`}
              bgColor_2=""
              labels={salesOverviewData?.data?.labels}
            />
          </CardContent>
        </Card>
        {/* Low Stock Products List */}
        <Card className="shadow-none rounded-md p-6">
          <CardHeader className="p-0">
            <h3 className="font-secondary text-2xl font-bold">Stock Alerts</h3>
            <p className="font-secondary text-sm text-typography-50">
              Products below reorder level
            </p>
          </CardHeader>
          <CardContent className="p-0 space-y-4 min-h-72 h-full relative">
            {summaryData?.data?.lowStockProducts?.length > 0 &&
              summaryData?.data?.lowStockProducts?.map(
                (product: LowStockProduct, index: number) => (
                  <div
                    key={index}
                    className="w-full border-[1px] border-red-200 rounded-md p-6"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-red-400 font-secondary flex items-center gap-2">
                        <ShieldAlert className="text-red-400" />{" "}
                        <span>{product?.name}</span>
                      </p>
                      <p className="text-red-400 font-secondary">
                        {product?.stockQuantity}/{product?.reorderLevel}
                      </p>
                    </div>
                    <p className="pt-4 font-secondary text-typography-50 text-sm">
                      <span className="font-semibold">Supplier:</span>{" "}
                      {product?.farmName}
                    </p>
                  </div>
                )
              )}
            {summaryData?.data?.lowStockProducts?.length === 0 && (
              <div
                className="absolute flex items-center justify-center flex-col space-y-4
               top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3"
              >
                <div className="bg-brand-50 h-16 w-16 flex items-center justify-center rounded-full">
                  <ChartNoAxesCombined className="text-white h-8 w-8 scale-x-[-1]" />
                </div>
                <p className="font-secondary text-base text-center text-typography-50">
                  No low stock products
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
      {/* Recent Orders Table */}
      <RecentOrdersTable orders={summaryData?.data?.recentOrders} />
    </div>
  );
};

export default DashboardContent;
