import type { Metadata } from "next"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Search } from "lucide-react"
import { posts, categories, tags } from "@/lib/data"
import { Sidebar } from "@/components/layout/sidebar"
import { PostCard } from "@/components/blog/post-card"

export const metadata: Metadata = {
  title: "博客文章",
  description: "探索最新的技术见解、实战经验和学习心得。",
}

export default function BlogPage() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-heading-40 text-foreground">博客文章</h1>
        <p className="text-copy-16 text-muted-foreground mt-2">
          探索最新的技术见解、实战经验和学习心得
        </p>
      </div>

      {/* Search shortcut */}
      <Link
        href="/search"
        className="flex items-center gap-3 h-10 px-4 rounded-lg bg-muted text-muted-foreground text-copy-14 hover:bg-muted/80 transition-colors duration-150"
      >
        <Search className="size-4" />
        搜索文章...
      </Link>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-4">
          {sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <aside className="lg:col-start-2">
          <Sidebar
            categories={categories}
            tags={tags}
            recentPosts={sortedPosts.slice(0, 5).map((post) => ({
              title: post.title,
              slug: post.slug,
              date: post.date,
            }))}
            popularPosts={sortedPosts
              .sort((a, b) => b.views - a.views)
              .slice(0, 5)
              .map((post) => ({
                title: post.title,
                slug: post.slug,
                views: post.views,
              }))}
          />
        </aside>
      </div>
    </div>
  )
}
