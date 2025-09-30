"use client";
import { z } from "zod";
import React from "react";
import { toast } from "sonner";
import { IApiError } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormSubmitBtn from "@/components/common/form/FormSubmitBtn";
import { useCreateProductMutation } from "@/redux/services/productsApi";
import { createProductSchema } from "@/lib/validations/productSchema";
import { ProductUnitType } from "@/types/product";
import { InputField } from "@/components/common/form/InputField";
import { SelectField } from "@/components/common/form/SelectField";
import { SwitchField } from "@/components/common/form/SwitchField";
import { DatePickerField } from "@/components/common/form/DatePickerField";
import { TextAreaField } from "@/components/common/form/TextAreaField";
import { FileField } from "@/components/common/form/FileField";
import { useGetAllCategoriesQuery } from "@/redux/services/categoriesApi";
import { useGetAllFarmersQuery } from "@/redux/services/farmersApi";
import { Category } from "@/types/category";
import { Farmer } from "@/types/farmer";

const AddProductForm = () => {
  const [addProductHandler, { isLoading }] = useCreateProductMutation();
  const { data: categoryData, isLoading: categoryLoading } =
    useGetAllCategoriesQuery({ limit: 100 });
  const { data: farmerData, isLoading: farmerLoading } = useGetAllFarmersQuery({
    limit: 100,
  });

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      unitType: undefined,
      unitPrice: "",
      packageSize: "",
      stockQuantity: "",
      reorderLevel: "",
      isSubscription: false,
      isPreorder: false,
      preorderAvailabilityDate: undefined,
      categoryId: "",
      farmerId: "",
      images: [] as File[],
    },
    mode: "onChange",
  });

  const isPreorder = form.watch("isPreorder");
  const isSubscription = form.watch("isSubscription");

  React.useEffect(() => {
    if (isPreorder) {
      // Ensure subscription is turned off
      form.setValue("isSubscription", false, { shouldValidate: true });
    } else {
      // Clear preorder date when preorder is off
      form.setValue("preorderAvailabilityDate", undefined, {
        shouldValidate: true,
      });
    }
  }, [isPreorder, form]);

  React.useEffect(() => {
    if (isSubscription) {
      // Ensure preorder is turned off
      form.setValue("isPreorder", false, { shouldValidate: true });
      // Reset preorder date since it's no longer valid
      form.setValue("preorderAvailabilityDate", undefined, {
        shouldValidate: true,
      });
    }
  }, [isSubscription, form]);

  const productUnitTypeOptions = Object.values(ProductUnitType).map((unit) => ({
    label: unit,
    value: unit,
  }));
  const categoryOptions = categoryData?.data?.map((cat: Category) => ({
    label: cat?.name,
    value: cat?.categoryId,
  }));
  const farmerOptions = farmerData?.data?.map((farmer: Farmer) => ({
    label: farmer?.name,
    value: farmer?.farmerId,
  }));

  async function onSubmit(data: z.infer<typeof createProductSchema>) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        // Append files individually
        value.forEach(
          (item: z.infer<typeof createProductSchema>["images"][0]) => {
            if (item instanceof File) formData.append(key, item, item.name);
          }
        );
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (typeof value === "boolean") {
        formData.append(key, String(value));
      } else {
        formData.append(key, String(value));
      }
    });

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
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <div className="bg-white p-4 rounded-md space-y-6">
          <InputField
            control={form.control}
            name="name"
            label="Name"
            placeholder="Tomato"
          />
          <TextAreaField
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
              isDataLoading={categoryLoading}
              options={categoryOptions}
            />
            <SelectField
              control={form.control}
              name="farmerId"
              label="Farmer"
              placeholder="Select a Farmer"
              inputClassName="w-full h-11"
              isDataLoading={farmerLoading}
              options={farmerOptions}
            />
          </div>
          <div className="grid grid-cols-1 items-start sm:grid-cols-2 gap-4">
            <SelectField
              control={form.control}
              name="unitType"
              label="Unit Type"
              placeholder="Select a unit"
              inputClassName="w-full h-11"
              isDataLoading={false}
              info={`The measurement for this product (kg, gm, pcs, etc.).
               Example: kg → all other values are based on kilograms.`}
              options={productUnitTypeOptions}
            />
            <InputField
              control={form.control}
              name="unitPrice"
              type="number"
              label="Unit Price"
              placeholder="50৳"
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
              placeholder="10kg"
              info={`How many units are sold together in one package.
              Example: 2 → one package = 2 kg, price = 2 × 10৳ = 20৳.`}
            />
            <InputField
              control={form.control}
              name="stockQuantity"
              type="number"
              label="Stock Quantity"
              placeholder="100kg"
              info={`The current stock you have, in base units.
              Example: 100 → 100 kg available in stock.`}
            />
            <InputField
              control={form.control}
              name="reorderLevel"
              type="number"
              label="Reorder Level"
              placeholder="10kg"
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
          {isPreorder && (
            <DatePickerField
              control={form.control}
              name="preorderAvailabilityDate"
              label="Preorder Availability Date"
              disableFuture={false}
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
            className="sm:w-fit w-1/2 min-w-[200px] h-12 mt-6 float-right"
            spinnerSize={23}
          />
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
