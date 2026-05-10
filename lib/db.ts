import "server-only"
import { prisma } from "./prisma"
import { getAllPosts, getAllCategories, getAllTags } from "./posts"
import type { Post, Tag, PostTag } from "@prisma/client"

type PostWithTagNames = Post & { tags: (PostTag & { tag: Tag })[] }

export async function getPostsFromDB(count?: number) {
  try {
    const dbPosts: PostWithTagNames[] = await prisma.post.findMany({
      include: { tags: { include: { tag: true } } },
      orderBy: { date: "desc" },
      ...(count ? { take: count } : {}),
    })
    return dbPosts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      category: p.category,
      date: p.date.toISOString().split("T")[0],
      readTime: p.readTime,
      views: p.views,
      featured: p.featured,
      tags: p.tags.map((pt) => pt.tag.name),
    }))
  } catch {
    const sorted = getAllPosts()
    return count ? sorted.slice(0, count) : sorted
  }
}

export async function getPostBySlugFromDB(slug: string) {
  try {
    const p: PostWithTagNames | null = await prisma.post.findUnique({
      where: { slug },
      include: { tags: { include: { tag: true } } },
    })
    if (!p) return null
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      category: p.category,
      date: p.date.toISOString().split("T")[0],
      readTime: p.readTime,
      views: p.views,
      featured: p.featured,
      tags: p.tags.map((pt) => pt.tag.name),
    }
  } catch {
    return getAllPosts().find((p) => p.slug === slug) || null
  }
}

export async function incrementViews(slug: string) {
  try {
    await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
    })
  } catch {
    // Silently fail if DB not available
  }
}

export async function getCategoriesFromDB() {
  try {
    const result = await prisma.post.groupBy({
      by: ["category"],
      _count: { id: true },
    })
    return result.map((r: { category: string; _count: { id: number } }) => ({
      name: r.category,
      count: r._count.id,
      slug: r.category.toLowerCase().replace(/\s+/g, "-"),
    }))
  } catch {
    return getAllCategories()
  }
}

export async function getTagsFromDB() {
  try {
    const result = await prisma.tag.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { posts: { _count: "desc" } },
    })
    return result.map((t: { name: string; _count: { posts: number } }) => ({
      name: t.name,
      count: t._count.posts,
    }))
  } catch {
    return getAllTags()
  }
}
