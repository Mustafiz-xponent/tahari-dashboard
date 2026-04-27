"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InventoryForm } from "./InventoryForm";
import { InventoryPurchase } from "@/types/inventory";

interface InventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inventory?: InventoryPurchase;
}

export function InventoryDialog({
  open,
  onOpenChange,
  inventory,
}: InventoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {inventory
              ? "Edit Inventory Purchase"
              : "Add New Inventory Purchase"}
          </DialogTitle>
          <DialogDescription>
            {inventory
              ? "Update the details of this inventory purchase."
              : "Fill in the details to create a new inventory purchase."}
          </DialogDescription>
        </DialogHeader>
        <InventoryForm
          inventory={inventory}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
