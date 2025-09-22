import z from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  image: z
    .any()
    .refine((file) => file instanceof File, "Please upload one file")
    .refine(
      (file) => file?.type?.startsWith("image/"),
      "Only image files are allowed"
    )
    .refine((file) => file?.size <= 1 * 1024 * 1024, "Max file size is 1MB"),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required").optional(),
  description: z.string().optional(),
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
});
