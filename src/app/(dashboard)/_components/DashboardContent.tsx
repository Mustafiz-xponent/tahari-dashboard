"use client";
import React, { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { BarChart } from "@/components/Charts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useGetDashboardSummaryQuery,
  useGetSalesOverviewQuery,
} from "@/redux/services/dashboardApi";
import { generateYearList } from "@/lib";
import { LowStockProduct } from "@/types/dashbord";
import { ChartNoAxesCombined } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RecentOrdersTable from "./RecentOrdersTable";
import MetricCards from "./MetricCards";
import DashboardSkeleton from "@/app/(dashboard)/_components/DashboardSkeleton";

const DashboardContent = () => {
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const { data: summaryData, isLoading } =
    useGetDashboardSummaryQuery(undefined);
  const { data: salesOverviewData } = useGetSalesOverviewQuery(selectedYear);

  const minYear = salesOverviewData?.meta?.yearRange?.min;
  const maxYear = salesOverviewData?.meta?.yearRange?.max;
  const yearOptions = generateYearList(minYear, maxYear);

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <MetricCards data={summaryData?.data} />
      {/* Sales Overview Charts */}
      <section className="grid gap-4 grid-cols-1 lg:grid-cols-[55%_45%] w-full lg:w-[calc(100%-16px)]">
        <Card className="shadow-none rounded-md p-6">
          <CardHeader className="p-0 flex justify-between sm:flex-row flex-col gap-y-4">
            <div>
              <h3 className="font-secondary text-2xl font-bold">
                Sales Overview
              </h3>
              <p className="font-secondary text-sm text-typography-50">
                Monthly sales data for the year {selectedYear}
              </p>
            </div>
            <Select
              value={selectedYear}
              onValueChange={(value) => setSelectedYear(value)}
            >
              <SelectTrigger className="w-[180px] self-end font-secondary focus-visible:border-border focus-visible:ring-0">
                <SelectValue placeholder="Filter by year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem
                    key={year}
                    value={year.toString()}
                    className="font-secondary"
                  >
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
            {summaryData?.data?.lowStockProducts?.length > 0 ? (
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
              )
            ) : (
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
