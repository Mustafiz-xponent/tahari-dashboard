import React from "react";
import { getTrendDirection } from "@/lib";
import { MetricsData } from "@/types/dashbord";
import { MetricCard } from "@/components/MetricCard";

const MetricCards = ({ data }: { data: MetricsData }) => {
  const metricsData = [
    {
      title: "Total Revenue",
      value: data?.revenue?.totalRevenue ?? 0,
      valueType: "CURRENCY",
      changeLabel: data?.revenue?.changeLabel,
      change: data?.revenue?.changePercentage,
      trend: getTrendDirection(data?.revenue?.changePercentage),
    },
    {
      title: "Total Orders",
      value: data?.order?.totalOrders ?? 0,
      valueType: "NUMBER",
      changeLabel: data?.order?.changeLabel,
      change: data?.order?.changePercentage,
      trend: getTrendDirection(data?.order?.changePercentage),
    },
    {
      title: "Active Subscriptions",
      value: data?.subscription?.totalActiveSubscriptions ?? 0,
      valueType: "NUMBER",
      changeLabel: data?.subscription?.changeLabel,
      change: data?.subscription?.changePercentage,
      trend: getTrendDirection(data?.subscription?.changePercentage),
    },
    {
      title: "Total Products",
      value: data?.product?.totalProducts ?? 0,
      valueType: "NUMBER",
      changeLabel: data?.product?.changeLabel,
      change: data?.product?.changePercentage,
      trend: getTrendDirection(data?.product?.changePercentage),
    },
  ];
  return (
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
  );
};

export default MetricCards;
