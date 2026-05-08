import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Code, FolderOpen } from "lucide-react"
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

    </div>
  )
}
