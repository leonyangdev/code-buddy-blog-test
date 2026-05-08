"use client"

import { buttonVariants } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="max-w-md mx-auto text-center space-y-6">
        <AlertTriangle className="size-12 mx-auto text-destructive" />
        <h1 className="text-heading-32 text-foreground">出现了错误</h1>
        <p className="text-copy-16 text-muted-foreground">
          抱歉，页面加载时出现了问题。请尝试刷新页面。
        </p>
        {error.digest && (
          <p className="text-label-12 text-muted-foreground font-mono">
            错误 ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className={buttonVariants({ size: "lg" }) + " gap-2"}
        >
          <RefreshCw className="size-4" />
          重试
        </button>
      </div>
    </div>
  )
}
