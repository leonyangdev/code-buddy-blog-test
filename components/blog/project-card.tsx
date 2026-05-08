import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Globe, Star, ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: string | number
    title: string
    description: string
    tags: string[]
    github: string
    demo: string
    stars?: number
    featured?: boolean
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative py-5 border-b border-border last:border-b-0">
      {/* Tags and featured badge */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        {project.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline" className="text-label-11">
            {tag}
          </Badge>
        ))}
        {project.featured && (
          <Badge variant="featured" className="text-label-11">
            精选
          </Badge>
        )}
        {project.stars && project.stars > 0 && (
          <span className="flex items-center gap-1 text-label-11 text-muted-foreground">
            <Star className="size-3" />
            <span className="tabular-nums">{project.stars}</span>
          </span>
        )}
      </div>

      {/* Title */}
      <Link href={`/projects/${project.id}`} className="block mb-1.5">
        <h3 className="text-heading-18 md:text-heading-20 text-foreground group-hover:text-accent transition-colors duration-150 flex items-start gap-2">
          <span className="flex-1">{project.title}</span>
          <ArrowUpRight className="size-4 mt-1 shrink-0 opacity-0 -translate-y-1 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-accent" />
        </h3>
      </Link>

      {/* Description */}
      <p className="text-copy-14 text-muted-foreground line-clamp-2 mb-3">
        {project.description}
      </p>

      {/* Actions */}
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
        {project.demo && (
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "sm" }) + " gap-1.5"}
          >
            <ExternalLink className="size-3.5" />
            演示
          </Link>
        )}
      </div>
    </div>
  )
}
