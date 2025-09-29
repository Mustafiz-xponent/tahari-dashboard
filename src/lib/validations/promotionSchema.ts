import z from "zod";
import { PromoPlacement, PromoTargetType } from "@/types/promotion";

const integerNumber = (requiredMessage: string, message: string) =>
  z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: message,
  });

export const createPromotionSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required")
    .max(60, { message: "Title must be less than 60 characters" })
    .optional(),
  description: z
    .string()
    .max(80, { message: "Description must be less than 80 characters" })
    .optional(),

  targetType: z.enum(
    Object.values(PromoTargetType) as [PromoTargetType, ...PromoTargetType[]],
    {
      error: "Target type is required",
    }
  ),
  placement: z.enum(
    Object.values(PromoPlacement) as [PromoPlacement, ...PromoPlacement[]],
    {
      error: "Placement type is required",
    }
  ),
  productId: integerNumber(
    "Product is required",
    "Must be positive"
  ).optional(),
  dealId: integerNumber("Deal is required", "Must be positive").optional(),
  priority: integerNumber(
    "Priority is required",
    "Must be positive"
  ).optional(),
  isActive: z.boolean(),
  image: z
    .any()
    .refine((file) => file instanceof File, "Please upload one Image")
    .refine(
      (file) => file?.type?.startsWith("image/"),
      "Only image files are allowed"
    )
    .refine((file) => file?.size <= 1 * 1024 * 1024, "Max file size is 1MB"),
});
// .refine(
//   (data) => {
//     if (data.productId !== undefined) {
//       return data.targetType === "PRODUCT" || data.targetType === "PREORDER";
//     }
//     if (data.targetType === "PRODUCT" || data.targetType === "PREORDER") {
//       return data.productId !== undefined;
//     }
//     return true;
//   },
//   {
//     message:
//       "productId requires targetType to be 'PRODUCT' or 'PREORDER', and vice versa.",
//     path: ["productId"],
//   }
// )
// .refine(
//   (data) =>
//     (data.dealId === undefined || data.targetType === "DEAL") &&
//     (data.targetType !== "DEAL" || data.dealId !== undefined),
//   {
//     message: "dealId requires targetType 'DEAL', and vice versa.",
//     path: ["dealId"],
//   }
// );
