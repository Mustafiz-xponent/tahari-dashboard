import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
import { TbCurrencyTaka } from "react-icons/tb";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: number;
  valueType: "NUMBER" | "CURRENCY" | "PERCENTAGE";
  changeLabel?: string;
  change?: number;
  trend?: "UP" | "DOWN" | "NEUTRAL";
  className?: string;
}
export const MetricCard = ({
  title,
  value,
  valueType,
  changeLabel,
  change,
  trend,
  className,
}: MetricCardProps) => {
  const isPositive = trend === "UP";
  const isNegative = trend === "DOWN";
  return (
    <Card className={twMerge("rounded-md", className)}>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-typography-100 font-secondary font-medium">
              {title}
            </p>
            <p className="text-3xl font-bold font-secondary flex text-foreground mt-2">
              {valueType === "CURRENCY" && <TbCurrencyTaka />}{" "}
              {new Intl.NumberFormat("en-IN").format(value)}
            </p>
            {change !== undefined && (
              <div className="flex items-center mt-2">
                {trend !== "NEUTRAL" && (
                  <>
                    {isPositive && (
                      <TrendingUp className="h-4 w-4 mr-1 text-green-700" />
                    )}
                    {isNegative && (
                      <TrendingDown className="h-4 w-4  mr-1 text-red-700" />
                    )}
                  </>
                )}
                <span
                  className={cn(
                    "text-sm font-secondary font-medium",
                    isPositive && "text-green-700",
                    isNegative && "text-red-700",
                    trend === "NEUTRAL" && "text-typography-75"
                  )}
                >
                  {change > 0 && trend !== "NEUTRAL" ? "+" : ""}
                  {change}%
                </span>
                {changeLabel && (
                  <span className="text-xs text-typography-75 font-secondary ml-1">
                    {changeLabel}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
