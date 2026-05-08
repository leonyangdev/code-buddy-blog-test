import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface SectionHeadingProps {
  title: string
  description?: string
  href?: string
  linkText?: string
}

export function SectionHeading({
  title,
  description,
  href,
  linkText = "查看全部",
}: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="text-heading-32 text-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-copy-16 text-muted-foreground mt-1.5">
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className={buttonVariants({ variant: "ghost", size: "sm" }) + " gap-1 shrink-0"}
        >
          {linkText}
          <ArrowRight className="size-3.5" />
        </Link>
      )}
    </div>
  )
}
