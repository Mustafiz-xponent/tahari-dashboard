import z from "zod";

const bdPhoneValidator = z
  .string()
  .regex(/^\+8801[3-9]\d{8}$/, "Must be a valid Bangladeshi phone number")
  .trim();

export const createFarmerSchema = z.object({
  name: z.string().min(1, "Farmer Name is required"),
  farmName: z.string().min(1, "Farm name is required"),
  address: z.string().min(1, "Address is required"),
  contactInfo: bdPhoneValidator.optional(),
});

export const editFarmerSchema = z.object({
  name: z.string().min(1).optional(),
  farmName: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  contactInfo: bdPhoneValidator.optional(),
});
