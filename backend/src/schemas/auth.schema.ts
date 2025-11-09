import { z } from "zod"

const nameSchema = z.string().min(2, { message: "Please enter your full name" }).trim();
const emailSchema = z.email({message: "Email is required"}).trim();
const tokenSchema = z.string().min(10, { message: "Invalid token" }).trim();
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[A-Za-z]/, "Password must contain at least one letter")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

export const signUpSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema
}).refine((data) => data.password === data.confirmPassword,{
    message: "Password do not match"
})

export const signInSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})

export const resetPasswordSchema = z.object({
    password: passwordSchema,
    confirmPassword: passwordSchema
}).refine((data) => data.password === data.confirmPassword,{
    message: "Password do not match"
})

export const forgotPasswordSchema = z.object({
    email: emailSchema
})

export const changePasswordSchema = z.object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
}).refine((data) => data.newPassword === data.confirmPassword,{
    message: "Password do not match"
})

export const emailVerficationSchema = z.object({
    token: tokenSchema
})