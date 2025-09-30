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
import { Promotion } from "@/types/promotion";
import PromotionDeleteDialog from "@/app/(dashboard)/promotions/_components/PromotionDeleteDialog";
import EditPromotionDialog from "./EditPromotionDialog";

const TableAction = ({ data }: { data: Promotion }) => {
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
          <EditPromotionDialog promotion={data} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <PromotionDeleteDialog promotionId={data?.promotionId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableAction;
