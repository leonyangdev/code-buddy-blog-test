"use client"

import { useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Loader2, ArrowRight } from "lucide-react"

type Status = "idle" | "loading" | "success" | "error"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "订阅失败，请稍后重试")
      }

      setStatus("success")
      setEmail("")
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "订阅失败，请稍后重试")
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-accent/5 border border-accent/20">
        <Check className="size-4 text-accent" />
        <span className="text-label-14 text-foreground">
          订阅成功！感谢你的关注
        </span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === "error") setStatus("idle")
          }}
          placeholder="输入你的邮箱地址"
          required
          aria-label="邮箱地址"
          className={cn(
            "flex-1 h-10 px-4 rounded-lg border border-border bg-background text-copy-14",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring",
            "transition-shadow duration-150",
            status === "error" && "border-destructive focus:ring-destructive/30"
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={buttonVariants({ className: "gap-1.5 px-4" })}
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              订阅
              <ArrowRight className="size-3.5" />
            </>
          )}
        </button>
      </div>
      {status === "error" && errorMsg && (
        <p className="absolute -bottom-6 left-0 text-label-12 text-destructive">
          {errorMsg}
        </p>
      )}
    </form>
  )
}
