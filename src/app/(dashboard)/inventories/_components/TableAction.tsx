// "use client";
// import React from "react";
// import { InventoryPurchase } from "@/types/inventory";
// import { MoreHorizontal } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const TableAction = ({ data }: { data: InventoryPurchase }) => {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild className="font-secondary pl-1">
//         <div className="h-8 w-8 p-0 font-secondary flex items-center cursor-pointer justify-center">
//           <span className="sr-only">Open menu</span>
//           <MoreHorizontal className="size-5" />
//         </div>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         align="end"
//         className="font-secondary"
//         onCloseAutoFocus={(e) => e.preventDefault()}
//       >
//         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//         <DropdownMenuItem>View Details</DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem>Edit</DropdownMenuItem>
//         <DropdownMenuItem>Delete</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default TableAction;

// ------------------------------ 22222222222222222222222 ------------------------
"use client";
import React, { useState } from "react";
import { InventoryPurchase } from "@/types/inventory";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InventoryDialog } from "./InventoryDialog";
import { DeleteInventoryDialog } from "./DeleteInventoryDialog";
import { ViewInventoryDialog } from "./ViewInventoryDialog";

const TableAction = ({ data }: { data: InventoryPurchase }) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
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
          <DropdownMenuItem onClick={() => setViewOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialogs */}
      <ViewInventoryDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        inventory={data}
      />
      <InventoryDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        inventory={data}
      />
      <DeleteInventoryDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        inventoryId={data.purchaseId}
        productName={data.product?.name}
      />
    </>
  );
};

export default TableAction;
