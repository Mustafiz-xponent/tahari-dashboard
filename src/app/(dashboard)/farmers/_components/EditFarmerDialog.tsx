"use client";
import React, { useState } from "react";
import { PencilIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FarmerForm from "./FarmerForm";
import { Farmer } from "@/types/farmer";
import { Button } from "@/components/ui/button";

const EditFarmerDialog = ({ farmer }: { farmer: Farmer }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="flex gap-2 w-full items-center justify-start font-secondary text-sm text-typography-75 cursor-pointer"
        >
          <PencilIcon /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl rounded-sm  max-h-[90vh] no-scrollbar overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="font-secondary text-xl capitalize">
            Edit Farmer Details
          </DialogTitle>
          <DialogDescription className="font-secondary text-sm leading-6 text-typography-50">
            Update the farmer profile information.
          </DialogDescription>
        </DialogHeader>
        <FarmerForm
          setDialogOpen={setDialogOpen}
          initialData={{
            farmerId: farmer?.farmerId,
            name: farmer?.name,
            farmName: farmer?.farmName,
            address: farmer?.address,
            contactInfo: farmer?.contactInfo,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditFarmerDialog;
