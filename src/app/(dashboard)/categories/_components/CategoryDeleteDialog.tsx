"use client";
import React from "react";
import { Trash, TriangleAlert } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IApiError } from "@/types";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useDeleteCategoryMutation } from "@/redux/services/categoriesApi";

const CategoryDeleteDialog = ({ categoryId }: { categoryId: string }) => {
  const [deleteCategoryHandler, { isLoading }] = useDeleteCategoryMutation();

  const submitHandler = () => async () => {
    try {
      const response = await deleteCategoryHandler(categoryId).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Category deleted successfully.");
      }
    } catch (err: unknown) {
      const error = err as IApiError;
      const errMsg = error?.data?.error?.message || "Something went wrong.";
      toast.error(errMsg);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="flex gap-2 text-red-500 w-full items-center justify-start font-secondary text-sm cursor-pointer"
        >
          <Trash className="text-red-500" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl rounded-sm  max-h-[90vh] no-scrollbar overflow-y-scroll">
        <DialogHeader className="text-start mt-2">
          <DialogTitle className="font-secondary flex gap-x-2 text-xl capitalize">
            <TriangleAlert className="text-red-500" /> Are you sure you want to
            delete this category?
          </DialogTitle>
          <DialogDescription className="font-secondary text-sm leading-6 text-typography-50">
            This action is irreversible. Deleting this category will permanently{" "}
            <span className="font-medium text-typography-75">
              remove all associated products
            </span>
            .
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-end flex-row gap-2 w-full justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant={"outline"}
              className="cursor-pointer sm:w-fit w-1/2  text-typography-100 font-secondary"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant={"destructive"}
            disabled={isLoading}
            onClick={submitHandler()}
            className="cursor-pointer sm:w-fit w-1/2 text-white font-secondary"
          >
            {isLoading ? (
              <LoadingSpinner
                color="#fff"
                size={20}
                borderWidth="3px"
                height="100%"
              />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDeleteDialog;
