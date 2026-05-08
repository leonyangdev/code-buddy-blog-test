import Link from "next/link"
import type { Metadata } from "next"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Globe, Star, Code, FolderOpen } from "lucide-react"
import { projects, githubProfile } from "@/lib/data"
import { ProjectCard } from "@/components/blog/project-card"

export const metadata: Metadata = {
  title: "项目展示",
  description: "探索我的开源项目和作品集。",
}

export default function ProjectsPage() {
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return b.stars - a.stars
  })

  const totalStars = projects.reduce((sum, p) => sum + p.stars, 0)

  const contributions = [
    {
      name: "Next.js",
      description: "为 Next.js 框架贡献了性能优化和文档改进",
      url: "https://github.com/vercel/next.js",
      contributions: ["性能优化", "文档改进", "Bug 修复"],
    },
    {
      name: "Tailwind CSS",
      description: "为 Tailwind CSS 贡献了新的工具类和插件",
      url: "https://github.com/tailwindlabs/tailwindcss",
      contributions: ["新工具类", "插件开发", "文档翻译"],
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-heading-40 text-foreground">项目展示</h1>
        <p className="text-copy-16 text-muted-foreground mt-2">
          探索我的开源项目和作品集
        </p>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="elevated" className="text-center">
          <CardContent className="pt-6">
            <FolderOpen className="size-8 mx-auto mb-2 text-accent" />
            <div className="text-heading-32 text-foreground tabular-nums">
              {githubProfile.publicRepos}
            </div>
            <div className="text-label-14 text-muted-foreground">仓库总数</div>
          </CardContent>
        </Card>
        <Card variant="elevated" className="text-center">
          <CardContent className="pt-6">
            <Star className="size-8 mx-auto mb-2 text-accent" />
            <div className="text-heading-32 text-foreground tabular-nums">
              {totalStars}
            </div>
            <div className="text-label-14 text-muted-foreground">总 Stars</div>
          </CardContent>
        </Card>
        <Card variant="elevated" className="text-center">
          <CardContent className="pt-6">
            <Star className="size-8 mx-auto mb-2 text-accent" />
            <div className="text-heading-32 text-foreground tabular-nums">
              {projects.filter((p) => p.featured).length}
            </div>
            <div className="text-label-14 text-muted-foreground">精选项目</div>
          </CardContent>
        </Card>
        <Card variant="elevated" className="text-center">
          <CardContent className="pt-6">
            <Code className="size-8 mx-auto mb-2 text-accent" />
            <div className="text-heading-32 text-foreground tabular-nums">
              10+
            </div>
            <div className="text-label-14 text-muted-foreground">技术栈</div>
          </CardContent>
        </Card>
      </section>

      {/* Project list */}
      <section>
        <div>
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Open source contributions */}
      <section className="space-y-4">
        <h2 className="text-heading-24 text-foreground">开源贡献</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contributions.map((contribution) => (
            <Card key={contribution.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-heading-20">
                  <Globe className="size-5 text-muted-foreground" />
                  {contribution.name}
                </CardTitle>
                <CardDescription className="text-copy-14">
                  {contribution.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {contribution.contributions.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="text-label-12"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    href={contribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      buttonVariants({ variant: "ghost", size: "sm" }) +
                      " gap-1.5"
                    }
                  >
                    查看贡献
                    <ExternalLink className="size-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
