import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Tag,
  Folder,
  Clock,
  TrendingUp,
  BookOpen
} from "lucide-react"

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
    <aside className={`space-y-4 ${className}`}>
      {/* 分类 */}
      {categories.length > 0 && (
        <Card size="sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-label-16">
              <Folder className="size-4 text-muted-foreground" />
              <span>分类</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/blog/category/${category.slug}`}
                  className="flex items-center justify-between px-2 py-1.5 rounded-md text-copy-14 hover:bg-muted transition-colors duration-150"
                >
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="text-label-12 tabular-nums">{category.count}</Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 标签 */}
      {tags.length > 0 && (
        <Card size="sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-label-16">
              <Tag className="size-4 text-muted-foreground" />
              <span>标签</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Link key={tag.name} href={`/blog/tag/${tag.name}`}>
                  <Badge variant="outline" className="text-label-12 hover:bg-muted transition-colors duration-150">
                    {tag.name}
                    <span className="ml-0.5 opacity-60">({tag.count})</span>
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 最新文章 */}
      {recentPosts.length > 0 && (
        <Card size="sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-label-16">
              <Clock className="size-4 text-muted-foreground" />
              <span>最新文章</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block px-2 py-1.5 rounded-md hover:bg-muted transition-colors duration-150"
                >
                  <h4 className="text-copy-14 font-medium line-clamp-2">{post.title}</h4>
                  <p className="text-label-12 text-muted-foreground mt-0.5">{post.date}</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 热门文章 */}
      {popularPosts.length > 0 && (
        <Card size="sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-label-16">
              <TrendingUp className="size-4 text-muted-foreground" />
              <span>热门文章</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {popularPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block px-2 py-1.5 rounded-md hover:bg-muted transition-colors duration-150"
                >
                  <h4 className="text-copy-14 font-medium line-clamp-2">{post.title}</h4>
                  <p className="text-label-12 text-muted-foreground mt-0.5 tabular-nums">
                    {post.views.toLocaleString()} 次阅读
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 关于作者 */}
      <Card size="sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-label-16">
            <BookOpen className="size-4 text-muted-foreground" />
            <span>关于作者</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="mx-auto size-14 rounded-full bg-muted flex items-center justify-center">
              <span className="text-heading-20 text-muted-foreground">B</span>
            </div>
            <h4 className="text-label-14">博主</h4>
            <p className="text-copy-13 text-muted-foreground">
              热爱技术，专注于 Web 开发和用户体验设计。
            </p>
            <Link
              href="/about"
              className="inline-block text-label-13 text-accent hover:underline"
            >
              了解更多 &rarr;
            </Link>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
