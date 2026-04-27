"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteInventoryMutation } from "@/redux/services/inventoriesApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface DeleteInventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inventoryId: string | number;
  productName?: string;
}

export function DeleteInventoryDialog({
  open,
  onOpenChange,
  inventoryId,
  productName,
}: DeleteInventoryDialogProps) {
  const [deleteInventory, { isLoading }] = useDeleteInventoryMutation();

  const handleDelete = async () => {
    try {
      await deleteInventory(inventoryId).unwrap();
      toast.success("Inventory purchase deleted successfully");
      onOpenChange(false);
    } catch (error) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message
          : undefined;
      toast.error(errorMessage ?? "Failed to delete inventory purchase");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            inventory purchase
            {productName && (
              <span className="font-semibold"> for {productName}</span>
            )}
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
