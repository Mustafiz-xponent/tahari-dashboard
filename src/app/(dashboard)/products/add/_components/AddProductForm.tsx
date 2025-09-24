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
import { SwitchField } from "@/components/common/SwitchField";
import { DatePickerField } from "@/components/common/DatePickerField";
import { FileField } from "@/components/common/FileField";

const AddProductForm = () => {
  const [addProductHandler, { isLoading }] = useCreateProductMutation();

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      unitType: ProductUnitType.KG as keyof typeof ProductUnitType,
      unitPrice: undefined,
      packageSize: undefined,
      stockQuantity: undefined,
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
        className=" grid grid-cols-2 gap-4"
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
          <div className="grid items-start grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 items-start sm:grid-cols-2 gap-4">
            <SelectField
              control={form.control}
              name="farmerId"
              label="Unit Type"
              placeholder="Select a unit"
              inputClassName="w-full h-11"
              isDataLoading={false}
              info={`The measurement for this product (kg, gm, pcs, etc.).
               Example: kg → all other values are based on kilograms.`}
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
              info={`Price of 1 unit of the product.
              Example: 10 means 10৳ per kg`}
              inputClassName="w-full flex-1"
            />
          </div>
          <div className="grid grid-cols-1 items-start sm:grid-cols-3 gap-4">
            <InputField
              control={form.control}
              name="packageSize"
              type="number"
              label="Package Size"
              placeholder="1kg"
              info={`How many units are sold together in one package.
              Example: 2 → one package = 2 kg, price = 2 × 10৳ = 20৳.`}
            />
            <InputField
              control={form.control}
              name="stockQuantity"
              type="number"
              label="Stock Quantity"
              placeholder="1kg"
              info={`The current stock you have, in base units.
              Example: 100 → 100 kg available in stock.`}
            />
            <InputField
              control={form.control}
              name="reorderLevel"
              type="number"
              label="Reorder Level"
              placeholder="1kg"
              info={`The stock level that triggers a restock alert.
              Example: 10 → when stock drops below 10 kg, you’ll be asked to reorder.`}
            />
          </div>
          <SwitchField
            control={form.control}
            name="isSubscription"
            label="Enable Subscription"
            description="Let customers subscribe for recurring deliveries."
            info="Great for items people buy regularly, like groceries or household essentials."
          />
          <SwitchField
            control={form.control}
            name="isPreorder"
            label="Enable Pre-order"
            description="Allow customers to order before the product is available."
            info="Useful for products launching soon. Customers will pay now and receive the item later."
          />
          {form.watch("isPreorder") && (
            <DatePickerField
              control={form.control}
              name="preorderAvailabilityDate"
              label="Preorder Availability Date"
              disableFuture={true}
              disablePastBefore={new Date("1900-01-01")}
            />
          )}
        </div>
        <div className="bg-white p-4 rounded-md">
          <FileField
            control={form.control}
            name="images"
            label="Upload Images"
            maxFiles={10}
            maxSize={1}
            multiple={true}
            orientation="horizontal"
          />
          <FormSubmitBtn
            text={"Add Product"}
            isLoading={isLoading}
            className="sm:w-fit w-1/2 min-w-[120px] h-10 mt-6 float-right"
            spinnerSize={23}
          />
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
