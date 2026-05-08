/**
 * 博客数据 — 基于真实 GitHub 信息
 */

// GitHub 用户信息
export const githubProfile = {
  username: "leonyangdev",
  name: "兰亭古墨",
  bio: "Front-End Expert | Full-Stack Developer | Currently Learning AI | Husband & Father",
  location: "ShenZhen, CHINA",
  avatarUrl: "https://avatars.githubusercontent.com/u/26035866?v=4",
  twitter: "leonyangdev",
  githubUrl: "https://github.com/leonyangdev",
  publicRepos: 152,
  followers: 18,
  following: 71,
  totalStars: 597,
  memberSince: "2017",
}

export const posts = [
  {
    id: 1,
    title: "Next.js 16 新特性解析：App Router 的全面升级",
    slug: "nextjs-16-app-router-upgrade",
    excerpt: "深入探讨 Next.js 16 带来的 App Router 改进，包括性能优化、开发体验提升和新的 API 设计。",
    content: `# Next.js 16 新特性解析

Next.js 16 带来了许多令人兴奋的新特性，让我们一起来深入了解。

## App Router 改进

App Router 在这一版本中得到了全面的升级，主要体现在以下几个方面：

### 性能优化

- **更快的页面加载**：通过改进的代码分割策略
- **更小的客户端包体积**：Tree-shaking 优化
- **更好的缓存策略**：增量式静态再生（ISR）改进

### 开发体验

\`\`\`typescript
// 新的路由定义方式
export default function Page() {
  return <div>Hello World</div>
}

// 动态路由
export async function generateStaticParams() {
  return [{ slug: 'hello' }, { slug: 'world' }]
}
\`\`\`

### 新的 API 设计

> Next.js 16 引入了全新的 \`after\` API，允许在响应发送后执行操作。

| 特性 | 描述 | 状态 |
|------|------|------|
| after API | 响应后执行 | ✅ 稳定 |
| PPR | 部分预渲染 | ✅ 稳定 |
| Turbopack | 构建工具 | 🔄 测试中 |

## 总结

Next.js 16 是一个重要的版本更新，带来了显著的性能提升和开发体验改进。

---

**推荐阅读**：[官方升级指南](https://nextjs.org/docs)
`,
    category: "前端框架",
    tags: ["Next.js", "React", "前端开发"],
    date: "2026-05-08",
    readTime: "8 分钟",
    views: 1250,
    featured: true,
  },
  {
    id: 2,
    title: "Tailwind CSS 4.0 实战：构建现代化 UI 组件",
    slug: "tailwindcss-4-modern-ui-components",
    excerpt: "学习如何使用 Tailwind CSS 4.0 的新功能来构建美观、响应式的用户界面组件。",
    content: `# Tailwind CSS 4.0 实战

Tailwind CSS 4.0 引入了革命性的变化，让样式编写更加高效。

## CSS-first 配置

\`\`\`css
@import "tailwindcss";

@theme inline {
  --color-primary: oklch(0.546 0.197 254.1);
  --color-background: oklch(1 0 0);
  --font-sans: var(--font-geist-sans);
}
\`\`\`

## 新特性一览

1. **原生 CSS 变量支持**：不再需要 JavaScript 配置
2. **改进的 IDE 支持**：更好的自动补全和类型检查
3. **更快的编译速度**：基于 Rust 的引擎

## 数学公式支持

行内公式：$E = mc^2$

块级公式：

$$
\\frac{n!}{k!(n-k)!} = \\binom{n}{k}
$$
`,
    category: "CSS 框架",
    tags: ["Tailwind CSS", "CSS", "UI 设计"],
    date: "2026-05-05",
    readTime: "12 分钟",
    views: 980,
    featured: true,
  },
  {
    id: 3,
    title: "TypeScript 6.0 类型系统深入解析",
    slug: "typescript-6-type-system-deep-dive",
    excerpt: "探索 TypeScript 6.0 中强大的类型系统特性，包括条件类型、映射类型和模板字面量类型。",
    content: `# TypeScript 6.0 类型系统深入解析

TypeScript 6.0 的类型系统更加完善。

## 条件类型

\`\`\`typescript
type IsString<T> = T extends string ? true : false
type A = IsString<"hello"> // true
type B = IsString<42>      // false
\`\`\`

## 模板字面量类型

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`
type ClickEvent = EventName<"click"> // "onClick"
\`\`\`
`,
    category: "编程语言",
    tags: ["TypeScript", "类型系统", "JavaScript"],
    date: "2026-05-02",
    readTime: "15 分钟",
    views: 1560,
    featured: false,
  },
  {
    id: 4,
    title: "React Server Components 最佳实践",
    slug: "react-server-components-best-practices",
    excerpt: "掌握 React Server Components 的使用技巧，提升应用性能和用户体验。",
    content: `# React Server Components 最佳实践

React Server Components 改变了我们构建应用的方式。

## 什么是 RSC？

Server Components 在服务器上运行，可以直接访问数据库和文件系统。

\`\`\`tsx
async function UserProfile({ userId }: { userId: string }) {
  const user = await db.user.findById(userId)
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  )
}
\`\`\`

## 关键原则

1. **默认使用 Server Components**：减少客户端 JavaScript
2. **最小化 Client Components**：只在需要交互时使用
3. **合理使用 Suspense**：优化加载体验
`,
    category: "前端框架",
    tags: ["React", "Server Components", "性能优化"],
    date: "2026-04-28",
    readTime: "10 分钟",
    views: 890,
    featured: false,
  },
  {
    id: 5,
    title: "Web 性能优化：从理论到实践",
    slug: "web-performance-optimization-theory-to-practice",
    excerpt: "全面的 Web 性能优化指南，涵盖加载性能、运行时性能和用户体验优化。",
    content: `# Web 性能优化：从理论到实践

性能优化是 Web 开发的重要课题。

## Core Web Vitals

- **LCP**（Largest Contentful Paint）
- **FID**（First Input Delay）
- **CLS**（Cumulative Layout Shift）

## 优化策略

\`\`\`javascript
// 预加载关键资源
const link = document.createElement('link')
link.rel = 'preload'
link.as = 'image'
link.href = '/hero.webp'
document.head.appendChild(link)
\`\`\`

> 好的性能不是一次性的工作，而是持续的过程。
`,
    category: "性能优化",
    tags: ["性能优化", "Web Vitals", "用户体验"],
    date: "2026-04-25",
    readTime: "18 分钟",
    views: 2100,
    featured: true,
  },
  {
    id: 6,
    title: "构建可访问的 Web 应用：WCAG 2.2 指南",
    slug: "accessible-web-apps-wcag-2.2-guide",
    excerpt: "学习如何构建符合 WCAG 2.2 标准的可访问性 Web 应用。",
    content: `# 构建可访问的 Web 应用

可访问性是现代 Web 开发的重要考量。

## WCAG 2.2 核心原则

1. **可感知**：信息必须以用户可以感知的方式呈现
2. **可操作**：界面组件必须是可操作的
3. **可理解**：信息和界面操作必须是可理解的
4. **健壮**：内容必须足够健壮

\`\`\`css
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
\`\`\`

> 可访问性不是功能，而是需求。
`,
    category: "用户体验",
    tags: ["可访问性", "WCAG", "用户体验"],
    date: "2026-04-20",
    readTime: "14 分钟",
    views: 670,
    featured: false,
  },
]

