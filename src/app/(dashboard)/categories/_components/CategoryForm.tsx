"use client";
import { z } from "zod";
import React from "react";
import { toast } from "sonner";
import { IApiError } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/form/InputField";
import FormSubmitBtn from "@/components/common/form/FormSubmitBtn";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/services/categoriesApi";
import {
  createCategorySchema,
  updateCategorySchema,
} from "@/lib/validations/categorySchema";
import AppImage from "@/components/common/AppImage";
import { Category } from "@/types/category";
import { TextAreaField } from "@/components/common/form/TextAreaField";
import { FileField } from "@/components/common/form/FileField";

interface CategoryFormProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: Category;
}

const CategoryForm = ({ setDialogOpen, initialData }: CategoryFormProps) => {
  const [createCategoryHandler, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategoryHandler, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const categoryId = initialData?.categoryId;
  const mode = categoryId ? "EDIT" : "CREATE";
  const formSchema =
    mode === "EDIT" ? updateCategorySchema : createCategorySchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      image: undefined,
    },
    mode: "onChange",
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("name", data?.name ?? "");
    formData.append("description", data?.description ?? "");

    try {
      let response;
      if (mode === "EDIT" && categoryId) {
        response = await updateCategoryHandler({
          categoryId,
          formData: formData,
        }).unwrap();
      } else {
        response = await createCategoryHandler(formData).unwrap();
      }

      if (response.success) {
        toast.success(
          response?.message ||
            (mode === "EDIT" ? "Category updated." : "Category created.")
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

        <TextAreaField
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
        {mode === "EDIT" && initialData && !form.watch("image") && (
          <AppImage
            name={initialData.name}
            image={initialData.accessibleImageUrl!}
            className="w-24 h-24"
          />
        )}

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
            text={mode === "EDIT" ? "Update Category" : "Create Category"}
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
