"use client";
import React from "react";
import { Farmer } from "@/types/farmer";
import { MoreHorizontal } from "lucide-react";
import FarmerDetailsDialog from "@/app/(dashboard)/farmers/_components/FarmerDetailsDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FarmerDeleteDialog from "@/app/(dashboard)/farmers/_components/FarmerDeleteDialog";
import EditFarmerDialog from "@/app/(dashboard)/farmers/_components/EditFarmerDialog";

const TableAction = ({ data }: { data: Farmer }) => {
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
          <FarmerDetailsDialog data={data} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <EditFarmerDialog farmer={data} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <FarmerDeleteDialog farmerId={data?.farmerId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableAction;
