import z from "zod";
import { PromoPlacement, PromoTargetType } from "@/types/promotion";

const integerNumber = (requiredMessage: string, message: string) =>
  z
    .union([z.string(), z.number()])
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: message,
    });

export const createPromotionSchema = z
  .object({
    title: z
      .string()
      .max(60, { message: "Title must be less than 60 characters" })
      .optional(),
    description: z
      .string()
      .max(80, { message: "Description must be less than 80 characters" })
      .optional(),

    targetType: z
      .enum(
        Object.values(PromoTargetType) as [
          PromoTargetType,
          ...PromoTargetType[]
        ],
        {
          error: "Target type is required",
        }
      )
      .optional(),
    placement: z.enum(
      Object.values(PromoPlacement) as [PromoPlacement, ...PromoPlacement[]],
      {
        error: "Placement is required",
      }
    ),
    productId: integerNumber(
      "Product is required",
      "Must be positive"
    ).optional(),
    priority: integerNumber("Priority is required", "Must be positive").refine(
      (val) => val !== "" && val !== null && val !== undefined,
      {
        message: "Priority is required",
      }
    ),
    isActive: z.boolean(),
    image: z
      .any()
      .refine((file) => file instanceof File, "Please upload one Image")
      .refine(
        (file) => file?.type?.startsWith("image/"),
        "Only image files are allowed"
      )
      .refine((file) => file?.size <= 1 * 1024 * 1024, "Max file size is 1MB"),
  })
  .refine(
    (data) =>
      (data.productId === undefined && data.targetType === undefined) ||
      (data.productId !== undefined && data.targetType !== undefined),
    {
      message: "productId and targetType must be provided together.",
      path: ["productId"],
    }
  );

export const updatePromotionSchema = z
  .object({
    title: z
      .string()
      .max(60, { message: "Title must be less than 60 characters" })
      .optional(),
    description: z
      .string()
      .max(80, { message: "Description must be less than 80 characters" })
      .optional(),

    targetType: z
      .enum(
        Object.values(PromoTargetType) as [
          PromoTargetType,
          ...PromoTargetType[]
        ],
        {
          error: "Target type is required",
        }
      )
      .optional(),
    placement: z.enum(
      Object.values(PromoPlacement) as [PromoPlacement, ...PromoPlacement[]],
      {
        error: "Placement is required",
      }
    ),
    productId: integerNumber(
      "Product is required",
      "Must be positive"
    ).optional(),
    priority: integerNumber("Priority is required", "Must be positive").refine(
      (val) => val !== "" && val !== null && val !== undefined,
      {
        message: "Priority is required",
      }
    ),
    isActive: z.boolean(),
    image: z
      .any()
      .optional()
      .refine((file) => !file || file instanceof File, "Please upload one file")
      .refine(
        (file) => !file || file?.type?.startsWith("image/"),
        "Only image files are allowed"
      )
      .refine(
        (file) => !file || file?.size <= 1 * 1024 * 1024,
        "Max file size is 1MB"
      ),
  })
  .refine(
    (data) =>
      (data.productId === undefined && data.targetType === undefined) ||
      (data.productId !== undefined && data.targetType !== undefined),
    {
      message: "productId and targetType must be provided together.",
      path: ["productId"],
    }
  );
