import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Globe, Star, ArrowUpRight } from "lucide-react"
import { getGitHubTopRepos } from "@/lib/github"
import { ProjectCard } from "@/components/blog/project-card"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const repos = await getGitHubTopRepos(50)
  const project = repos.find((p) => String(p.id) === id)
  if (!project) return { title: "项目未找到" }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const repos = await getGitHubTopRepos(50)
  const project = repos.find((p) => String(p.id) === id)

  if (!project) {
    notFound()
  }

  const relatedProjects = repos
    .filter(
      (p) =>
        p.id !== project.id &&
        p.tags.some((tag) => project.tags.includes(tag))
    )
    .slice(0, 2)

  return (
    <div className="space-y-8">
      <Link
        href="/projects"
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        <ArrowLeft className="size-4" />
        返回项目
      </Link>

      {/* Project header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-label-12">
              {tag}
            </Badge>
          ))}
          {project.featured && (
            <Badge variant="featured" className="text-label-12">
              精选
            </Badge>
          )}
        </div>
        <h1 className="text-heading-40 md:text-heading-48 text-foreground">
          {project.title}
        </h1>
        <p className="text-copy-18 text-muted-foreground">
          {project.description}
        </p>
        {project.stars > 0 && (
          <div className="flex items-center gap-1.5 text-label-14 text-muted-foreground">
            <Star className="size-4 text-accent" />
            <span className="tabular-nums">{project.stars}</span> stars on GitHub
          </div>
        )}
      </div>

      {/* Project links */}
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
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants() + " gap-2"}
            >
              <Globe className="size-4" />
              访问 GitHub
              <ArrowUpRight className="size-3.5" />
            </Link>
          </CardContent>
        </Card>

        {project.demo && (
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
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants() + " gap-2"}
              >
                <ExternalLink className="size-4" />
                查看演示
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Project details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-20">项目详情</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-copy-16 text-muted-foreground mb-4">
            {project.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-label-16">技术栈</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-label-12">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-label-16">项目状态</h3>
              <div className="flex items-center gap-2">
                <Star className="size-4 text-accent" />
                <span className="text-copy-14">
                  {project.featured ? "精选项目" : "开源项目"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-heading-24 text-foreground">相关项目</h2>
          <div>
            {relatedProjects.map((relatedProject) => (
              <ProjectCard
                key={relatedProject.id}
                project={relatedProject}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
