"use client"

import { useEffect, useRef } from "react"

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
 * 基于 GitHub Discussions 的评论系统，最适合 Next.js 技术博客：
 * - 与 GitHub 生态无缝集成
 * - 支持暗色模式自动切换
 * - 无需额外后端服务
 * - 开发者友好的讨论体验
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

  useEffect(() => {
    if (!containerRef.current) return

    containerRef.current.innerHTML = ""

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
    <div
      ref={containerRef}
      className={`giscus rounded-xl overflow-hidden ${className}`}
      style={{ minHeight: "200px" }}
    />
  )
}

/**
 * 博客评论组件
 * 使用 Giscus 作为评论系统后端
 *
 * 配置步骤：
 * 1. 访问 https://giscus.app/zh-CN
 * 2. 输入你的 GitHub 仓库名（需要启用 Discussions）
 * 3. 选择分类和映射方式
 * 4. 复制生成的 repoId 和 categoryId
 * 5. 更新下方配置
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

  // 如果没有配置，显示提示信息
  if (!config.repoId) {
    return (
      <div
        className={`rounded-xl border border-border p-8 text-center ${className}`}
      >
        <p className="text-copy-14 text-muted-foreground mb-2">
          评论功能正在配置中
        </p>
        <p className="text-label-12 text-muted-foreground/60">
          基于 GitHub Discussions 的评论系统即将上线
        </p>
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
