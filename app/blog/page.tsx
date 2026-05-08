import type { Metadata } from "next"
import { posts, categories, tags } from "@/lib/data"
import { Sidebar } from "@/components/layout/sidebar"
import { PostCard } from "@/components/blog/post-card"
import { BlogSearch } from "@/components/blog/blog-search"

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

      {/* Inline search */}
      <BlogSearch />

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div>
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
