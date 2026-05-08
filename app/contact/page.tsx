"use client"

import { useState } from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Mail,
  Send,
  MapPin,
  Clock,
  Globe,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { githubProfile } from "@/lib/data"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

type FormStatus = "idle" | "loading" | "success" | "error"

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (status === "error") setStatus("idle")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "发送失败，请稍后重试")
      }

      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "发送失败，请稍后重试")
    }
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-heading-40 text-foreground">联系我</h1>
        <p className="text-copy-16 text-muted-foreground mt-2">
          如果你有任何问题或合作意向，欢迎随时联系我
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-heading-20">
              <MessageSquare className="size-5 text-muted-foreground" />
              发送消息
            </CardTitle>
            <CardDescription className="text-copy-14">
              填写以下表单，我会尽快回复你
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === "success" ? (
              <div className="text-center space-y-4 py-8">
                <CheckCircle className="size-12 mx-auto text-accent" />
                <h3 className="text-label-16">消息已发送</h3>
                <p className="text-copy-14 text-muted-foreground">
                  感谢你的来信，我会尽快回复你
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className={buttonVariants({ variant: "outline" })}
                >
                  发送新消息
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-label-14">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="你的姓名"
                      className="w-full h-9 px-3 rounded-lg border border-border bg-background text-copy-14 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow duration-150"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-label-14">
                      邮箱 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="你的邮箱"
                      className="w-full h-9 px-3 rounded-lg border border-border bg-background text-copy-14 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow duration-150"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-label-14">
                    主题 *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="消息主题"
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background text-copy-14 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow duration-150"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-label-14">
                    消息内容 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="请输入你的消息..."
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-copy-14 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow duration-150 resize-none"
                  />
                </div>

                {status === "error" && errorMsg && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <AlertCircle className="size-4 text-destructive shrink-0" />
                    <p className="text-copy-13 text-destructive">{errorMsg}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={buttonVariants({ className: "w-full gap-2" })}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      发送中...
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      发送消息
                    </>
                  )}
                </button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-heading-20">
                <Mail className="size-5 text-muted-foreground" />
                联系方式
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "邮箱", value: githubProfile.email },
                  { icon: MapPin, label: "位置", value: githubProfile.location },
                  {
                    icon: Clock,
                    label: "工作时间",
                    value: "周一至周五 9:00-18:00",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <item.icon className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-label-14">{item.label}</p>
                      <p className="text-copy-14 text-muted-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-20">社交媒体</CardTitle>
              <CardDescription className="text-copy-14">
                关注我的社交媒体，获取最新动态
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  {
                    icon: Globe,
                    name: "GitHub",
                    desc: "查看我的开源项目",
                    href: githubProfile.githubUrl,
                  },
                  {
                    icon: Globe,
                    name: "Twitter",
                    desc: "关注我的技术分享",
                    href: githubProfile.twitterUrl,
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors duration-150"
                  >
                    <social.icon className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-label-14">{social.name}</p>
                      <p className="text-copy-13 text-muted-foreground">
                        {social.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-20">常见问题</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    q: "你接受合作吗？",
                    a: "是的，我接受技术咨询、项目合作和内容创作等合作。",
                  },
                  {
                    q: "回复时间是多久？",
                    a: "我通常会在 24 小时内回复邮件，工作日会更快。",
                  },
                  {
                    q: "可以提供技术培训吗？",
                    a: "是的，我可以提供前端技术培训和咨询服务。",
                  },
                ].map((item) => (
                  <div key={item.q}>
                    <h4 className="text-label-14 mb-1">{item.q}</h4>
                    <p className="text-copy-14 text-muted-foreground">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
