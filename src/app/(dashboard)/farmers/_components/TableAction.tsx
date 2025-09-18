"use client";
import React from "react";
import { Farmer } from "@/types/farmer";
import { Pencil, Trash, MoreHorizontal } from "lucide-react";
import FarmerDetailsDialog from "@/app/(dashboard)/farmers/_components/FarmerDetailsDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TableAction = ({ data }: { data: Farmer }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="font-secondaryr  pl-1">
        <div className="h-8 w-8 p-0 font-secondary flex items-center cursor-pointer justify-center">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="font-secondary">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
          }}
          onSelect={(e) => {
            e.stopPropagation();
          }}
        >
          <FarmerDetailsDialog data={data} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Pencil /> Edit Farmer
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="text-red-500" /> Delete Farmer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableAction;
