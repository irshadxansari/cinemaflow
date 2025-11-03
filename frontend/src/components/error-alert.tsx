import { OctagonAlert } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";

interface ErrorAlertProps {
  message: string
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <Alert className="bg-destructive/10 border-none">
      <OctagonAlert className="text-destructive! size-4" />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  )
}