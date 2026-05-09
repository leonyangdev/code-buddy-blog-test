import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "关于我",
  description: "了解 TechPulse 的技术背景、工作经历和兴趣爱好。",
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Code,
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Calendar,
  Star,
  Globe,
} from "lucide-react"
import { githubProfile, projects } from "@/lib/data"
import { GitHubContributions } from "@/components/blog/github-contributions"

export default function AboutPage() {
  const skills = [
    { category: "前端框架", items: ["React", "Next.js", "Vue.js", "Vite", "Webpack"] },
    { category: "编程语言", items: ["TypeScript", "JavaScript", "Python"] },
    { category: "前端工程化", items: ["Monorepo", "Tailwind CSS", "CI/CD", "Jenkins"] },
    { category: "AI / ML", items: ["LangChain", "RAG", "Agent", "Transformer"] },
    { category: "数据处理", items: ["NumPy", "Pandas", "PyTorch", "深度学习"] },
    { category: "运维部署", items: ["Docker", "Linux", "AWS", "Vercel"] },
  ]

  const experience = [
    {
      title: "高级前端工程师 / AI 全栈工程师",
      company: "科技公司",
      period: "2022 - 至今",
      description:
        "负责公司核心产品的前端架构设计，同时深入 AI 领域，探索 LLM 应用开发和 RAG 系统构建。",
      achievements: [
        "主导前端架构升级，提升性能 40%",
        "构建基于 LangChain 的 RAG 知识库系统",
        "探索 Agentic AI 在业务场景中的应用",
      ],
    },
    {
      title: "高级前端工程师",
      company: "互联网公司",
      period: "2019 - 2022",
      description: "负责大型 Web 应用的前端架构设计和技术选型。",
      achievements: [
        "搭建 Monorepo 前端工程化体系",
        "主导微前端架构改造",
        "建立前端性能监控和优化体系",
      ],
    },
    {
      title: "前端工程师",
      company: "创业公司",
      period: "2017 - 2019",
      description: "从前端小白成长为独立负责项目的前端开发者。",
      achievements: [
        "从零学习前端技术栈",
        "独立完成多个项目的前端开发",
        "掌握 React、Vue 等主流框架",
      ],
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-heading-40 text-foreground">关于我</h1>
        <p className="text-copy-16 text-muted-foreground mt-2">
          了解我的技术背景、工作经历和兴趣爱好
        </p>
      </div>

      {/* Profile card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-heading-20">
            <User className="size-5 text-muted-foreground" />
            个人简介
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="size-[112px] rounded-full border-2 border-border overflow-hidden">
                <Image
                  src={githubProfile.avatarUrl}
                  alt={githubProfile.name}
                  width={112}
                  height={112}
                  className="object-cover size-full"
                  priority
                />
              </div>
            </div>
            <div className="space-y-3 flex-1">
              <div>
                <h2 className="text-heading-24 text-foreground">
                  {githubProfile.name}
                </h2>
                <p className="text-copy-14 text-muted-foreground">
                  @{githubProfile.username}
                </p>
              </div>
              <p className="text-copy-18 text-foreground">
                {githubProfile.bio}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-label-14 text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {githubProfile.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-4" />
                  {githubProfile.memberSince} 年加入 GitHub
                </span>
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <div className="flex items-center gap-1.5 text-label-14">
                  <Star className="size-4 text-accent" />
                  <span className="tabular-nums font-medium">
                    {githubProfile.totalStars}
                  </span>
                  <span className="text-muted-foreground">Stars</span>
                </div>
                <div className="flex items-center gap-1.5 text-label-14">
                  <Globe className="size-4 text-muted-foreground" />
                  <span className="tabular-nums font-medium">
                    {githubProfile.publicRepos}
                  </span>
                  <span className="text-muted-foreground">Repos</span>
                </div>
                <div className="flex items-center gap-1.5 text-label-14">
                  <User className="size-4 text-muted-foreground" />
                  <span className="tabular-nums font-medium">
                    {githubProfile.followers}
                  </span>
                  <span className="text-muted-foreground">Followers</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "AI 全栈工程师",
                  "前端开发",
                  "Python / AI",
                  "LLM / RAG",
                  "技术写作",
                ].map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-label-12">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <Link
                  href={githubProfile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", size: "sm" }) + " gap-1.5"}
                >
                  <Globe className="size-3.5" />
                  GitHub
                </Link>
                <Link
                  href={githubProfile.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", size: "sm" }) + " gap-1.5"}
                >
                  <Globe className="size-3.5" />
                  Twitter
                </Link>
                <Link
                  href={`mailto:${githubProfile.email}`}
                  className={buttonVariants({ variant: "outline", size: "sm" }) + " gap-1.5"}
                >
                  <Mail className="size-3.5" />
                  Email
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GitHub Contributions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-heading-20">
            <Code className="size-5 text-muted-foreground" />
            GitHub 贡献
          </CardTitle>
          <CardDescription className="text-copy-14">
            过去一年的 GitHub 提交活动
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GitHubContributions username={githubProfile.username} />
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-heading-20">
            <Code className="size-5 text-muted-foreground" />
            技术栈
          </CardTitle>
          <CardDescription className="text-copy-14">
            我熟悉的技术和工具
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill.category} className="space-y-2">
                <h3 className="text-label-16 text-foreground">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="text-label-12"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Open source projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-heading-20">
            <Star className="size-5 text-muted-foreground" />
            开源项目
          </CardTitle>
          <CardDescription className="text-copy-14">
            我的热门开源项目
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => (
              <Link
                key={project.id}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between p-3 rounded-lg border border-border hover:border-accent/30 hover:bg-muted/30 transition-all duration-150"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-label-16 text-foreground group-hover:text-accent transition-colors duration-150">
                    {project.title}
                  </h4>
                  <p className="text-copy-13 text-muted-foreground line-clamp-1 mt-0.5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-label-11"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-label-13 text-muted-foreground shrink-0 ml-4">
                  <Star className="size-3.5" />
                  <span className="tabular-nums">{project.stars}</span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Work experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-heading-20">
            <Briefcase className="size-5 text-muted-foreground" />
            工作经历
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-border">
                <div className="absolute -left-[5px] top-0 size-2 rounded-full bg-accent" />
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-label-16 text-foreground">{exp.title}</h3>
                  <span className="text-label-13 text-muted-foreground tabular-nums">
                    {exp.period}
                  </span>
                </div>
                <p className="text-label-14 text-muted-foreground mb-2">
                  {exp.company}
                </p>
                <p className="text-copy-14 text-foreground/80 mb-2">
                  {exp.description}
                </p>
                <ul className="space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="text-copy-14 text-muted-foreground flex items-start gap-2"
                    >
                      <span className="mt-2 size-1 rounded-full bg-muted-foreground shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-heading-20">
            <GraduationCap className="size-5 text-muted-foreground" />
            教育背景
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative pl-6 border-l-2 border-border">
            <div className="absolute -left-[5px] top-0 size-2 rounded-full bg-accent" />
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-label-16 text-foreground">
                {githubProfile.education.major}
              </h3>
              <span className="text-label-13 text-muted-foreground tabular-nums">
                2013 - 2017
              </span>
            </div>
            <p className="text-label-14 text-muted-foreground mb-1">
              {githubProfile.education.school} · {githubProfile.education.degree}
            </p>
            <p className="text-copy-14 text-foreground/80">
              通过专业学习和实践走上了前端开发之路，现在正在向 AI 全栈方向发展。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <div className="text-center space-y-3 py-4">
        <h2 className="text-heading-24 text-foreground">想联系我？</h2>
        <p className="text-copy-16 text-muted-foreground">
          如果你有任何问题或合作意向，欢迎随时联系我
        </p>
        <Link
          href="/contact"
          className={buttonVariants({ size: "lg" }) + " gap-2"}
        >
          <Mail className="size-4" />
          联系我
        </Link>
      </div>
    </div>
  )
}
