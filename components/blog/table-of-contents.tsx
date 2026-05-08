"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0.1 }
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  if (items.length < 2) return null

  return (
    <nav aria-label="目录" className="space-y-1">
      <h3 className="text-label-14 text-foreground mb-3">目录</h3>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "block text-label-13 py-1 transition-colors duration-150 border-l-2",
            item.level === 1 && "pl-3",
            item.level === 2 && "pl-5",
            item.level === 3 && "pl-7",
            item.level === 4 && "pl-9",
            activeId === item.id
              ? "text-accent border-accent"
              : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  )
}
