import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight, BookOpen, FolderOpen, Mail } from "lucide-react"
import { getLatestPosts, getFeaturedProjects } from "@/lib/data"
import { PostCard } from "@/components/blog/post-card"
import { ProjectCard } from "@/components/blog/project-card"
import { SectionHeading } from "@/components/layout/section-heading"
import { HeroSection } from "@/components/layout/hero-section"
import { NewsletterForm } from "@/components/layout/newsletter-form"

export default function Home() {
  const latestPosts = getLatestPosts(3)
  const featuredProjects = getFeaturedProjects()

  return (
    <div>
      <HeroSection />

      <div className="container mx-auto px-4 md:px-6">
        {/* Latest Posts */}
        <section className="py-16 md:py-20">
          <SectionHeading
            title="最新文章"
            description="探索最新的技术见解和实战经验"
            href="/blog"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16 md:py-20 border-t border-border">
          <SectionHeading
            title="精选项目"
            description="探索我的开源项目和作品集"
            href="/projects"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 mb-6">
              <Mail className="size-3.5 text-muted-foreground" />
              <span className="text-label-13 text-muted-foreground">邮件订阅</span>
            </div>
            <h2 className="text-heading-32 md:text-heading-40 text-foreground mb-3">
              保持联系
            </h2>
            <p className="text-copy-16 text-muted-foreground mb-8">
              订阅我的博客，获取最新的技术文章和项目更新。不会发送垃圾邮件。
            </p>
            <NewsletterForm />
          </div>
        </section>

        {/* Bottom nav shortcuts */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                href: "/blog",
                icon: BookOpen,
                title: "博客文章",
                desc: "浏览所有技术文章和教程",
              },
              {
                href: "/projects",
                icon: FolderOpen,
                title: "项目作品",
                desc: "查看我的开源项目和作品集",
              },
              {
                href: "/about",
                icon: Mail,
                title: "关于我",
                desc: "了解我的技术背景和经历",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-xl border border-border p-6 transition-all duration-200 hover:border-accent/30 hover:shadow-[var(--shadow-md)]"
              >
                <item.icon className="size-6 text-muted-foreground mb-3 transition-colors duration-200 group-hover:text-accent" />
                <h3 className="text-heading-16 text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-copy-14 text-muted-foreground mb-3">
                  {item.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-label-13 text-muted-foreground transition-colors duration-200 group-hover:text-accent">
                  了解更多
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
