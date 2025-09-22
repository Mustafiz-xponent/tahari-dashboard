import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BarChartSkeleton from "@/components/common/BarChartSkeleton";
import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";

const DashboardSkeleton = () => {
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-md  h-[140px] p-6">
          <Skeleton className="h-4 w-2/5 mb-2" />
          <Skeleton className="h-8 w-4/5 mb-2" />
          <Skeleton className="h-4 w-3/5" />
        </div>
        <div className="bg-white rounded-md h-[140px] p-6">
          <Skeleton className="h-4 w-2/5 mb-2" />
          <Skeleton className="h-8 w-4/5 mb-2" />
          <Skeleton className="h-4 w-3/5" />
        </div>
        <div className="bg-white sm:block hidden rounded-md h-[140px] p-6">
          <Skeleton className="h-4 w-2/5 mb-2" />
          <Skeleton className="h-8 w-4/5 mb-2" />
          <Skeleton className="h-4 w-3/5" />
        </div>
        <div className="bg-white sm:block hidden rounded-md h-[140px] p-6">
          <Skeleton className="h-4 w-2/5 mb-2" />
          <Skeleton className="h-8 w-4/5 mb-2" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </div>
      <div className="grid  gap-4 grid-cols-1 lg:grid-cols-[55%_45%] w-full lg:w-[calc(100%-16px)]">
        <BarChartSkeleton />
        <div className="bg-white rounded-md p-6">
          <Skeleton className="h-8 w-4/5 max-w-72 mb-2" />
          <Skeleton className="h-4 w-2/5 max-w-52 mb-4" />
          <div className="space-y-4">
            <Skeleton className="w-full h-28 sm:h-32" />
            <Skeleton className="w-full h-28 sm:h-32" />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md">
        <Skeleton className="h-8 w-4/5 max-w-72 mb-2" />
        <Skeleton className="h-4 w-2/5 mb-4 max-w-52" />
        <DataTableSkeleton
          columnCount={5}
          rowCount={6}
          filterCount={0}
          withPagination={false}
          withViewOptions={false}
        />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
