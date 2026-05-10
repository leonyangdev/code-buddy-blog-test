import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { estimateReadingTime } from "./markdown"

const postsDirectory = path.join(process.cwd(), "content", "posts")

export interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  date: string
  readTime: string
  views: number
  featured: boolean
}

function parsePosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return []

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"))

  const posts = files.map((file, index) => {
    const filePath = path.join(postsDirectory, file)
    const raw = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(raw)
    const slug = file.replace(/\.md$/, "")

    return {
      id: index + 1,
      title: data.title || slug,
      slug,
      excerpt: data.excerpt || "",
      content,
      category: data.category || "未分类",
      tags: data.tags || [],
      date: data.date || new Date().toISOString().split("T")[0],
      readTime: estimateReadingTime(content),
      views: data.views || 0,
      featured: data.featured || false,
    }
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

let cachedPosts: Post[] | null = null

function getPosts(): Post[] {
  if (!cachedPosts || process.env.NODE_ENV === "development") {
    cachedPosts = parsePosts()
  }
  return cachedPosts
}

export function getAllPosts(): Post[] {
  return getPosts()
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug)
}

export function getLatestPosts(count: number = 3): Post[] {
  return getPosts().slice(0, count)
}

export function getFeaturedPosts(): Post[] {
  return getPosts().filter((p) => p.featured)
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getPosts().filter(
    (p) => p.category.toLowerCase().replace(/\s+/g, "-") === categorySlug
  )
}

export function getPostsByTag(tagName: string): Post[] {
  return getPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tagName.toLowerCase())
  )
}

export function searchPosts(query: string): Post[] {
  const lower = query.toLowerCase()
  return getPosts().filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.excerpt.toLowerCase().includes(lower) ||
      p.tags.some((t) => t.toLowerCase().includes(lower))
  )
}

export function getAllCategories() {
  const posts = getPosts()
  const map = new Map<string, number>()
  posts.forEach((p) => {
    map.set(p.category, (map.get(p.category) || 0) + 1)
  })
  return Array.from(map.entries()).map(([name, count]) => ({
    name,
    count,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export function getAllTags() {
  const posts = getPosts()
  const map = new Map<string, number>()
  posts.forEach((p) => {
    p.tags.forEach((t) => {
      map.set(t, (map.get(t) || 0) + 1)
    })
  })
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}
