"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InventoryPurchase } from "@/types/inventory";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface ViewInventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inventory: InventoryPurchase;
}

export function ViewInventoryDialog({
  open,
  onOpenChange,
  inventory,
}: ViewInventoryDialogProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500";
      case "PENDING":
        return "bg-yellow-500";
      case "CANCELLED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Inventory Purchase Details</DialogTitle>
          <DialogDescription>
            Purchase ID: #{inventory.purchaseId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status */}
          <div>
            <Badge className={getStatusColor(inventory.status)}>
              {inventory.status}
            </Badge>
          </div>

          {/* Product & Farmer Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Product
              </h4>
              <p className="text-base font-semibold">
                {inventory.product?.name ?? "N/A"}
              </p>
              {inventory.product?.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {inventory.product.description}
                </p>
              )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Farmer
              </h4>
              <p className="text-base font-semibold">
                {inventory.farmer?.name ?? "N/A"}
              </p>
              {inventory.farmer?.farmName && (
                <p className="text-sm text-muted-foreground mt-1">
                  {inventory.farmer.farmName}
                </p>
              )}
            </div>
          </div>

          {/* Purchase Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Quantity
              </h4>
              <p className="text-base">{inventory.quantity}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Package Size
              </h4>
              <p className="text-base">{inventory.packageSize}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Unit Cost
              </h4>
              <p className="text-base">
                ৳{Number(inventory.unitCost).toFixed(2)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Total Cost
              </h4>
              <p className="text-base font-semibold">
                ৳{Number(inventory.totalCost).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Purchase Date
              </h4>
              <p className="text-base">
                {format(new Date(inventory.purchaseDate), "PPP")}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Created At
              </h4>
              <p className="text-base">
                {format(new Date(inventory.createdAt), "PPP")}
              </p>
            </div>
          </div>

          {/* Notes */}
          {inventory.notes && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Notes
              </h4>
              <p className="text-base">{inventory.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
