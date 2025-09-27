"use client";
import { z } from "zod";
import React from "react";
import { toast } from "sonner";
import { IApiError } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormSubmitBtn from "@/components/common/form/FormSubmitBtn";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/redux/services/productsApi";
import { updateProductSchema } from "@/lib/validations/productSchema";
import { ProductUnitType } from "@/types/product";
import { InputField } from "@/components/common/form/InputField";
import { SelectField } from "@/components/common/form/SelectField";
import { DatePickerField } from "@/components/common/form/DatePickerField";
import { TextAreaField } from "@/components/common/form/TextAreaField";
import { FileField } from "@/components/common/form/FileField";
import { useGetAllCategoriesQuery } from "@/redux/services/categoriesApi";
import { useGetAllFarmersQuery } from "@/redux/services/farmersApi";
import { Category } from "@/types/category";
import { Farmer } from "@/types/farmer";
import { useParams } from "next/navigation";
import AppImage from "@/components/common/AppImage";

const EditProductForm = () => {
  const { id } = useParams();
  const [editProductHandler, { isLoading }] = useUpdateProductMutation();
  const { data: categoryData, isLoading: categoryLoading } =
    useGetAllCategoriesQuery({ limit: 100 });
  const { data: productData } = useGetProductQuery(id);
  const { data: farmerData, isLoading: farmerLoading } = useGetAllFarmersQuery({
    limit: 100,
  });
  console.log("PRODUCT DATA: ", productData);

  const form = useForm<z.infer<typeof updateProductSchema>>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: "",
      description: "",
      unitType: undefined,
      unitPrice: "",
      packageSize: "",
      stockQuantity: "",
      reorderLevel: "",
      preorderAvailabilityDate: undefined,
      categoryId: "",
      farmerId: "",
      images: [] as File[],
    },
    mode: "onChange",
  });

  // When productData is loaded, populate the form
  React.useEffect(() => {
    if (productData) {
      form.reset({
        name: productData?.data?.name || "",
        description: productData?.data?.description || "",
        unitType: productData?.data?.unitType || undefined,
        unitPrice: productData?.data?.unitPrice.toString() || "",
        packageSize: productData?.data?.packageSize.toString() || "",
        stockQuantity: productData?.data?.stockQuantity.toString() || "",
        reorderLevel: productData?.data?.reorderLevel.toString() || "",
        preorderAvailabilityDate: productData?.data?.preorderAvailabilityDate
          ? new Date(productData?.data?.preorderAvailabilityDate)
          : undefined,
        categoryId: productData?.data?.categoryId || "",
        farmerId: productData?.data?.farmerId || "",
        images: [], // Files cannot be prefilled; handle separately if needed
      });
    }
  }, [productData, form]);

  async function onSubmit(data: z.infer<typeof updateProductSchema>) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        // Append files individually
        value.forEach(
          (item: z.infer<typeof updateProductSchema>["images"][0]) => {
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
      const response = await editProductHandler({
        productId: id,
        formData,
      }).unwrap();
      if (response.success) {
        toast.success(response?.message || "Product edited successfully.");
        form.reset();
      }
    } catch (err: unknown) {
      const error = err as IApiError;
      toast.error(error?.data?.error?.message || "Something went wrong.");
    }
  }
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

          {productData?.data?.isPreorder && (
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

          {productData?.data?.accessibleImageUrls?.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {productData?.data?.accessibleImageUrls?.map((image: string) => {
                return (
                  <AppImage
                    name={"Product Image"}
                    image={image}
                    key={image}
                    className="size-24 sm:size-48 mt-4 border-[1px] border-border rounded-md"
                  />
                );
              })}
            </div>
          )}

          <FormSubmitBtn
            text={"Edit Product"}
            isLoading={isLoading}
            className="sm:w-fit w-1/2 min-w-[200px] h-12 mt-6 float-right"
            spinnerSize={23}
          />
        </div>
      </form>
    </Form>
  );
};

export default EditProductForm;
