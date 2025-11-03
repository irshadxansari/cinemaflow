import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthWrapperProps {
  title: string
  description: string
  children: React.ReactNode
  footer: React.ReactElement
}

export function AuthWrapper({ title, description, children, footer }: AuthWrapperProps) {
  return (
    <Card className="max-w-md mx-auto ">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        {footer}
      </CardFooter>
    </Card>
  )
}