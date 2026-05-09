import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"
import { getLatestPosts } from "@/lib/data"
import { getGitHubTopRepos } from "@/lib/github"
import { PostCard } from "@/components/blog/post-card"
import { ProjectCard } from "@/components/blog/project-card"
import { SectionHeading } from "@/components/layout/section-heading"
import { HeroSection } from "@/components/layout/hero-section"
import { NewsletterForm } from "@/components/layout/newsletter-form"
import { ScrollReveal } from "@/components/layout/scroll-reveal"

export const metadata = {
  title: "TechPulse - 探索编程世界，分享技术见解",
  description: "一个关于 AI 全栈工程师的技术博客，分享前端开发、Python、人工智能、LLM、RAG 的学习笔记和实践经验。",
}

export default async function Home() {
  const latestPosts = getLatestPosts(4)
  const allRepos = await getGitHubTopRepos(10)
  const featuredProjects = allRepos.filter((r) => r.featured).slice(0, 3)

  return (
    <div>
      <HeroSection />

      <div className="container mx-auto px-4 md:px-6">
        {/* Latest Posts */}
        <ScrollReveal>
          <section className="py-16 md:py-20">
            <SectionHeading
              title="最新文章"
              description="探索最新的技术见解和实战经验"
              href="/blog"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Featured Projects */}
        <ScrollReveal>
          <section className="py-16 md:py-20 border-t border-border">
            <SectionHeading
              title="精选项目"
              description="探索我的开源项目和作品集"
              href="/projects"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Newsletter */}
        <ScrollReveal>
          <section className="py-16 md:py-20 border-t border-border">
            <div className="max-w-xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 mb-6">
                <Mail className="size-3.5 text-muted-foreground" />
                <span className="text-label-13 text-muted-foreground">
                  邮件订阅
                </span>
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
        </ScrollReveal>

        {/* Quick nav */}
        <ScrollReveal>
          <section className="py-16 md:py-20 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  href: "/blog",
                  title: "所有文章",
                  desc: "浏览全部技术文章和教程",
                },
                {
                  href: "/projects",
                  title: "项目作品",
                  desc: "查看开源项目和作品集",
                },
                {
                  href: "/about",
                  title: "关于我",
                  desc: "了解技术背景和工作经历",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group py-4 -mx-2 px-2 rounded-lg transition-colors duration-150 hover:bg-muted/30"
                >
                  <h3 className="text-heading-16 text-foreground mb-1 flex items-center gap-1.5">
                    {item.title}
                    <ArrowRight className="size-3.5 text-muted-foreground transition-all duration-200 group-hover:text-accent group-hover:translate-x-0.5" />
                  </h3>
                  <p className="text-copy-14 text-muted-foreground">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
