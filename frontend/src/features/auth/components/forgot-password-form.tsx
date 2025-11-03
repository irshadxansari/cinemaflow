"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ErrorAlert } from "@/components/error-alert"
import { SubmitButton } from "@/components/submit-button"
import { SuccessAlert } from "@/components/success-alert"
import { forgotPasswordSchema } from "@/features/auth/schema"

import { AuthWrapper } from "./auth-wrapper"

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const pending = form.formState.isSubmitting

  function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    console.log(data)
    setError(null)
    setSuccess(null)
    setTimeout(() => {
      console.log(data)
    }, 3000)
  }

  return (
    <AuthWrapper
      title="Forgot Password"
      description="Please enter your email address to receive a password reset link."
      footer={
        <div className="text-center text-sm w-full">
          Remember your password?{" "}
          <Link href="/sign-in" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      }
    >
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="irshad@example.com"
                    type="email"
                    disabled={pending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!!error && (
            <ErrorAlert message={error} />
          )}
          {!!success && (
            <SuccessAlert message={success} />
          )}
          <SubmitButton label="Send reset link" pending={pending} />
        </form>
      </Form>
    </AuthWrapper>
  )
}