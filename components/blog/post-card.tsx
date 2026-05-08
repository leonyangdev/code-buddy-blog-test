import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, ArrowUpRight } from "lucide-react"

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
    <Card className="group relative transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-accent/20">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="secondary" className="text-label-12">
            {post.category}
          </Badge>
          {post.featured && (
            <Badge variant="featured" className="text-label-12">
              精选
            </Badge>
          )}
        </div>
        <CardTitle className="text-heading-20 group-hover:text-accent transition-colors duration-150">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-copy-14 line-clamp-2">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-label-13 text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1 tabular-nums">
              <Eye className="size-3" />
              {post.views.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <time className="tabular-nums">{post.date}</time>
            <ArrowUpRight className="size-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
