import z from "zod";

const bdPhoneValidator = z
  .string()
  .regex(/^\+8801[3-9]\d{8}$/, "Must be a valid Bangladeshi phone number")
  .trim();

export const loginSchema = z.object({
  phone: bdPhoneValidator,
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

export const forgotPasswordSchema = z.object({
  phone: bdPhoneValidator,
});

export const resetPasswordSchema = z
  .object({
    otp: z.string().min(6, "OTP must be at least 6 digit"),
    phone: bdPhoneValidator,
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
