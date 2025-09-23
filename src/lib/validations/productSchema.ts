import z from "zod";
import { ProductUnitType } from "@/types/product";

export const createProductSchema = z
  .object({
    name: z.string().min(1, "Name is required"), //
    description: z.string().optional(), //
    unitType: z.enum(Object.values(ProductUnitType) as [string, ...string[]]), //
    unitPrice: z.number().positive(), //
    packageSize: z.number().positive(),
    stockQuantity: z.number().positive(),
    reorderLevel: z.number().positive().optional(),
    isSubscription: z.boolean().optional(),
    isPreorder: z.boolean().optional(),
    preorderAvailabilityDate: z.date().optional(),
    categoryId: z.number().int().positive(), //
    farmerId: z.number().int().positive(), //
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
