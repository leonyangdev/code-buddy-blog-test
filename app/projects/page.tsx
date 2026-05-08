import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ExternalLink,
  Globe,
  Star,
  Code,
  FolderOpen,
  Link as LinkIcon
} from "lucide-react"
import { projects } from "@/lib/data"
import { ProjectCard } from "@/components/blog/project-card"
import { StatCard } from "@/components/ui/stat-card"

export default function ProjectsPage() {
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

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
      {/* 页面标题 */}
      <div>
        <h1 className="text-heading-40 text-foreground">项目展示</h1>
        <p className="text-copy-16 text-muted-foreground mt-2">
          探索我的开源项目和作品集
        </p>
      </div>

      {/* 项目统计 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={FolderOpen} value={projects.length.toString()} label="项目数量" />
        <StatCard icon={Star} value={projects.filter((p) => p.featured).length.toString()} label="精选项目" />
        <StatCard icon={Code} value="10+" label="技术栈" />
        <StatCard icon={LinkIcon} value="5+" label="开源贡献" />
      </section>

      {/* 项目列表 */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 开源贡献 */}
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
                <CardDescription className="text-copy-14">{contribution.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {contribution.contributions.map((item) => (
                      <Badge key={item} variant="secondary" className="text-label-12">{item}</Badge>
                    ))}
                  </div>
                  <Link href={contribution.url} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "ghost", size: "sm" }) + " gap-1.5"}>
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
