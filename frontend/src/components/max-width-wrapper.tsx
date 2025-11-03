import { cn } from "@/lib/utils"

type MaxWidthWrapperProps = {
  className?: string
  children: React.ReactNode
}

export function MaxWidthWrapper({ className, children }: MaxWidthWrapperProps) {
  return (
    <div
      className={cn(
        "container mx-auto h-full w-full px-2.5 md:px-10 lg:px-20",
        className
      )}
    >
      {children}
    </div>
  )
}