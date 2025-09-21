"use client";
import { z } from "zod";
import React from "react";
import { toast } from "sonner";
import { IApiError } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/InputField";
import FormSubmitBtn from "@/components/common/FormSubmitBtn";
import { FormTextarea } from "@/components/common/FormTextArea";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/services/categoriesApi";
import { createCategorySchema } from "@/lib/validations/categorySchema";
import { FileField } from "@/components/common/FileField";

interface CategoryFormProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: z.infer<typeof createCategorySchema> & { categoryId?: string }; // allow id for edit mode
}

const CategoryForm = ({ setDialogOpen, initialData }: CategoryFormProps) => {
  const [createCategoryHandler, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategoryHandler, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const isEdit = Boolean(initialData?.categoryId);

  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      image: undefined,
    },
    mode: "onChange",
  });

  async function onSubmit(formData: z.infer<typeof createCategorySchema>) {
    console.log("FORMDATA:", formData);
    try {
      let response;
      if (isEdit && initialData?.categoryId) {
        response = await updateCategoryHandler({
          categoryId: initialData.categoryId,
          bodyData: formData,
        }).unwrap();
      } else {
        response = await createCategoryHandler(formData).unwrap();
      }

      if (response.success) {
        toast.success(
          response?.message ||
            (isEdit ? "Category updated." : "Category created.")
        );
        form.reset();
        setDialogOpen(false);
      }
    } catch (err: unknown) {
      const error = err as IApiError;
      toast.error(error?.data?.error?.message || "Something went wrong.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Vegetables"
        />

        <FormTextarea
          control={form.control}
          name="description"
          label="Description"
          placeholder="Fresh vegetables from local farms"
          rows={20}
          inputClassName="min-h-[100px] py-3 resize-none"
        />

        <FileField
          control={form.control}
          name="image"
          maxFiles={1}
          maxSize={1}
          multiple={false}
        />

        <div className="flex items-center w-full sm:justify-end gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              disabled={isCreating || isUpdating}
              className="font-secondary sm:w-fit w-1/2 h-10 cursor-pointer"
            >
              Cancel
            </Button>
          </DialogClose>
          <FormSubmitBtn
            text={isEdit ? "Update Category" : "Create Category"}
            isLoading={isCreating || isUpdating}
            className="sm:w-fit w-1/2 min-w-[120px] h-10"
            spinnerSize={23}
          />
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
