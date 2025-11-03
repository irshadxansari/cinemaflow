"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { loginSchema } from "@/features/auth/schema"

import { AuthWrapper } from "./auth-wrapper"

export function SignInForm() {
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const pending = form.formState.isSubmitting

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setShowPassword(false)
    setError(null)
    setTimeout(() => {
      console.log(data);
    }, 2000)
  }

  return (
    <AuthWrapper
      title="Welcome back"
      description="Get ready to score again."
      footer={
        <div className="text-center text-sm w-full">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline underline-offset-4">
            Sign up
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="flex w-full items-center justify-between">
                    <span>Password</span>
                    <Link
                      href="/forgot-password"
                      className="text-primary text-xs font-semibold underline-offset-2 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      disabled={pending}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                      disabled={pending}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!!error && (
            <ErrorAlert message={error} />
          )}
          <SubmitButton label="Sign In" pending={pending} />
        </form>
      </Form>
    </AuthWrapper>
  )
}