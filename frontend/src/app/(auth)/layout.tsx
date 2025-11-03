import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section  className="py-6 md:py-10">
      <MaxWidthWrapper>
        {children}
      </MaxWidthWrapper>
    </section>
  )
}