"use client"

import { useState, useEffect, useCallback } from "react"
import { Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"

interface BookmarkButtonProps {
  slug: string
}

export function BookmarkButton({ slug }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    const bookmarks = getBookmarks()
    setBookmarked(bookmarks.includes(slug))
  }, [slug])

  const toggle = useCallback(() => {
    setBookmarked((prev) => {
      const bookmarks = getBookmarks()
      if (prev) {
        const next = bookmarks.filter((b) => b !== slug)
        localStorage.setItem("bookmarks", JSON.stringify(next))
        return false
      } else {
        bookmarks.push(slug)
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
        return true
      }
    })
  }, [slug])

  return (
    <button
      onClick={toggle}
      className={cn(
        "flex items-center gap-1.5 text-label-14 transition-colors duration-150",
        bookmarked
          ? "text-accent"
          : "text-muted-foreground hover:text-foreground"
      )}
      aria-label={bookmarked ? "取消收藏" : "收藏文章"}
    >
      <Bookmark className={cn("size-4", bookmarked && "fill-current")} />
      {bookmarked ? "已收藏" : "收藏文章"}
    </button>
  )
}

function getBookmarks(): string[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem("bookmarks")
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}
