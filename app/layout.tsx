import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import "katex/dist/katex.min.css"
import { MainLayout } from "@/components/layout/main-layout"
import { WebsiteJsonLd } from "@/components/seo/json-ld"
import { githubProfile } from "@/lib/data"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${githubProfile.name} — 个人技术博客`,
    template: `%s | ${githubProfile.name}`,
  },
  description:
    "一个关于 AI 全栈工程师的技术博客，分享 Python、人工智能、LLM、RAG 和前端开发的学习笔记和实践经验。",
  keywords: [
    "技术博客",
    "Web 开发",
    "前端开发",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "AI",
    "RAG",
  ],
  authors: [{ name: githubProfile.name }],
  creator: githubProfile.name,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: `${githubProfile.name} 的技术博客`,
    title: `${githubProfile.name} — 个人技术博客`,
    description:
      "一个优雅精致的技术博客，分享 Web 开发、前端工程化和用户体验设计的最新见解和实践经验。",
    images: [
      {
        url: githubProfile.avatarUrl,
        width: 400,
        height: 400,
        alt: githubProfile.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${githubProfile.name} — 个人技术博客`,
    description:
      "一个优雅精致的技术博客，分享 Web 开发、前端工程化和用户体验设计的最新见解和实践经验。",
    creator: `@${githubProfile.twitter}`,
    images: [githubProfile.avatarUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
      </head>
      <body className="min-h-full flex flex-col">
        <WebsiteJsonLd
          name="个人技术博客"
          url={siteUrl}
          description="一个优雅精致的技术博客，分享 Web 开发、前端工程化和用户体验设计的最新见解和实践经验。"
          potentialAction={{
            "@type": "SearchAction",
            target: `${siteUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          }}
        />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
