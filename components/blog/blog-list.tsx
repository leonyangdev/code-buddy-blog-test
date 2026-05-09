"use client"

import { useState, useCallback } from "react"
import type { posts as PostsType } from "@/lib/data"
import { PostCard } from "./post-card"
import { BlogSearch } from "./blog-search"

interface BlogListProps {
  posts: PostsType
}

export function BlogList({ posts }: BlogListProps) {
  const [filteredPosts, setFilteredPosts] = useState(posts)

  const handleSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setFilteredPosts(posts)
        return
      }
      const lowerQuery = query.toLowerCase()
      setFilteredPosts(
        posts.filter(
          (post) =>
            post.title.toLowerCase().includes(lowerQuery) ||
            post.excerpt.toLowerCase().includes(lowerQuery) ||
            post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
            post.category.toLowerCase().includes(lowerQuery)
        )
      )
    },
    [posts]
  )

  return (
    <div className="space-y-6">
      <BlogSearch onSearch={handleSearch} />
      <div>
        {filteredPosts.length === 0 ? (
          <p className="text-copy-14 text-muted-foreground text-center py-8">
            未找到匹配的文章
          </p>
        ) : (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  )
}
