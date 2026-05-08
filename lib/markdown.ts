import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkRehype from "remark-rehype"
import rehypeKatex from "rehype-katex"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeExternalLinks from "rehype-external-links"
import rehypeRaw from "rehype-raw"
import rehypeStringify from "rehype-stringify"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let processor: any = null

function getProcessor() {
  if (!processor) {
    processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, {
        behavior: "wrap",
        properties: {
          className: ["heading-anchor"],
        },
      })
      .use(rehypeExternalLinks, {
        target: "_blank",
        rel: ["noopener", "noreferrer"],
      })
      .use(rehypeHighlight, {
        detect: true,
        ignoreMissing: true,
      })
      .use(rehypeKatex, {
        throwOnError: false,
        strict: false,
      })
      .use(rehypeStringify)
  }
  return processor
}

/**
 * Process markdown string to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const proc = getProcessor()
  const result = await proc.process(markdown)
  return String(result)
}

/**
 * Extract table of contents from rendered HTML
 * This ensures IDs match what rehype-slug generates
 */
export function extractToc(html: string): Array<{
  id: string
  text: string
  level: number
}> {
  const headings: Array<{ id: string; text: string; level: number }> = []
  const regex = /<h([1-4])[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h[1-4]>/gi
  let match

  while ((match = regex.exec(html)) !== null) {
    const level = Number(match[1])
    const id = match[2]
    const text = match[3].replace(/<[^>]+>/g, "").trim()
    if (id && text) {
      headings.push({ id, text, level })
    }
  }

  return headings
}

/**
 * Estimate reading time from markdown content
 */
export function estimateReadingTime(markdown: string): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/[#*_~\[\]()!]/g, "")
    .replace(/\s+/g, " ")
    .trim()

  const wordCount = text.length
  const wordsPerMinute = 300 // Chinese reading speed
  const minutes = Math.ceil(wordCount / wordsPerMinute)

  return `${minutes} 分钟`
}
