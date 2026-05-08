import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Globe } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: string | number
    title: string
    description: string
    tags: string[]
    github: string
    demo: string
    featured?: boolean
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-accent/20">
      <CardHeader>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 flex-wrap">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-label-12">
                {tag}
              </Badge>
            ))}
          </div>
          {project.featured && (
            <Badge variant="featured" className="text-label-12 shrink-0">
              精选
            </Badge>
          )}
        </div>
        <CardTitle className="text-heading-20 group-hover:text-accent transition-colors duration-150">
          <Link href={`/projects/${project.id}`}>{project.title}</Link>
        </CardTitle>
        <CardDescription className="text-copy-14 line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" }) + " gap-1.5"}
          >
            <Globe className="size-3.5" />
            GitHub
          </Link>
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "sm" }) + " gap-1.5"}
          >
            <ExternalLink className="size-3.5" />
            演示
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
