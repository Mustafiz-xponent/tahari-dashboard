import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const BarChartSkeleton = () => {
  return (
    <div className="w-full mx-auto h-[400px] p-6 bg-white rounded-md ">
      {/* Chart Title */}
      <div className="mb-6 sm:mb-10 flex justify-between items-end">
        <div className="w-full">
          <Skeleton className="h-4 w-2/5 mb-2" />
          <Skeleton className="h-8 w-4/5 mb-2" />
        </div>
        <Skeleton className="h-8 w-40 mb-2" />
      </div>

      {/* Chart Area */}
      <div className="grid grid-cols-[auto_1fr] overflow-hidden gap-2">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between h-64 py-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-6" />
        </div>

        {/* Chart bars */}
        <div className="flex items-end justify-between h-64  pt-4">
          {/* Bar 1 */}
          <div className="flex flex-col items-center space-y-3">
            <Skeleton className="w-12 h-32 rounded-t" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Bar 2 */}
          <div className="flex flex-col items-center space-y-3">
            <Skeleton className="w-12 h-48 rounded-t" />
            <Skeleton className="h-4 w-14" />
          </div>

          {/* Bar 3 */}
          <div className="flex flex-col items-center space-y-3">
            <Skeleton className="w-12 h-24 rounded-t" />
            <Skeleton className="h-4 w-12" />
          </div>

          {/* Bar 4 */}
          <div className="flex flex-col items-center space-y-3">
            <Skeleton className="w-12 h-56 rounded-t" />
            <Skeleton className="h-4 w-18" />
          </div>

          {/* Bar 5 */}
          <div className="hidden sm:flex flex-col items-center space-y-3">
            <Skeleton className="w-12 h-40 rounded-t" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Bar 6 */}
          <div className="hidden sm:flex flex-col items-center space-y-3">
            <Skeleton className="w-12 h-64 rounded-t" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Bar 7 */}
          <div className="hidden sm:flex flex-col items-center space-y-3">
            <Skeleton className="w-12 h-36 rounded-t" />
            <Skeleton className="h-4 w-14" />
          </div>

          {/* Bar 8 */}
          <div className="hidden sm:flex flex-col items-center space-y-3">
            <Skeleton className="w-12 h-52 rounded-t" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChartSkeleton;
