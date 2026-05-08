"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import { Check, Copy } from "lucide-react"

interface MarkdownContentProps {
  html: string
  className?: string
}

export function MarkdownContent({ html, className = "" }: MarkdownContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const handleCopy = useCallback(async (pre: HTMLPreElement, idx: number) => {
    const code = pre.querySelector("code")
    const text = code?.textContent || pre.textContent || ""

    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = text
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
    }

    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }, [])

  // Add copy buttons to code blocks
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const pres = container.querySelectorAll("pre")
    pres.forEach((pre, idx) => {
      pre.classList.add("group/code")
      pre.style.position = "relative"

      const btn = document.createElement("button")
      btn.type = "button"
      btn.dataset.codeIdx = String(idx)
      btn.className =
        "copy-code-btn absolute top-2.5 right-2.5 p-1.5 rounded-md border border-border/50 bg-background/60 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-background hover:border-border transition-all duration-150 opacity-0 group-hover/code:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      btn.setAttribute("aria-label", "复制代码")
      pre.appendChild(btn)

      // Render icon
      updateBtnIcon(btn, false)
    })

    const onClick = (e: Event) => {
      const btn = (e.target as HTMLElement).closest(".copy-code-btn")
      if (!btn) return
      const pre = btn.closest("pre")
      const idx = Number((btn as HTMLButtonElement).dataset.codeIdx)
      if (pre) handleCopy(pre, idx)
    }

    container.addEventListener("click", onClick)
    return () => container.removeEventListener("click", onClick)
  }, [html, handleCopy])

  // Update copied state icons
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const btns = container.querySelectorAll(".copy-code-btn")
    btns.forEach((btn, idx) => {
      updateBtnIcon(btn as HTMLButtonElement, copiedIdx === idx)
    })
  }, [copiedIdx])

  return (
    <div
      ref={containerRef}
      className={`prose ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function updateBtnIcon(btn: HTMLButtonElement, copied: boolean) {
  if (copied) {
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
    btn.classList.add("text-accent", "border-accent/30")
  } else {
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>'
    btn.classList.remove("text-accent", "border-accent/30")
  }
}
