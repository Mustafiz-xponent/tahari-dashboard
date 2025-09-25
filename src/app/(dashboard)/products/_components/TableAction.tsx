"use client";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/types/product";

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
          {/* <EditCategoryDialog category={data} /> */}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          {/* <CategoryDeleteDialog categoryId={data?.categoryId} /> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableAction;
