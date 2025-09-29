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
import AppImage from "@/components/common/AppImage";
import { TextAreaField } from "@/components/common/form/TextAreaField";
import { FileField } from "@/components/common/form/FileField";
import { PromoPlacement, PromoTargetType, Promotion } from "@/types/promotion";
import { SelectField } from "@/components/common/form/SelectField";
import {
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
} from "@/redux/services/promotionApi";
import { createPromotionSchema } from "@/lib/validations/promotionSchema";
import { SwitchField } from "@/components/common/form/SwitchField";
import { useGetAllProductsQuery } from "@/redux/services/productsApi";
import { useGetAllDealsQuery } from "@/redux/services/dealsApi";
import { Product } from "@/types/product";
import { Deal } from "@/types/deal";

interface PromotionFormProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: Promotion;
}
const promoTargetTypeOptions = Object.values(PromoTargetType).map((unit) => ({
  label: unit.replace("_", " "),
  value: unit,
}));
const promoPlacementOptions = Object.values(PromoPlacement).map((unit) => ({
  label: unit.replace("_", " "),
  value: unit,
}));
const PromotionForm = ({ setDialogOpen, initialData }: PromotionFormProps) => {
  const { data: productsData, isLoading: productsLoading } =
    useGetAllProductsQuery({});
  const { data: dealsData, isLoading: dealsLoading } = useGetAllDealsQuery({});
  console.log("PRODUCT_DATA:", productsData);
  console.log("DEAL_DATA:", dealsData);
  const [createPromotionHandler, { isLoading: isCreating }] =
    useCreatePromotionMutation();
  const [updatePromotionHandler, { isLoading: isUpdating }] =
    useUpdatePromotionMutation();

  const promotionId = initialData?.promotionId;
  const mode = promotionId ? "EDIT" : "CREATE";

  const form = useForm<z.infer<typeof createPromotionSchema>>({
    resolver: zodResolver(createPromotionSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      targetType: undefined,
      productId: "",
      dealId: "",
      placement: undefined,
      priority: "",
      isActive: false,
      image: "",
    },
    mode: "onChange",
  });

  const productsOptions = productsData?.data?.map((product: Product) => ({
    label: product?.name,
    value: product?.productId,
  }));
  const dealsOptions = dealsData?.data?.map((deal: Deal) => ({
    label: deal?.title,
    value: deal?.dealId,
  }));
  async function onSubmit(data: z.infer<typeof createPromotionSchema>) {
    const formData = new FormData();
    // formData.append("image", data.image);
    // formData.append("name", data?.name ?? "");
    // formData.append("description", data?.description ?? "");

    try {
      let response;
      if (mode === "EDIT" && promotionId) {
        response = await updatePromotionHandler({
          promotionId,
          formData: formData,
        }).unwrap();
      } else {
        response = await createPromotionHandler(formData).unwrap();
      }

      if (response.success) {
        toast.success(
          response?.message ||
            (mode === "EDIT" ? "Promotion updated." : "Promotion created.")
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
          name="title"
          label="Title"
          placeholder="Fresh Dairy Offer"
        />

        <TextAreaField
          control={form.control}
          name="description"
          label="Description"
          placeholder="Save big on fresh milk this week only!"
          rows={20}
          inputClassName="min-h-[100px] py-3 resize-none"
        />
        <InputField
          control={form.control}
          name="priority"
          label="Priority"
          type="number"
          placeholder="Enter priority"
          info="When several promotions are active, promotions with lower priority numbers appear first."
        />
        <div className="grid grid-cols-1 items-start sm:grid-cols-2 gap-4">
          <SelectField
            control={form.control}
            name="targetType"
            label="Target Type"
            placeholder="Select target type"
            inputClassName="w-full h-11"
            isDataLoading={false}
            info={`Specifies what this promotion applies to (e.g., product, deal, or subscription plan). Select the correct scope to ensure the promotion is applied properly.`}
            options={promoTargetTypeOptions}
          />
          <SelectField
            control={form.control}
            name="placement"
            label="Placement"
            placeholder="Select placement"
            inputClassName="w-full h-11"
            isDataLoading={false}
            info={`Choose where the promotion will be displayed in the app (e.g., homepage top banner or homepage bottom banner). This affects visibility to customers.`}
            options={promoPlacementOptions}
          />
        </div>
        <div className="grid items-start grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            control={form.control}
            name="productId"
            label="Product"
            placeholder="Select a Product"
            inputClassName="w-full h-11"
            isDataLoading={productsLoading}
            options={productsOptions}
            info="Select the specific product this promotion is linked to. If left blank, the promotion may apply more broadly (depending on the target type)."
          />
          <SelectField
            control={form.control}
            name="dealId"
            label="Deal"
            placeholder="Select a dealId"
            inputClassName="w-full h-11"
            isDataLoading={dealsLoading}
            options={dealsOptions}
          />
        </div>
        <SwitchField
          control={form.control}
          name="isActive"
          label="Enable"
          description="Toggle ON to show the promotion, OFF to hide it"
          info="Controls whether the promotion is currently live. Toggle ON to make it visible and available to customers, or OFF to pause it without deleting."
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
            name={initialData.title}
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
            text={mode === "EDIT" ? "Update Promotion" : "Create Promotion"}
            isLoading={isCreating || isUpdating}
            className="sm:w-fit w-1/2 min-w-[120px] h-10"
            spinnerSize={23}
          />
        </div>
      </form>
    </Form>
  );
};

export default PromotionForm;
