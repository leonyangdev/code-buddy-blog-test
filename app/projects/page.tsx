import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Code, FolderOpen } from "lucide-react"
import { githubProfile } from "@/lib/data"
import { getGitHubProfile, getGitHubTopRepos } from "@/lib/github"
import { ProjectCard } from "@/components/blog/project-card"

export const metadata: Metadata = {
  title: "项目展示",
  description: "探索我的开源项目和作品集。",
}

export default async function ProjectsPage() {
  const [ghProfile, topRepos] = await Promise.all([
    getGitHubProfile(),
    getGitHubTopRepos(20),
  ])

  const repos = topRepos.length > 0 ? topRepos : []
  const totalStars = repos.reduce((sum, p) => sum + p.stars, 0)
  const publicRepos = ghProfile?.publicRepos || githubProfile.publicRepos

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
              {publicRepos}
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
              {repos.filter((p) => p.featured).length}
            </div>
            <div className="text-label-14 text-muted-foreground">精选项目</div>
          </CardContent>
        </Card>
        <Card variant="elevated" className="text-center">
          <CardContent className="pt-6">
            <Code className="size-8 mx-auto mb-2 text-accent" />
            <div className="text-heading-32 text-foreground tabular-nums">
              {[...new Set(repos.flatMap((r) => r.tags))].length}+
            </div>
            <div className="text-label-14 text-muted-foreground">技术栈</div>
          </CardContent>
        </Card>
      </section>

      {/* Project list */}
      <section>
        <div>
          {repos.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

    </div>
  )
}