// GitHub 项目数据（真实）
export const projects = [
  {
    id: 1,
    title: "LC-StudyLab",
    description:
      "完整演示 LangChain v1.0 全家桶能力的开源项目，整合了 LangGraph、DeepAgents、RAG 检索增强生成、Guardrails 安全校验与流式输出智能体等核心特性。",
    tags: ["Python", "LangChain", "RAG", "AI"],
    github: "https://github.com/leonyangdev/lc-studylab",
    demo: "",
    stars: 345,
    featured: true,
  },
  {
    id: 2,
    title: "UltimateRAG",
    description:
      "按路线图逐步实现的 RAG 学习项目：从 Naive RAG → Advanced RAG → Agentic RAG → GraphRAG & Fine-tuning → RAGOps，在本地用 LangChain + 向量库把文档问答跑通。",
    tags: ["Python", "RAG", "LangChain", "AI"],
    github: "https://github.com/leonyangdev/UltimateRAG",
    demo: "",
    stars: 196,
    featured: true,
  },
  {
    id: 3,
    title: "miniprogram-i18n-plus",
    description: "小程序国际化插件，支持多语言切换和动态加载语言包。",
    tags: ["TypeScript", "小程序", "i18n"],
    github: "https://github.com/leonyangdev/miniprogram-i18n-plus",
    demo: "",
    stars: 38,
    featured: false,
  },
  {
    id: 4,
    title: "build-your-own-vue3",
    description: "从 0 到 1 实现一个 Vue3.x 源码，深入理解 Vue3 响应式原理和虚拟 DOM。",
    tags: ["TypeScript", "Vue.js", "源码"],
    github: "https://github.com/leonyangdev/build-your-own-vue3",
    demo: "",
    stars: 9,
    featured: false,
  },
  {
    id: 5,
    title: "digit-recognizer",
    description: "手写数字识别 — 从零实现两层神经网络（纯 numpy），理解深度学习基础。",
    tags: ["Python", "NumPy", "机器学习"],
    github: "https://github.com/leonyangdev/digit-recognizer",
    demo: "",
    stars: 4,
    featured: false,
  },
]

export const categories = [
  { name: "前端框架", count: 12, slug: "frontend-frameworks" },
  { name: "CSS 框架", count: 8, slug: "css-frameworks" },
  { name: "编程语言", count: 15, slug: "programming-languages" },
  { name: "性能优化", count: 6, slug: "performance-optimization" },
  { name: "用户体验", count: 9, slug: "user-experience" },
  { name: "开发工具", count: 11, slug: "development-tools" },
]

export const tags = [
  { name: "Next.js", count: 18 },
  { name: "React", count: 25 },
  { name: "TypeScript", count: 22 },
  { name: "Tailwind CSS", count: 15 },
  { name: "性能优化", count: 12 },
  { name: "用户体验", count: 10 },
  { name: "Node.js", count: 14 },
  { name: "AI", count: 8 },
  { name: "RAG", count: 6 },
  { name: "LangChain", count: 5 },
]

export function getLatestPosts(count: number = 3) {
  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

export function getFeaturedPosts() {
  return posts.filter((post) => post.featured)
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured)
}

export function getPostsByCategory(categorySlug: string) {
  return posts.filter(
    (post) =>
      post.category.toLowerCase().replace(/\s+/g, "-") === categorySlug
  )
}

export function getPostsByTag(tagName: string) {
  return posts.filter((post) =>
    post.tags.some((tag) => tag.toLowerCase() === tagName.toLowerCase())
  )
}

export function searchPosts(query: string) {
  const lowerQuery = query.toLowerCase()
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}
