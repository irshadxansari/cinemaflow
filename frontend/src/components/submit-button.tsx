import { LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

interface SubmitButtonProps {
  pending: boolean
  label: string
}

export function SubmitButton({pending, label}: SubmitButtonProps) {
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <LoaderCircle className="size-4 animate-spin" />}{" "}
      {label}
    </Button>
  )
}