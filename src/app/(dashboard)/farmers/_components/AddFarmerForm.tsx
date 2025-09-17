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
import { useCreateFarmerMutation } from "@/redux/services/farmerApi";

interface AddFarmerFormProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddFarmerForm = ({ setDialogOpen }: AddFarmerFormProps) => {
  const [createFarmerHandler, { isLoading }] = useCreateFarmerMutation();
  const form = useForm<z.infer<typeof createFarmerSchema>>({
    resolver: zodResolver(createFarmerSchema),
    defaultValues: {
      name: "",
      farmName: "",
      address: "",
      contactInfo: "",
    },
  });
  async function onSubmit(formData: z.infer<typeof createFarmerSchema>) {
    try {
      const response = await createFarmerHandler(formData).unwrap();
      if (response.success) {
        const successMessage = response?.message || "An Otp has been sent.";
        toast.success(successMessage);
        form.reset();
        setDialogOpen(false);
      }
    } catch (err: unknown) {
      const error = err as IApiError;
      const errorMessage =
        error?.data?.error?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Jhone Smith"
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
              disabled={isLoading}
              className="font-secondary cursor-pointer h-10"
            >
              Cancel
            </Button>
          </DialogClose>
          <FormSubmitBtn
            text="Create Farmer"
            isLoading={isLoading}
            className="w-fit min-w-[100px] h-10"
            spinnerSize={23}
          />
        </div>
      </form>
    </Form>
  );
};

export default AddFarmerForm;
