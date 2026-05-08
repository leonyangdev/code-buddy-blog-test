import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Code,
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Calendar
} from "lucide-react"

export default function AboutPage() {
  const skills = [
    { category: "前端框架", items: ["React", "Next.js", "Vue.js", "Angular"] },
    { category: "编程语言", items: ["TypeScript", "JavaScript", "Python", "Go"] },
    { category: "CSS 框架", items: ["Tailwind CSS", "Styled Components", "Sass", "CSS Modules"] },
    { category: "开发工具", items: ["Git", "Docker", "VS Code", "Webpack"] },
    { category: "数据库", items: ["PostgreSQL", "MongoDB", "Redis", "MySQL"] },
    { category: "云服务", items: ["AWS", "Vercel", "Netlify", "Firebase"] },
  ]

  const experience = [
    {
      title: "高级前端工程师",
      company: "科技公司",
      period: "2022 - 至今",
      description: "负责公司核心产品的前端架构设计和开发，带领团队完成多个重要项目的交付。",
      achievements: [
        "主导前端架构升级，提升性能 40%",
        "建立前端工程化体系，提高开发效率 30%",
        "指导初级工程师，提升团队整体技术水平",
      ],
    },
    {
      title: "前端工程师",
      company: "互联网公司",
      period: "2020 - 2022",
      description: "参与公司多个 Web 应用的开发，负责前端技术选型和实现。",
      achievements: [
        "开发公司官网，提升品牌形象",
        "实现多个复杂业务组件，提高代码复用率",
        "优化页面性能，提升用户体验",
      ],
    },
    {
      title: "初级前端工程师",
      company: "创业公司",
      period: "2018 - 2020",
      description: "参与公司产品的前端开发，学习并实践前端技术。",
      achievements: [
        "完成多个页面的开发和优化",
        "学习并掌握 React 框架",
        "参与团队代码审查，提高代码质量",
      ],
    },
  ]

  const education = [
    {
      degree: "计算机科学与技术学士",
      school: "某大学",
      period: "2014 - 2018",
      description: "学习计算机科学基础知识，包括数据结构、算法、操作系统等。",
    },
  ]

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div>
        <h1 className="text-heading-40 text-foreground">关于我</h1>
        <p className="text-copy-16 text-muted-foreground mt-2">
          了解我的技术背景、工作经历和兴趣爱好
        </p>
      </div>

      {/* 个人简介 */}
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
              <div className="size-28 rounded-full bg-muted flex items-center justify-center">
                <span className="text-heading-40 text-muted-foreground">B</span>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-copy-18 text-foreground">
                热爱技术，喜欢分享。专注于 Web 开发、前端工程化和用户体验设计。
              </p>
              <p className="text-copy-16 text-muted-foreground">
                我是一名拥有 8 年经验的前端工程师，目前在一家科技公司担任高级前端工程师。
                我热爱技术，喜欢探索新的技术和工具，并将其应用到实际项目中。
                我相信技术可以改变世界，希望通过分享我的经验和知识，帮助更多的人成长。
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {["Web 开发", "前端工程化", "用户体验设计", "技术写作"].map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-label-12">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 技术栈 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-heading-20">
            <Code className="size-5 text-muted-foreground" />
            技术栈
          </CardTitle>
          <CardDescription className="text-copy-14">我熟悉的技术和工具</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill.category} className="space-y-2">
                <h3 className="text-label-16 text-foreground">{skill.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <Badge key={item} variant="outline" className="text-label-12">{item}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 工作经历 */}
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
                  <span className="text-label-13 text-muted-foreground tabular-nums">{exp.period}</span>
                </div>
                <p className="text-label-14 text-muted-foreground mb-2">{exp.company}</p>
                <p className="text-copy-14 text-foreground/80 mb-2">{exp.description}</p>
                <ul className="space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-copy-14 text-muted-foreground flex items-start gap-2">
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

      {/* 教育背景 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-heading-20">
            <GraduationCap className="size-5 text-muted-foreground" />
            教育背景
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-border">
                <div className="absolute -left-[5px] top-0 size-2 rounded-full bg-accent" />
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-label-16 text-foreground">{edu.degree}</h3>
                  <span className="text-label-13 text-muted-foreground tabular-nums">{edu.period}</span>
                </div>
                <p className="text-label-14 text-muted-foreground mb-1">{edu.school}</p>
                <p className="text-copy-14 text-foreground/80">{edu.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 联系方式 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-heading-20">
            <Mail className="size-5 text-muted-foreground" />
            联系方式
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              {[
                { icon: Mail, text: "hello@example.com" },
                { icon: MapPin, text: "中国" },
                { icon: Calendar, text: "工作时间：周一至周五 9:00-18:00" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5">
                  <item.icon className="size-4 text-muted-foreground" />
                  <span className="text-copy-14">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {[
                { name: "GitHub", href: "https://github.com" },
                { name: "Twitter", href: "https://twitter.com" },
                { name: "LinkedIn", href: "https://linkedin.com" },
              ].map((link) => (
                <div key={link.name} className="flex items-center gap-2.5">
                  <span className="size-4 flex items-center justify-center text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-muted-foreground" />
                  </span>
                  <Link href={link.href} target="_blank" rel="noopener noreferrer" className="text-copy-14 text-accent hover:underline">
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center space-y-3 py-4">
        <h2 className="text-heading-24 text-foreground">想联系我？</h2>
        <p className="text-copy-16 text-muted-foreground">
          如果你有任何问题或合作意向，欢迎随时联系我
        </p>
        <Link href="/contact" className={buttonVariants({ size: "lg" }) + " gap-2"}>
          <Mail className="size-4" />
          联系我
        </Link>
      </div>
    </div>
  )
}
