import { z } from "zod";
import { ProductUnitType } from "@/types/product";

const positiveNumber = (requiredMessage: string, positiveMessage: string) =>
  z
    .string()
    .min(1, requiredMessage)
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: positiveMessage,
    });

export const createProductSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    unitType: z.enum(
      Object.values(ProductUnitType) as [ProductUnitType, ...ProductUnitType[]],
      {
        error: "Unit type is required",
      }
    ),
    unitPrice: positiveNumber("Unit price is required", "Must be positive"),
    packageSize: positiveNumber("Package size is required", "Must be positive"),
    stockQuantity: positiveNumber(
      "Stock quantity is required",
      "Must be positive"
    ),
    reorderLevel: positiveNumber(
      "Reorder level is required",
      "Must be positive"
    ).optional(),
    isSubscription: z.boolean().optional(),
    isPreorder: z.boolean().optional(),
    preorderAvailabilityDate: z.date().optional(),
    categoryId: positiveNumber("Category is required", "Must be positive"),
    farmerId: positiveNumber("Farmer is required", "Must be positive"),
    images: z
      .array(
        z.custom<File>((val) => val instanceof File, {
          message: "Each item must be a File",
        })
      )
      .min(1, "At least one image is required")
      .refine(
        (files) => files.every((f) => f.type.startsWith("image/")),
        "All files must be images"
      )
      .refine(
        (files) => files.every((f) => f.size <= 1 * 1024 * 1024),
        "Each file must be <= 1MB"
      ),
  })
  .refine(
    (data) =>
      !data.isPreorder || (data.isPreorder && data.preorderAvailabilityDate),
    {
      message:
        "Preorder availability date is required when preorder is enabled",
      path: ["preorderAvailabilityDate"],
    }
  );

export const updateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  unitType: z.enum(
    Object.values(ProductUnitType) as [ProductUnitType, ...ProductUnitType[]],
    {
      error: "Unit type is required",
    }
  ),
  unitPrice: positiveNumber("Unit price is required", "Must be positive"),
  packageSize: positiveNumber("Package size is required", "Must be positive"),
  stockQuantity: positiveNumber(
    "Stock quantity is required",
    "Must be positive"
  ),
  reorderLevel: positiveNumber(
    "Reorder level is required",
    "Must be positive"
  ).optional(),
  preorderAvailabilityDate: z.date().optional(),
  categoryId: positiveNumber("Category is required", "Must be positive"),
  farmerId: positiveNumber("Farmer is required", "Must be positive"),
  deletedImages: z.string().array().optional(),
  images: z
    .array(
      z.custom<File>((val) => val instanceof File, {
        message: "Each item must be a File",
      })
    )
    .optional()
    .refine(
      (files) => !files || files.every((f) => f.type.startsWith("image/")),
      "All files must be images"
    )
    .refine(
      (files) => !files || files.every((f) => f.size <= 1 * 1024 * 1024),
      "Each file must be <= 1MB"
    ),
});
