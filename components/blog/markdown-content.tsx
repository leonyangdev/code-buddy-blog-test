"use client"

import { useMemo } from "react"

interface MarkdownContentProps {
  html: string
  className?: string
}

export function MarkdownContent({ html, className = "" }: MarkdownContentProps) {
  const content = useMemo(() => ({ __html: html }), [html])

  return (
    <div
      className={`prose ${className}`}
      dangerouslySetInnerHTML={content}
    />
  )
}
