import { BadgeCheck } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";

interface SuccessAlertProps {
  message: string
}

export function SuccessAlert({message}: SuccessAlertProps) {
  return (
    <Alert variant="default" className="bg-green-500/10 border-none">
      <BadgeCheck className="text-green-500! size-4" />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  )
}