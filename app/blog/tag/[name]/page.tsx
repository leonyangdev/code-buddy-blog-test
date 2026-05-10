import type { Metadata } from "next"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft, Tag } from "lucide-react"
import { getAllPosts, getAllTags } from "@/lib/posts"
import { Sidebar } from "@/components/layout/sidebar"
import { PostCard } from "@/components/blog/post-card"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>
}): Promise<Metadata> {
  const { name } = await params
  const tags = getAllTags()
  const tag = tags.find((t) => t.name.toLowerCase() === name.toLowerCase())
  if (!tag) return { title: "标签未找到" }
  return {
    title: `标签: ${tag.name}`,
    description: `浏览所有关于 ${tag.name} 的文章。`,
  }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const allPosts = getAllPosts()
  const tags = getAllTags()
  const tag = tags.find((t) => t.name.toLowerCase() === name.toLowerCase())

  if (!tag) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-heading-48 text-foreground">404</h1>
        <p className="text-copy-16 text-muted-foreground">标签未找到</p>
        <Link href="/blog" className={buttonVariants()}>返回博客</Link>
      </div>
    )
  }

  const tagPosts = allPosts
    .filter((post) => post.tags.some((t) => t.toLowerCase() === name.toLowerCase()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-8">
      <Link href="/blog" className={buttonVariants({ variant: "ghost", size: "sm" })}>
        <ArrowLeft className="size-4" />
        返回博客
      </Link>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <Tag className="size-5 text-muted-foreground" />
          <h1 className="text-heading-40 text-foreground">{tag.name}</h1>
        </div>
        <p className="text-copy-16 text-muted-foreground">共 {tagPosts.length} 篇文章</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-4">
          {tagPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <aside className="lg:col-start-2">
          <Sidebar
            tags={tags}
            recentPosts={tagPosts.slice(0, 5).map((post) => ({
              title: post.title,
              slug: post.slug,
              date: post.date,
            }))}
            popularPosts={[...tagPosts]
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
