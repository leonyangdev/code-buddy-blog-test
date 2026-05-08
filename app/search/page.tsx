"use client"

import { useState } from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X } from "lucide-react"
import { posts } from "@/lib/data"
import { PostCard } from "@/components/blog/post-card"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof posts>([])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }
    const lowerQuery = searchQuery.toLowerCase()
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        post.category.toLowerCase().includes(lowerQuery)
    )
    setSearchResults(results)
  }

  const clearSearch = () => {
    setQuery("")
    setSearchResults([])
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-heading-40 text-foreground">搜索文章</h1>
        <p className="text-copy-16 text-muted-foreground mt-2">
          搜索文章标题、内容、标签或分类
        </p>
      </div>

      {/* 搜索框 */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="输入关键词搜索..."
          className="w-full h-12 pl-12 pr-12 text-copy-18 rounded-xl bg-muted placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow duration-150"
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

      {/* 搜索结果 */}
      {query && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-heading-20 text-foreground">搜索结果</h2>
            <span className="text-label-14 text-muted-foreground tabular-nums">
              找到 {searchResults.length} 篇文章
            </span>
          </div>

          {searchResults.length === 0 ? (
            <Card variant="ghost">
              <CardContent className="py-12 text-center">
                <Search className="size-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-label-16 mb-2">未找到相关文章</h3>
                <p className="text-copy-14 text-muted-foreground">
                  尝试使用不同的关键词搜索
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {searchResults.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 热门搜索 */}
      {!query && (
        <div className="space-y-4">
          <h2 className="text-heading-20 text-foreground">热门搜索</h2>
          <div className="flex flex-wrap gap-2">
            {["Next.js", "React", "TypeScript", "Tailwind CSS", "性能优化", "用户体验"].map((tag) => (
              <button
                key={tag}
                onClick={() => handleSearch(tag)}
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
