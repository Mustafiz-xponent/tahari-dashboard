"use client";
import React from "react";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/types/product";
import Link from "next/link";
import ProductDeleteDialog from "@/app/(dashboard)/products/_components/ProductDeleteDialog";

const TableAction = ({ data }: { data: Product }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="font-secondary pl-1">
        <div className="h-8 w-8 p-0 font-secondary flex items-center cursor-pointer justify-center">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="font-secondary"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link
            href={`/products/details/${data?.productId}`}
            className="flex gap-2 items-center font-secondary text-sm  text-typography-75 cursor-pointer"
          >
            <Eye className="size-4" /> View Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          {/* <EditCategoryDialog category={data} /> */}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ProductDeleteDialog productId={data?.productId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableAction;
