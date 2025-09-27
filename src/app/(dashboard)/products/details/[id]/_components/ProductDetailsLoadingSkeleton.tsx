import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsLoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* header skeleton */}
      <div className="flex sm:items-center gap-2 sm:flex-row flex-col justify-between">
        <div className="w-full max-w-80">
          <Skeleton className="h-8 w-4/5 mb-2 bg-gray-200" />
          <Skeleton className="h-4  mb-2 bg-gray-200" />
        </div>
        <Skeleton className="h-8 w-32 sm:w-40 bg-gray-200 self-end" />
      </div>
      {/* badge sekelton */}
      <div className="flex items-center flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-20 bg-gray-200" />
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[calc(65%-8px)_calc(35%-8px)]">
        <div className="space-y-6">
          {/* image skeleton */}
          <div className="bg-white rounded-md p-6 space-y-4">
            <Skeleton className="h-8 w-52 sm:w-60 mb-2" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-72 sm:h-80 w-full sm:w-1/2 lg:w-1/3" />
              <Skeleton className="h-72 sm:h-80 sm:block hidden w-1/2 lg:w-1/3" />
              <Skeleton className="lg:block hidden h-72 sm:h-80 w-1/3" />
            </div>
          </div>
          {/* product description sekeleton */}
          <div className="bg-white rounded-md p-6 ">
            <Skeleton className="h-8 w-52 sm:w-60 mb-2" />
            <Skeleton className="w-full h-4 mb-1.5" />
            <Skeleton className="w-full h-4 mb-1.5" />
            <Skeleton className="w-full h-4 mb-1.5" />
          </div>
          {/* pricing and packaging skeleton */}
          <div className="bg-white rounded-md p-6 ">
            <Skeleton className="h-8 w-52 sm:w-60 mb-2" />
            <div className=" gap-2 grid grid-cols-2 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28" />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* stock skeleton */}
          <div className="bg-white p-4 rounded-md">
            <Skeleton className="h-8 w-52 w:60 mb-4" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-4 w-20 mb-2" />
            </div>
            <Skeleton className="h-4 rounded-full w-full mb-2" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-4 w-20 mb-2" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-20 mb-2" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-md">
            <Skeleton className="h-8 w-52 w:60 mb-4" />
            <Skeleton className="w-full h-4 mb-1.5" />
            <Skeleton className="w-full h-4 mb-1.5" />
            <Skeleton className="w-full h-4 mb-1.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLoadingSkeleton;
