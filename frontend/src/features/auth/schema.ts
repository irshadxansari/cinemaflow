import { z } from "zod"

const emailSchema = z
  .email({ message: "Please enter a valid email." })
  .trim()

const passwordSchema = z
  .string()
  .min(8, { message: "Must be at least 8 characters long" })
  .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
  .regex(/[0-9]/, { message: "Contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Contain at least one special character.",
  })
  .trim()

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "Please enter your password" }),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Please enter your full name" }).trim(),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, { message: "Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  })

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().min(1, { message: "Password is required" }),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  })