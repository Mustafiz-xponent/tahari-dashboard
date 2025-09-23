"use client";
import { z } from "zod";
import React from "react";
import { toast } from "sonner";
import { IApiError } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormSubmitBtn from "@/components/common/FormSubmitBtn";
import { useCreateProductMutation } from "@/redux/services/productsApi";
import { createProductSchema } from "@/lib/validations/productSchema";
import { ProductUnitType } from "@/types/product";
import { InputField } from "@/components/common/InputField";
import { FormTextarea } from "@/components/common/FormTextArea";
import { SelectField } from "@/components/common/SelectField";

const AddProductForm = () => {
  const [addProductHandler, { isLoading }] = useCreateProductMutation();

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      unitType: ProductUnitType.KG as keyof typeof ProductUnitType,
      unitPrice: 0,
      packageSize: 0,
      stockQuantity: 0,
      reorderLevel: undefined,
      isSubscription: false,
      isPreorder: false,
      preorderAvailabilityDate: undefined,
      categoryId: 0,
      farmerId: 0,
      images: [] as File[],
    },
    mode: "onChange",
  });

  async function onSubmit(data: z.infer<typeof createProductSchema>) {
    const formData = new FormData();
    console.log(data);
    try {
      const response = await addProductHandler(formData).unwrap();

      if (response.success) {
        toast.success(response?.message || "Product added successfully.");
        form.reset();
      }
    } catch (err: unknown) {
      const error = err as IApiError;
      toast.error(error?.data?.error?.message || "Something went wrong.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 grid grid-cols-2"
      >
        <div className="bg-white p-4 rounded-md space-y-6">
          <InputField
            control={form.control}
            name="name"
            label="Name"
            placeholder="Tomato"
          />
          <FormTextarea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Fresh vegetables from local farms"
            rows={20}
            inputClassName="min-h-[100px] py-3 resize-none"
          />
          <div className="flex items-center sm:flex-row flex-col gap-4">
            <SelectField
              control={form.control}
              name="categoryId"
              label="Category"
              placeholder="Select a Category"
              inputClassName="w-full h-11"
              isDataLoading={false}
              options={[
                { label: "English", value: "en" },
                { label: "Bengali", value: "bn" },
                { label: "Spanish", value: "es" },
              ]}
            />
            <SelectField
              control={form.control}
              name="farmerId"
              label="Farmer"
              placeholder="Select a Farmer"
              inputClassName="w-full h-11"
              isDataLoading={false}
              options={[
                { label: "English", value: "en" },
                { label: "Bengali", value: "bn" },
                { label: "Spanish", value: "es" },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
            <SelectField
              control={form.control}
              name="farmerId"
              label="Unit Type"
              placeholder="Select a unit"
              inputClassName="w-full h-11"
              isDataLoading={false}
              options={[
                { label: "English", value: "en" },
                { label: "Bengali", value: "bn" },
                { label: "Spanish", value: "es" },
              ]}
            />
            <InputField
              control={form.control}
              name="unitPrice"
              type="number"
              label="Unit Price"
              placeholder="1kg"
              inputClassName="w-full flex-1"
            />
          </div>
          <InputField
            control={form.control}
            name="packageSize"
            type="number"
            label="Package Size"
            placeholder="1kg"
          />
          <FormSubmitBtn
            text={"Add Product"}
            isLoading={isLoading}
            className="sm:w-fit w-1/2 min-w-[120px] h-10"
            spinnerSize={23}
          />
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
