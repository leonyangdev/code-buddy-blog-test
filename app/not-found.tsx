import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="text-heading-72 text-foreground/10 tabular-nums">
          404
        </div>
        <h1 className="text-heading-32 text-foreground">页面未找到</h1>
        <p className="text-copy-16 text-muted-foreground">
          抱歉，你访问的页面不存在或已被移除。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className={buttonVariants({ size: "lg" }) + " gap-2"}>
            <Home className="size-4" />
            返回首页
          </Link>
          <Link
            href="/search"
            className={
              buttonVariants({ variant: "outline", size: "lg" }) + " gap-2"
            }
          >
            <Search className="size-4" />
            搜索文章
          </Link>
        </div>
      </div>
    </div>
  )
}
