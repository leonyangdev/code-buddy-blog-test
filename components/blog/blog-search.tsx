"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

interface BlogSearchProps {
  onSearch?: (query: string) => void
}

export function BlogSearch({ onSearch }: BlogSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (onSearch) {
      onSearch(query)
    }
  }, [query, onSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!onSearch && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索文章标题、标签或分类..."
        className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-copy-14 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-shadow duration-150"
      />
    </form>
  )
}
