import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"

interface PostCardProps {
  post: {
    slug: string
    title: string
    excerpt: string
    category: string
    date: string
    readTime: string
    views: number
    featured?: boolean
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block py-5 border-b border-border last:border-b-0 transition-colors duration-150 hover:bg-muted/30 -mx-4 px-4 rounded-lg"
    >
      {/* Date and category row */}
      <div className="flex items-center gap-3 mb-2">
        <time className="text-label-13 text-muted-foreground tabular-nums">
          {post.date}
        </time>
        <span className="text-muted-foreground/30">·</span>
        <Badge variant="secondary" className="text-label-11 font-normal">
          {post.category}
        </Badge>
        {post.featured && (
          <Badge variant="featured" className="text-label-11">
            精选
          </Badge>
        )}
      </div>

      {/* Title */}
      <h3 className="text-heading-18 md:text-heading-20 text-foreground group-hover:text-accent transition-colors duration-150 mb-1.5 flex items-start gap-2">
        <span className="flex-1">{post.title}</span>
        <ArrowUpRight className="size-4 mt-1 shrink-0 opacity-0 -translate-y-1 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-accent" />
      </h3>

      {/* Excerpt */}
      <p className="text-copy-14 text-muted-foreground line-clamp-2 mb-2">
        {post.excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-3 text-label-12 text-muted-foreground/60">
        <span>{post.readTime}</span>
        <span className="tabular-nums">{post.views.toLocaleString()} 次阅读</span>
      </div>
    </Link>
  )
}
