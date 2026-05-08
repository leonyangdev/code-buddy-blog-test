import type { Metadata } from "next"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft, Folder } from "lucide-react"
import { posts, categories } from "@/lib/data"
import { Sidebar } from "@/components/layout/sidebar"
import { PostCard } from "@/components/blog/post-card"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  if (!category) return { title: "分类未找到" }
  return {
    title: `分类: ${category.name}`,
    description: `浏览 ${category.name} 分类下的所有文章。`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-heading-48 text-foreground">404</h1>
        <p className="text-copy-16 text-muted-foreground">分类未找到</p>
        <Link href="/blog" className={buttonVariants()}>返回博客</Link>
      </div>
    )
  }

  const categoryPosts = posts
    .filter((post) => post.category === category.name)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-8">
      <Link href="/blog" className={buttonVariants({ variant: "ghost", size: "sm" })}>
        <ArrowLeft className="size-4" />
        返回博客
      </Link>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <Folder className="size-5 text-muted-foreground" />
          <h1 className="text-heading-40 text-foreground">{category.name}</h1>
        </div>
        <p className="text-copy-16 text-muted-foreground">共 {categoryPosts.length} 篇文章</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-4">
          {categoryPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <aside className="lg:col-start-2">
          <Sidebar
            categories={categories}
            recentPosts={categoryPosts.slice(0, 5).map((post) => ({
              title: post.title,
              slug: post.slug,
              date: post.date,
            }))}
            popularPosts={[...categoryPosts]
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
