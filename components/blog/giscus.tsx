"use client"

import { useEffect, useRef, useState } from "react"
import { MessageSquare, ExternalLink, Loader2 } from "lucide-react"

interface GiscusProps {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping?: "pathname" | "url" | "title" | "og:title"
  strict?: boolean
  reactionsEnabled?: boolean
  emitMetadata?: boolean
  inputPosition?: "top" | "bottom"
  theme?: string
  lang?: string
  className?: string
}

/**
 * Giscus 评论组件
 * 基于 GitHub Discussions 的评论系统
 */
export function Giscus({
  repo,
  repoId,
  category,
  categoryId,
  mapping = "pathname",
  strict = false,
  reactionsEnabled = true,
  emitMetadata = false,
  inputPosition = "top",
  theme = "preferred_color_scheme",
  lang = "zh-CN",
  className = "",
}: GiscusProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    containerRef.current.innerHTML = ""
    setIsLoading(true)

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.setAttribute("data-repo", repo)
    script.setAttribute("data-repo-id", repoId)
    script.setAttribute("data-category", category)
    script.setAttribute("data-category-id", categoryId)
    script.setAttribute("data-mapping", mapping)
    script.setAttribute("data-strict", strict ? "1" : "0")
    script.setAttribute("data-reactions-enabled", reactionsEnabled ? "1" : "0")
    script.setAttribute("data-emit-metadata", emitMetadata ? "1" : "0")
    script.setAttribute("data-input-position", inputPosition)
    script.setAttribute("data-theme", theme)
    script.setAttribute("data-lang", lang)
    script.setAttribute("crossorigin", "anonymous")
    script.async = true

    script.onload = () => setIsLoading(false)
    script.onerror = () => setIsLoading(false)

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [
    repo,
    repoId,
    category,
    categoryId,
    mapping,
    strict,
    reactionsEnabled,
    emitMetadata,
    inputPosition,
    theme,
    lang,
  ])

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl z-10">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            <span className="text-label-14">加载评论中...</span>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="giscus rounded-xl overflow-hidden"
        style={{ minHeight: "200px" }}
      />
    </div>
  )
}

/**
 * 博客评论组件
 * 使用 Giscus 作为评论系统后端
 *
 * 配置步骤：
 * 1. 在 GitHub 仓库设置中启用 Discussions
 * 2. 访问 https://giscus.app/zh-CN
 * 3. 输入你的 GitHub 仓库名
 * 4. 选择分类和映射方式
 * 5. 复制生成的 repoId 和 categoryId
 * 6. 更新下方配置
 */
export function BlogComments({ className = "" }: { className?: string }) {
  // TODO: 替换为你的 Giscus 配置
  // 访问 https://giscus.app 获取配置
  const config = {
    repo: "leonyangdev/code-buddy-blog-test" as `${string}/${string}`,
    repoId: "", // 从 giscus.app 获取
    category: "Announcements",
    categoryId: "", // 从 giscus.app 获取
  }

  // 如果没有配置，显示配置引导
  if (!config.repoId) {
    return (
      <div
        className={`rounded-xl border border-border p-8 text-center space-y-4 ${className}`}
      >
        <div className="inline-flex items-center justify-center size-12 rounded-full bg-muted/50">
          <MessageSquare className="size-6 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-heading-16 text-foreground mb-1">评论功能配置中</h3>
          <p className="text-copy-14 text-muted-foreground max-w-md mx-auto">
            基于 GitHub Discussions 的评论系统正在配置。你需要完成以下步骤来启用评论功能：
          </p>
        </div>
        <div className="text-left max-w-md mx-auto space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
            <span className="flex-shrink-0 size-5 rounded-full bg-accent/10 text-accent flex items-center justify-center text-label-12 font-medium">
              1
            </span>
            <p className="text-copy-13 text-muted-foreground">
              在 GitHub 仓库 <strong>Settings &gt; Features</strong> 中启用 <strong>Discussions</strong>
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
            <span className="flex-shrink-0 size-5 rounded-full bg-accent/10 text-accent flex items-center justify-center text-label-12 font-medium">
              2
            </span>
            <p className="text-copy-13 text-muted-foreground">
              访问 <a href="https://giscus.app/zh-CN" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">giscus.app</a>，输入仓库名并获取 <code className="text-label-12 bg-muted px-1 py-0.5 rounded">repoId</code> 和 <code className="text-label-12 bg-muted px-1 py-0.5 rounded">categoryId</code>
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
            <span className="flex-shrink-0 size-5 rounded-full bg-accent/10 text-accent flex items-center justify-center text-label-12 font-medium">
              3
            </span>
            <p className="text-copy-13 text-muted-foreground">
              将获取的配置填入 <code className="text-label-12 bg-muted px-1 py-0.5 rounded">components/blog/giscus.tsx</code> 文件中的 config 对象
            </p>
          </div>
        </div>
        <a
          href="https://giscus.app/zh-CN"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-label-14 text-accent hover:underline"
        >
          前往 giscus.app 配置
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    )
  }

  return (
    <div className={className}>
      <Giscus
        repo={config.repo}
        repoId={config.repoId}
        category={config.category}
        categoryId={config.categoryId}
        mapping="pathname"
        reactionsEnabled={true}
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="zh-CN"
      />
    </div>
  )
}
