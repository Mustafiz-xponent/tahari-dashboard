"use client";
import React from "react";
import { Eye, MapPin, Phone, Package } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Farmer } from "@/types/farmer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
interface FarmerDetailsDialogProps {
  data: Farmer;
}
const FarmerDetailsDialog = ({ data }: FarmerDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="flex gap-2 items-center font-secondary text-sm  text-typography-75 cursor-pointer"
        >
          <Eye className="size-4" /> View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl rounded-sm  max-h-[90vh] no-scrollbar overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="font-secondary text-xl capitalize">
            {data?.name}
          </DialogTitle>
          <DialogDescription className="font-secondary text-sm text-typography-50">
            {data?.farmName}
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 space-y-3">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1">
              <MapPin className="size-4 text-typography-50 " />{" "}
              <span className="text-typography-100 font-secondary text-base font-medium">
                Address
              </span>
            </div>
            <p className="pl-4 font-secondary text-typography-50 text-sm">
              {data?.address || "No address available for this farmer."}
            </p>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1">
              <Phone className="size-4 text-typography-50" />{" "}
              <span className="text-typography-100 font-secondary text-base font-medium">
                Contact Info
              </span>
            </div>
            <p className="pl-4 font-secondary text-typography-50 text-sm">
              {data?.contactInfo ||
                "No contact info available for this farmer."}
            </p>
          </div>
          <Separator />
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1">
              <Package className="size-4 text-typography-50" />{" "}
              <span className="text-typography-100 font-secondary text-base font-medium">
                Active Products
              </span>
            </div>
            <p className="pl-4 font-secondary text-typography-50 text-sm">
              {data?.products?.length ||
                "No active products available for this farmer."}
            </p>
          </div>
        </div>
        <DialogFooter className="flex items-end w-full justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant={"secondary"}
              className="cursor-pointer w-fit  text-typography-100 font-secondary"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FarmerDetailsDialog;
