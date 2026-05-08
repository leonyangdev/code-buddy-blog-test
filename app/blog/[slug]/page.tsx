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
  Bookmark
} from "lucide-react"
import { posts } from "@/lib/data"
import { Sidebar } from "@/components/layout/sidebar"
import { BlogComments } from "@/components/blog/giscus"
import { PostCard } from "@/components/blog/post-card"
import { ArticleJsonLd } from "@/components/seo/json-ld"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
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

  const relatedPosts = posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2)

  return (
    <div className="space-y-8">
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={`https://your-domain.com/blog/${post.slug}`}
        datePublished={post.date}
        authorName="博主"
        publisherName="个人技术博客"
      />

      {/* 返回按钮 */}
      <Link href="/blog" className={buttonVariants({ variant: "ghost", size: "sm" })}>
        <ArrowLeft className="size-4" />
        返回博客
      </Link>

      {/* 文章头部 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{post.category}</Badge>
          {post.featured && (
            <Badge variant="featured">精选</Badge>
          )}
        </div>
        <h1 className="text-heading-40 md:text-heading-48 text-foreground">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-label-14 text-muted-foreground">
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

      {/* 文章内容 */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-8">
          {/* 文章正文 */}
          <article className="rounded-xl bg-card p-6 md:p-8 ring-1 ring-foreground/10">
            <p className="text-copy-18 text-muted-foreground mb-6">
              {post.excerpt}
            </p>
            <div className="text-copy-16 text-foreground/90 whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>

            {/* 标签 */}
            <div className="mt-8 pt-6 border-t border-border flex items-center gap-2 flex-wrap">
              <Tag className="size-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog/tag/${tag}`}>
                  <Badge variant="outline" className="text-label-12 hover:bg-muted transition-colors duration-150">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* 分享和收藏 */}
            <div className="mt-4 flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-label-14 text-muted-foreground hover:text-foreground transition-colors duration-150">
                <Share2 className="size-4" />
                分享文章
              </button>
              <button className="flex items-center gap-1.5 text-label-14 text-muted-foreground hover:text-foreground transition-colors duration-150">
                <Bookmark className="size-4" />
                收藏文章
              </button>
            </div>
          </article>

          {/* 相关文章 */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-heading-24 text-foreground mb-4">相关文章</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          )}

          {/* 评论区域 */}
          <div>
            <h2 className="text-heading-24 text-foreground mb-4">评论</h2>
            <BlogComments />
          </div>
        </div>

        {/* 侧边栏 */}
        <aside className="lg:col-start-2">
          <Sidebar
            categories={[{ name: post.category, count: 1, slug: post.category.toLowerCase().replace(/\s+/g, "-") }]}
            tags={post.tags.map((tag) => ({ name: tag, count: 1 }))}
          />
        </aside>
      </div>
    </div>
  )
}
