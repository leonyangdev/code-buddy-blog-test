"use client"

import { useState, useCallback } from "react"
import { Share2, Check } from "lucide-react"

interface ShareButtonProps {
  title: string
  url?: string
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = useCallback(async () => {
    const shareUrl = url || window.location.href

    // Use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl })
        return
      } catch {
        // User cancelled or API failed, fall through to copy
      }
    }

    // Fallback: copy URL to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Final fallback
      const input = document.createElement("input")
      input.value = shareUrl
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [title, url])

  return (
    <button
      onClick={handleShare}
      aria-label={copied ? "链接已复制" : "分享文章"}
      className="flex items-center gap-1.5 text-label-14 text-muted-foreground hover:text-foreground transition-colors duration-150"
    >
      {copied ? (
        <>
          <Check className="size-4 text-accent" />
          已复制链接
        </>
      ) : (
        <>
          <Share2 className="size-4" />
          分享文章
        </>
      )}
    </button>
  )
}
