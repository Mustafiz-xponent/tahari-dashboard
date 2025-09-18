"use client";
import React from "react";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Farmer } from "@/types/farmer";
interface FarmerDetailsDialogProps {
  data: Farmer;
}
const FarmerDetailsDialog = ({ data }: FarmerDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex gap-2 items-center font-secondary cursor-pointer">
          <Eye /> View farmer
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl rounded-sm  max-h-[90vh] no-scrollbar overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="font-secondary text-xl">
            Add New Farmer
          </DialogTitle>
          <DialogDescription className="font-secondary text-sm text-typography-50">
            Create a new farmer profile. Fill in all the required information.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FarmerDetailsDialog;
