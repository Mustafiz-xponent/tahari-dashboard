"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FarmerForm from "@/app/(dashboard)/farmers/_components/FarmerForm";

const AddFarmerDialog = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-11 w-fit self-end font-secondary rounded-sm cursor-pointer text-typography-5 hover:text-white bg-brand-100 hover:bg-btn-hover"
        >
          <Plus />
          <span>Add Farmer</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl rounded-sm max-h-[90vh] no-scrollbar overflow-y-scroll">
        <DialogHeader className="text-start mt-2">
          <DialogTitle className="font-secondary text-xl">
            Add New Farmer
          </DialogTitle>
          <DialogDescription className="font-secondary text-sm text-typography-50">
            Create a new farmer profile. Fill in all the required information.
          </DialogDescription>
        </DialogHeader>
        <FarmerForm setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddFarmerDialog;
