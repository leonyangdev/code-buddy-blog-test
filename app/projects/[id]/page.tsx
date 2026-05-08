import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Star,
} from "lucide-react"
import { projects } from "@/lib/data"
import { ProjectCard } from "@/components/blog/project-card"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const project = projects.find((p) => p.id === parseInt(id))

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-heading-48 text-foreground">404</h1>
        <p className="text-copy-16 text-muted-foreground">项目未找到</p>
        <Link href="/projects" className={buttonVariants()}>返回项目</Link>
      </div>
    )
  }

  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.tags.some((tag) => project.tags.includes(tag)))
    .slice(0, 2)

  return (
    <div className="space-y-8">
      <Link href="/projects" className={buttonVariants({ variant: "ghost", size: "sm" })}>
        <ArrowLeft className="size-4" />
        返回项目
      </Link>

      {/* 项目头部 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-label-12">{tag}</Badge>
          ))}
          {project.featured && (
            <Badge variant="featured" className="text-label-12">精选</Badge>
          )}
        </div>
        <h1 className="text-heading-40 md:text-heading-48 text-foreground">{project.title}</h1>
        <p className="text-copy-18 text-muted-foreground">{project.description}</p>
      </div>

      {/* 项目链接 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-heading-20">
              <Globe className="size-5 text-muted-foreground" />
              GitHub 仓库
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-copy-14 text-muted-foreground mb-4">
              查看源代码、提交历史和贡献指南
            </p>
            <Link href={project.github} target="_blank" rel="noopener noreferrer" className={buttonVariants() + " gap-2"}>
              <Globe className="size-4" />
              访问 GitHub
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-heading-20">
              <ExternalLink className="size-5 text-muted-foreground" />
              在线演示
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-copy-14 text-muted-foreground mb-4">
              体验项目的实际效果和功能
            </p>
            <Link href={project.demo} target="_blank" rel="noopener noreferrer" className={buttonVariants() + " gap-2"}>
              <ExternalLink className="size-4" />
              查看演示
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* 项目详情 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-20">项目详情</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-copy-16 text-muted-foreground mb-4">{project.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-label-16">技术栈</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-label-12">{tag}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-label-16">项目状态</h3>
              <div className="flex items-center gap-2">
                <Star className="size-4 text-accent" />
                <span className="text-copy-14">{project.featured ? "精选项目" : "普通项目"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 相关项目 */}
      {relatedProjects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-heading-24 text-foreground">相关项目</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedProjects.map((relatedProject) => (
              <ProjectCard key={relatedProject.id} project={relatedProject} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
