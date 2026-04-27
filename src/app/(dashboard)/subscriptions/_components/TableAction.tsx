"use client";
import React from "react";
import { SubscriptionPlan } from "@/types/subscription";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TableAction = ({ data }: { data: SubscriptionPlan }) => {
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
        <DropdownMenuItem>View Details</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableAction;
