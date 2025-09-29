"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetProductQuery } from "@/redux/services/productsApi";
import { DiscountType } from "@/types/deal";
import { AlertTriangle, Calendar, Pencil, Repeat, Tag } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AppImage from "@/components/common/AppImage";
import { TbCurrencyTaka } from "react-icons/tb";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@radix-ui/react-separator";
import ProductDetailsLoadingSkeleton from "@/app/(dashboard)/products/details/[id]/_components/ProductDetailsLoadingSkeleton";
interface PricingCardData {
  label: string;
  value: string | number;
  subLabel: string;
  isCurrency?: boolean;
  className?: string;
}
const ProductDetailsContent = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductQuery(id);
  const productData = data?.data;

  const isLowStock =
    Number(productData?.stockQuantity) <= Number(productData?.reorderLevel);

  const isOutOfStock = Number(productData?.stockQuantity) === 0;
  const stockPercentage =
    (Number(productData?.stockQuantity) /
      (Number(productData?.stockQuantity) +
        Number(productData?.reorderLevel))) *
    100;

  const pricingCardData: PricingCardData[] = [
    {
      label: "Unit Price",
      value: productData?.unitPrice,
      subLabel: `per ${productData?.unitType?.toLowerCase()}`,
      isCurrency: true,
    },
    {
      label: "Package Price",
      value: Number(productData?.unitPrice) * Number(productData?.packageSize),
      subLabel: `per ${
        productData?.packageSize
      } ${productData?.unitType?.toLowerCase()}`,
      isCurrency: true,
    },
    {
      label: "Package Size",
      value: productData?.packageSize,
      subLabel: productData?.unitType?.toLowerCase(),
    },
    {
      label: "Unit Type",
      value: productData?.unitType,
      subLabel: "Measurement",
    },
  ];
  if (isLoading) {
    return <ProductDetailsLoadingSkeleton />;
  }
  return (
    <>
      <header className="flex sm:items-center gap-2 sm:flex-row flex-col justify-between">
        <div>
          <h2 className="font-secondary  text-typography-100 tracking-tight text-2xl font-bold">
            Product Details - {productData?.name}
          </h2>
          <p className="text-typography-75 font-secondary">
            Manage and review product information at a glance
          </p>
        </div>
        {/* Add Product Button */}
        <Link
          href={`/products/edit/${productData?.productId}`}
          className="block self-end"
        >
          <Button
            variant="outline"
            className="h-11 w-fit font-secondary rounded-sm cursor-pointer text-typography-5 hover:text-white bg-brand-100 hover:bg-btn-hover"
          >
            <Pencil />
            <span>Edit Product</span>
          </Button>
        </Link>
      </header>
      {/* Status Badges */}
      <div className="flex gap-2 flex-wrap">
        {productData?.isSubscription && (
          <Badge
            variant="default"
            className=" rounded-sm flex items-center font-secondary bg-blue-100 text-blue-800 border border-blue-200"
          >
            <Repeat className="w-3 h-3" />
            Subscription Available
          </Badge>
        )}
        {productData?.isPreorder && (
          <Badge
            variant="default"
            className="bg-orange-100 font-secondary rounded-sm text-orange-800 border border-orange-200"
          >
            <Calendar className="w-3 h-3" />
            Pre-order
          </Badge>
        )}
        {(productData?.hasActiveDeal || productData?.hasActiveGlobalDeal) && (
          <Badge
            variant="default"
            className="rounded-sm flex items-center font-secondary  bg-green-100 text-green-800 border border-green-200"
          >
            <Tag className="w-3 h-3 mr-1" />
            {productData?.deal?.discountValue}
            {productData?.deal?.discountType === DiscountType.PERCENTAGE
              ? "%"
              : "Tk"}{" "}
            Off -{" "}
            {productData?.hasActiveDeal
              ? `${productData?.deal?.title}`
              : "Global Deal"}
          </Badge>
        )}
        {isLowStock && (
          <Badge
            variant="default"
            className="font-secondary flex items-center rounded-sm bg-red-100 text-red-800 border border-red-200"
          >
            <AlertTriangle className="w-3 h-3" />
            Low Stock
          </Badge>
        )}
        {isOutOfStock && (
          <Badge
            variant="destructive"
            className="bg-gray-100 rounded-sm font-secondary text-gray-600 border border-gray-300"
          >
            <AlertTriangle className="w-3 h-3 mr-1" />
            Out of Stock
          </Badge>
        )}
      </div>
      {/* Product Details */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[calc(65%-8px)_calc(35%-8px)]">
        <div className="space-y-6">
          {/* Product Images */}
          {productData?.accessibleImageUrls.length > 0 && (
            <div className="bg-white border-[1px] border-gray-200 rounded-md p-4">
              <h6 className="font-secondary flex items-center gap-1 text-typography-100 text-xl font-semibold">
                Product Images
              </h6>
              <Carousel className="w-full mt-3 ">
                <CarouselContent className="-ml-1">
                  {productData?.accessibleImageUrls.map(
                    (src: string, index: number) => (
                      <CarouselItem
                        key={index}
                        className="pl-1 md:basis-1/2 lg:basis-1/3"
                      >
                        <AppImage
                          name={"image"}
                          image={src}
                          className="w-full h-64 border-[1px] border-gray-200 rounded-md cursor-grabbing"
                        />
                      </CarouselItem>
                    )
                  )}
                </CarouselContent>
              </Carousel>
            </div>
          )}
          {/* Product Description */}
          {productData?.description && (
            <div className="bg-white border-[1px] border-gray-200 rounded-md p-4">
              <h6 className="font-secondary flex items-center gap-1 text-typography-100 text-xl font-semibold">
                Product Description
              </h6>
              <p className="font-secondary  mt-3">{productData?.description}</p>
            </div>
          )}
          {/* Product pricing and Packaging */}
          <div className="bg-white border-[1px] border-gray-200 rounded-md p-4">
            <h6 className="font-secondary flex items-center gap-1 text-typography-100 text-xl font-semibold">
              Pricing and Packaging
            </h6>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
              {pricingCardData?.map((data: PricingCardData, index: number) => {
                return (
                  <div className={`bg-blue-50 p-3 rounded-md`} key={index}>
                    <p className="font-secondary text-sm font-medium text-typography-50">
                      {data?.label}
                    </p>
                    <p className="font-secondary flex items-center mt-1 text-typography-100 text-xl sm:text-2xl font-extrabold">
                      {data?.isCurrency && (
                        <TbCurrencyTaka className="text-typography-50" />
                      )}
                      {data?.isCurrency
                        ? Number(data?.value).toFixed(2)
                        : data?.value}
                    </p>
                    {data?.subLabel && (
                      <p className="font-secondary text-typography-50 text-sm">
                        {data?.subLabel}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white border-[1px] border-gray-200 rounded-md p-4">
            <h6 className="font-secondary flex items-center gap-1 text-typography-100 text-xl font-semibold">
              Stock Mangement
            </h6>
            <div>
              <div className="flex justify-between items-center mt-2 mb-1 ">
                <span className="text-sm font-medium font-secondary">
                  Current Stock
                </span>
                <span className="text-2xl font-secondary font-bold">
                  {productData?.stockQuantity}{" "}
                  {productData?.unitType.toLowerCase()}
                </span>
              </div>
              <Progress
                value={stockPercentage}
                className="h-3 bg-gray-200" // track
                indicatorClassName={isLowStock ? "bg-red-500" : "bg-green-500"} // fill
              />
              <div className="flex justify-between text-xs font-secondary text-typography-50 mt-1">
                <span>Reorder at {productData?.reorderLevel}</span>
                <span>{Math.round(stockPercentage)}%</span>
              </div>
              <Separator className="my-3 w-full h-0.5 bg-gray-100" />

              <div className="space-y-2">
                <div className="flex justify-between font-secondary">
                  <span className="text-sm">Packages Available</span>
                  <span className="font-medium">
                    {Math.floor(
                      Number(productData?.stockQuantity) /
                        Number(productData?.packageSize)
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-secondary">
                  <span className="text-sm">Reorder Level</span>
                  <span className="font-medium">
                    {productData?.reorderLevel}{" "}
                    {productData?.unitType.toLowerCase()}
                  </span>
                </div>
              </div>

              {isLowStock && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 font-secondary mt-1 rounded-lg">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Stock Alert</span>
                  </div>
                  <p className="text-xs text-destructive/80 mt-1">
                    Stock is below reorder level. Consider restocking soon.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white border-[1px] border-gray-200 rounded-md p-4">
            <h6 className="font-secondary flex items-center gap-1 text-typography-100 text-xl font-semibold">
              Product Details
            </h6>
            <div className="space-y-0.5 my-3">
              <p className="font-secondary text-typography-50 font-semibold text-sm">
                Farmer
              </p>
              <p className="font-secondary text-typography-100 font-medium">
                {productData?.farmer?.farmName}
              </p>
              <p className="font-secondary text-typography-50 text-sm">
                {productData?.farmer?.address}
              </p>
            </div>
            <Separator className="my-3 w-full h-0.5 bg-gray-100" />
            <div>
              <p className="font-secondary text-typography-50 font-semibold text-sm">
                Category
              </p>
              <Badge className="mt-2 p-1 font-medium px-2 bg-blue-50 text-blue-800 border border-blue-200 rounded-sm font-secondary">
                {productData?.category?.name}
              </Badge>
            </div>
            <Separator className="my-3 w-full h-0.5 bg-gray-100" />
            <div>
              <p className="font-secondary text-typography-50 font-semibold text-sm">
                Created
              </p>
              <p className="font-secondary text-typography-100 text-sm">
                {new Date(productData?.createdAt).toDateString()}
              </p>
              <p className="font-secondary mt-2 text-typography-50 font-semibold text-sm">
                Last Updated
              </p>
              <p className="font-secondary text-typography-100 text-sm">
                {new Date(productData?.updatedAt).toDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsContent;
