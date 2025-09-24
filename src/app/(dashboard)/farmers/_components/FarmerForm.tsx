"use client";
import { z } from "zod";
import React from "react";
import { toast } from "sonner";
import { IApiError } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createFarmerSchema,
  editFarmerSchema,
} from "@/lib/validations/farmerSchema";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/form/InputField";
import FormSubmitBtn from "@/components/common/form/FormSubmitBtn";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useCreateFarmerMutation,
  useUpdateFarmerMutation,
} from "@/redux/services/farmersApi";
import { Farmer } from "@/types/farmer";
import { TextAreaField } from "@/components/common/form/TextAreaField";

interface FarmerFormProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: Farmer;
}

const FarmerForm = ({ setDialogOpen, initialData }: FarmerFormProps) => {
  const [createFarmerHandler, { isLoading: isCreating }] =
    useCreateFarmerMutation();
  const [updateFarmerHandler, { isLoading: isUpdating }] =
    useUpdateFarmerMutation();

  const isEdit = Boolean(initialData?.farmerId);
  const formSchema = isEdit ? editFarmerSchema : createFarmerSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      farmName: "",
      address: "",
      contactInfo: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
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
        <TextAreaField
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
            text={isEdit ? "Update Farmer" : "Create Farmer"}
            isLoading={isCreating || isUpdating}
            className="sm:w-fit w-1/2 min-w-[120px] h-10"
            spinnerSize={23}
          />
        </div>
      </form>
    </Form>
  );
};

export default FarmerForm;
