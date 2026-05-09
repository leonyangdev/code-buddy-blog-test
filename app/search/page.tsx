"use client"

import { useState, useEffect, useCallback, useRef, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { posts, tags } from "@/lib/data"
import { PostCard } from "@/components/blog/post-card"

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>

  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"))

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-accent/20 text-accent rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const debouncedQuery = useDebounce(query, 300)
  const [searchResults, setSearchResults] = useState<typeof posts>([])

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setSearchResults([])
      return
    }
    const lowerQuery = debouncedQuery.toLowerCase()
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        post.category.toLowerCase().includes(lowerQuery)
    )
    setSearchResults(results)
  }, [debouncedQuery])

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
    }
  }, [initialQuery])

  const clearSearch = () => {
    setQuery("")
    setSearchResults([])
  }

  const popularTags = useMemo(() => {
    return tags.slice(0, 6).map((t) => t.name)
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-heading-40 text-foreground">搜索文章</h1>
        <p className="text-copy-16 text-muted-foreground mt-2">
          搜索文章标题、内容、标签或分类
        </p>
      </div>

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入关键词搜索..."
          autoFocus
          className="w-full h-12 pl-12 pr-12 text-copy-18 rounded-xl border border-border bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow duration-150"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      {/* Results */}
      {debouncedQuery && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-heading-20 text-foreground">搜索结果</h2>
            <span className="text-label-14 text-muted-foreground tabular-nums">
              找到 {searchResults.length} 篇文章
            </span>
          </div>

          {searchResults.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Search className="size-10 mx-auto text-muted-foreground" />
              <h3 className="text-label-16">未找到相关文章</h3>
              <p className="text-copy-14 text-muted-foreground">
                尝试使用不同的关键词搜索
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Hot tags */}
      {!debouncedQuery && (
        <div className="space-y-4">
          <h2 className="text-heading-20 text-foreground">热门搜索</h2>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className={buttonVariants({ variant: "outline" })}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-8">
          <div>
            <h1 className="text-heading-40 text-foreground">搜索文章</h1>
            <p className="text-copy-16 text-muted-foreground mt-2">
              搜索文章标题、内容、标签或分类
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <div className="w-full h-12 pl-12 rounded-xl bg-muted animate-pulse" />
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
