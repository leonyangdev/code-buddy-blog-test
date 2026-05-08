import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Clock,
  Eye,
  Calendar,
  Tag,
  Share2,
  Bookmark,
} from "lucide-react"
import { posts } from "@/lib/data"
import { Sidebar } from "@/components/layout/sidebar"
import { BlogComments } from "@/components/blog/giscus"
import { PostCard } from "@/components/blog/post-card"
import { ArticleJsonLd } from "@/components/seo/json-ld"
import { MarkdownContent } from "@/components/blog/markdown-content"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { markdownToHtml, extractToc } from "@/lib/markdown"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-heading-48 text-foreground">404</h1>
        <p className="text-copy-16 text-muted-foreground">文章未找到</p>
        <Link href="/blog" className={buttonVariants()}>
          返回博客
        </Link>
      </div>
    )
  }

  const [html, toc] = await Promise.all([
    markdownToHtml(post.content),
    Promise.resolve(extractToc(post.content)),
  ])

  const relatedPosts = posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2)

  return (
    <div className="space-y-8">
      <ReadingProgress />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={`https://your-domain.com/blog/${post.slug}`}
        datePublished={post.date}
        authorName="博主"
        publisherName="个人技术博客"
      />

      {/* Back button */}
      <Link
        href="/blog"
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        <ArrowLeft className="size-4" />
        返回博客
      </Link>

      {/* Article header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{post.category}</Badge>
          {post.featured && <Badge variant="featured">精选</Badge>}
        </div>
        <h1 className="text-heading-40 md:text-heading-48 text-foreground">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-label-14 text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1.5 tabular-nums">
            <Eye className="size-4" />
            {post.views.toLocaleString()} 次阅读
          </span>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8">
        <div className="space-y-8">
          {/* Article body */}
          <article className="rounded-xl bg-card p-6 md:p-8 ring-1 ring-foreground/10">
            <MarkdownContent html={html} />
          </article>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="size-4 text-muted-foreground" />
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog/tag/${tag}`}>
                <Badge
                  variant="outline"
                  className="text-label-12 hover:bg-muted transition-colors duration-150"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Share and bookmark */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-label-14 text-muted-foreground hover:text-foreground transition-colors duration-150">
              <Share2 className="size-4" />
              分享文章
            </button>
            <button className="flex items-center gap-1.5 text-label-14 text-muted-foreground hover:text-foreground transition-colors duration-150">
              <Bookmark className="size-4" />
              收藏文章
            </button>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-heading-24 text-foreground mb-4">
                相关文章
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div>
            <h2 className="text-heading-24 text-foreground mb-4">评论</h2>
            <BlogComments />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-start-2 space-y-6">
          <TableOfContents items={toc} />
          <Sidebar
            categories={[
              {
                name: post.category,
                count: 1,
                slug: post.category.toLowerCase().replace(/\s+/g, "-"),
              },
            ]}
            tags={post.tags.map((tag) => ({ name: tag, count: 1 }))}
          />
        </aside>
      </div>
    </div>
  )
}
