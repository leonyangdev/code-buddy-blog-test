"use client"

import { useEffect, useRef } from "react"

/**
 * Giscus 评论组件属性
 */
interface GiscusProps {
  /** GitHub 仓库名称，格式：owner/repo */
  repo: string
  /** GitHub Discussions 的 ID */
  repoId: string
  /** 文章的分类名称 */
  category: string
  /** 分类的 ID */
  categoryId: string
  /** 文章的唯一标识符 */
  mapping: "pathname" | "url" | "title" | "og:title"
  /** 是否启用严格匹配 */
  strict?: boolean
  /** 是否启用 reactions */
  reactionsEnabled?: boolean
  /** 是否发送元数据 */
  emitMetadata?: boolean
  /** 输入框的位置 */
  inputPosition?: "top" | "bottom"
  /** 主题 */
  theme?: "light" | "dark" | "preferred_color_scheme" | "transparent_dark" | "custom"
  /** 语言 */
  lang?: string
  /** 自定义类名 */
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

  useEffect(() => {
    if (!containerRef.current) return

    // 清除之前的内容
    containerRef.current.innerHTML = ""

    // 创建 script 元素
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

    // 添加到容器
    containerRef.current.appendChild(script)

    // 清理函数
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [repo, repoId, category, categoryId, mapping, strict, reactionsEnabled, emitMetadata, inputPosition, theme, lang])

  return (
    <div
      ref={containerRef}
      className={`giscus ${className}`}
      style={{ minHeight: "200px" }}
    />
  )
}

/**
 * Giscus 评论组件（简化版）
 * 使用默认配置的 Giscus 评论组件
 */
export function BlogComments({ className = "" }: { className?: string }) {
  // 这些配置需要用户根据自己的 GitHub 仓库进行修改
  const config = {
    repo: "your-username/your-repo" as `${string}/${string}`,
    repoId: "your-repo-id",
    category: "Announcements",
    categoryId: "your-category-id",
  }

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-4">评论</h3>
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