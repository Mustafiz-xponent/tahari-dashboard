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
import { Button } from "@/components/ui/button";
import PromotionForm from "@/app/(dashboard)/promotions/_components/PromotionForm";
import { Promotion } from "@/types/promotion";

const EditPromotionDialog = ({ promotion }: { promotion: Promotion }) => {
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
        <DialogHeader className="text-start mt-2">
          <DialogTitle className="font-secondary text-xl capitalize">
            Edit Promotion Details
          </DialogTitle>
          <DialogDescription className="font-secondary text-sm leading-6 text-typography-50">
            Update the promotion information.
          </DialogDescription>
        </DialogHeader>
        <PromotionForm setDialogOpen={setDialogOpen} initialData={promotion} />
      </DialogContent>
    </Dialog>
  );
};

export default EditPromotionDialog;
