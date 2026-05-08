import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Tag, Folder, Clock, TrendingUp, User } from "lucide-react"

interface SidebarProps {
  categories?: Array<{ name: string; count: number; slug: string }>
  tags?: Array<{ name: string; count: number }>
  recentPosts?: Array<{ title: string; slug: string; date: string }>
  popularPosts?: Array<{ title: string; slug: string; views: number }>
  className?: string
}

export function Sidebar({
  categories = [],
  tags = [],
  recentPosts = [],
  popularPosts = [],
  className = "",
}: SidebarProps) {
  return (
    <aside className={`space-y-5 ${className}`}>
      {/* Categories */}
      {categories.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="flex items-center gap-2 text-label-14 text-foreground px-1">
            <Folder className="size-3.5 text-muted-foreground" />
            分类
          </h3>
          <div className="space-y-0.5">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="flex items-center justify-between px-2 py-1.5 rounded-md text-copy-13 hover:bg-muted transition-colors duration-150"
              >
                <span className="text-foreground/80">{category.name}</span>
                <span className="text-label-11 text-muted-foreground tabular-nums">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="flex items-center gap-2 text-label-14 text-foreground px-1">
            <Tag className="size-3.5 text-muted-foreground" />
            标签
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Link key={tag.name} href={`/blog/tag/${tag.name}`}>
                <Badge
                  variant="outline"
                  className="text-label-11 hover:bg-muted transition-colors duration-150"
                >
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="flex items-center gap-2 text-label-14 text-foreground px-1">
            <Clock className="size-3.5 text-muted-foreground" />
            最新文章
          </h3>
          <div className="space-y-0.5">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block px-2 py-1.5 rounded-md hover:bg-muted transition-colors duration-150"
              >
                <h4 className="text-copy-13 text-foreground/80 line-clamp-2 leading-snug">
                  {post.title}
                </h4>
                <p className="text-label-11 text-muted-foreground mt-0.5">
                  {post.date}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Popular posts */}
      {popularPosts.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="flex items-center gap-2 text-label-14 text-foreground px-1">
            <TrendingUp className="size-3.5 text-muted-foreground" />
            热门文章
          </h3>
          <div className="space-y-0.5">
            {popularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block px-2 py-1.5 rounded-md hover:bg-muted transition-colors duration-150"
              >
                <h4 className="text-copy-13 text-foreground/80 line-clamp-2 leading-snug">
                  {post.title}
                </h4>
                <p className="text-label-11 text-muted-foreground mt-0.5 tabular-nums">
                  {post.views.toLocaleString()} 次阅读
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* About author */}
      <div className="space-y-2.5">
        <h3 className="flex items-center gap-2 text-label-14 text-foreground px-1">
          <User className="size-3.5 text-muted-foreground" />
          关于作者
        </h3>
        <div className="px-2 py-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <span className="text-label-14 text-muted-foreground">L</span>
            </div>
            <div>
              <h4 className="text-label-14 text-foreground">兰亭古墨</h4>
              <p className="text-label-11 text-muted-foreground">
                @leonyangdev
              </p>
            </div>
          </div>
          <p className="text-copy-13 text-muted-foreground leading-relaxed">
            Front-End Expert | Full-Stack Developer | Currently Learning AI
          </p>
          <Link
            href="/about"
            className="inline-block mt-2 text-label-12 text-accent hover:underline"
          >
            了解更多 &rarr;
          </Link>
        </div>
      </div>
    </aside>
  )
}
