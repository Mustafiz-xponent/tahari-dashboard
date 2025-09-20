"use client";
import { z } from "zod";
import React from "react";
import { toast } from "sonner";
import { IApiError } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFarmerSchema } from "@/lib/validations/farmerSchema";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/InputField";
import FormSubmitBtn from "@/components/common/FormSubmitBtn";
import { FormTextarea } from "@/components/common/FormTextArea";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useCreateFarmerMutation,
  useUpdateFarmerMutation,
} from "@/redux/services/farmerApi";

interface FarmerFormProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: z.infer<typeof createFarmerSchema> & { farmerId?: string }; // allow id for edit mode
}

const FarmerForm = ({ setDialogOpen, initialData }: FarmerFormProps) => {
  const [createFarmerHandler, { isLoading: isCreating }] =
    useCreateFarmerMutation();
  const [updateFarmerHandler, { isLoading: isUpdating }] =
    useUpdateFarmerMutation();

  const isEdit = Boolean(initialData?.farmerId);

  const form = useForm<z.infer<typeof createFarmerSchema>>({
    resolver: zodResolver(createFarmerSchema),
    defaultValues: initialData || {
      name: "",
      farmName: "",
      address: "",
      contactInfo: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof createFarmerSchema>) {
    try {
      let response;
      if (isEdit && initialData?.farmerId) {
        response = await updateFarmerHandler({
          farmerId: initialData.farmerId,
          bodyData: formData,
        }).unwrap();
      } else {
        response = await createFarmerHandler(formData).unwrap();
      }

      if (response.success) {
        toast.success(
          response?.message || (isEdit ? "Farmer updated." : "Farmer created.")
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
          placeholder="John Smith"
        />
        <InputField
          control={form.control}
          name="farmName"
          label="Farm Name"
          placeholder="Green Valley Farm"
        />
        <FormTextarea
          control={form.control}
          name="address"
          label="Address"
          placeholder="123 Rural Road, Farmington, CA 95230"
          rows={20}
          inputClassName="min-h-[100px] py-3 resize-none"
        />
        <InputField
          control={form.control}
          name="contactInfo"
          label="Contact Info"
          placeholder="+8801XXXXXXXXX"
        />

        <div className="flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              disabled={isCreating || isUpdating}
              className="font-secondary h-10"
            >
              Cancel
            </Button>
          </DialogClose>
          <FormSubmitBtn
            text={isEdit ? "Update Farmer" : "Create Farmer"}
            isLoading={isCreating || isUpdating}
            className="w-fit min-w-[120px] h-10"
            spinnerSize={23}
          />
        </div>
      </form>
    </Form>
  );
};

export default FarmerForm;
