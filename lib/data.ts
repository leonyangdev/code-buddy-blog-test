/**
 * 示例文章数据（支持 Markdown 内容）
 */
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

![Next.js Logo](https://nextjs.org/static/favicon/favicon-32x32.png)

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

### 组件示例

\`\`\`tsx
function Button({ children, variant = "default" }) {
  return (
    <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 transition-colors">
      {children}
    </button>
  )
}
\`\`\`

## 数学公式支持

行内公式：$E = mc^2$

块级公式：

$$
\\frac{n!}{k!(n-k)!} = \\binom{n}{k}
$$

## 最佳实践

- 使用语义化变量而非硬编码颜色
- 利用 \`@theme inline\` 定义设计令牌
- 组合使用 \`clsx\` 和 \`tailwind-merge\`
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

TypeScript 6.0 的类型系统更加完善，为开发者提供了更强大的类型安全。

## 条件类型

\`\`\`typescript
type IsString<T> = T extends string ? true : false

type A = IsString<"hello"> // true
type B = IsString<42>      // false
\`\`\`

## 映射类型

\`\`\`typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}

type Partial<T> = {
  [K in keyof T]?: T[K]
}
\`\`\`

## 模板字面量类型

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`

type ClickEvent = EventName<"click"> // "onClick"
type FocusEvent = EventName<"focus"> // "onFocus"
\`\`\`

## 实际应用

> 类型系统不仅仅是工具，它是你代码的第一道防线。

使用这些特性可以构建出更加安全和可维护的应用程序。
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
// 这是一个 Server Component
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

### 何时使用 Client Components

- 需要 \`useState\` 或 \`useEffect\`
- 需要浏览器 API
- 需要事件监听器
- 使用自定义 hooks

## 性能对比

| 指标 | 传统 CSR | RSC |
|------|----------|-----|
| FCP | 2.5s | 0.8s |
| TTI | 4.0s | 1.2s |
| JS 大小 | 250KB | 80KB |
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

- **LCP**（Largest Contentful Paint）：最大内容绘制
- **FID**（First Input Delay）：首次输入延迟
- **CLS**（Cumulative Layout Shift）：累积布局偏移

## 优化策略

### 加载性能

\`\`\`javascript
// 预加载关键资源
const link = document.createElement('link')
link.rel = 'preload'
link.as = 'image'
link.href = '/hero.webp'
document.head.appendChild(link)
\`\`\`

### 图片优化

使用现代图片格式和响应式图片：

\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="..." loading="lazy">
</picture>
\`\`\`

### 代码分割

> 好的性能不是一次性的工作，而是持续的过程。

## 工具推荐

- Lighthouse
- WebPageTest
- Chrome DevTools Performance tab
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
    excerpt: "学习如何构建符合 WCAG 2.2 标准的可访问性 Web 应用，让所有人都能使用。",
    content: `# 构建可访问的 Web 应用

可访问性是现代 Web 开发的重要考量。

## WCAG 2.2 核心原则

1. **可感知**：信息必须以用户可以感知的方式呈现
2. **可操作**：界面组件必须是可操作的
3. **可理解**：信息和界面操作必须是可理解的
4. **健壮**：内容必须足够健壮，能被各种用户代理解释

## 实践技巧

### 焦点管理

\`\`\`css
/* 使用 focus-visible 替代 focus */
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* 鼠标点击时不显示焦点环 */
button:focus:not(:focus-visible) {
  outline: none;
}
\`\`\`

### 语义化 HTML

\`\`\`html
<!-- 好的实践 -->
<nav aria-label="主导航">
  <ul>
    <li><a href="/">首页</a></li>
    <li><a href="/blog">博客</a></li>
  </ul>
</nav>

<!-- 不好的实践 -->
<div class="nav">
  <div class="link" onclick="...">首页</div>
</div>
\`\`\`

### 颜色对比度

确保文本和背景之间的对比度至少为 **4.5:1**（普通文本）或 **3:1**（大文本）。

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

/**
 * 示例项目数据
 */
export const projects = [
  {
    id: 1,
    title: "个人技术博客",
    description: "使用 Next.js 16、Tailwind CSS 4.0 和 shadcn/ui 构建的现代化技术博客。",
    image: "/projects/blog.jpg",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui"],
    github: "https://github.com/username/blog",
    demo: "https://blog.example.com",
    featured: true,
  },
  {
    id: 2,
    title: "任务管理应用",
    description: "一个功能齐全的任务管理应用，支持拖拽、标签、优先级和团队协作。",
    image: "/projects/task-manager.jpg",
    tags: ["React", "TypeScript", "DnD"],
    github: "https://github.com/username/task-manager",
    demo: "https://tasks.example.com",
    featured: true,
  },
  {
    id: 3,
    title: "UI 组件库",
    description: "基于 shadcn/ui 的自定义 UI 组件库，包含 50+ 可复用组件。",
    image: "/projects/ui-library.jpg",
    tags: ["shadcn/ui", "Radix UI", "Storybook"],
    github: "https://github.com/username/ui-library",
    demo: "https://ui.example.com",
    featured: false,
  },
  {
    id: 4,
    title: "API 网关服务",
    description: "高性能的 API 网关服务，支持负载均衡、缓存、限流和监控。",
    image: "/projects/api-gateway.jpg",
    tags: ["Node.js", "Express", "Redis"],
    github: "https://github.com/username/api-gateway",
    demo: "https://api.example.com",
    featured: false,
  },
]

/**
 * 示例分类数据
 */
export const categories = [
  { name: "前端框架", count: 12, slug: "frontend-frameworks" },
  { name: "CSS 框架", count: 8, slug: "css-frameworks" },
  { name: "编程语言", count: 15, slug: "programming-languages" },
  { name: "性能优化", count: 6, slug: "performance-optimization" },
  { name: "用户体验", count: 9, slug: "user-experience" },
  { name: "开发工具", count: 11, slug: "development-tools" },
]

/**
 * 示例标签数据
 */
export const tags = [
  { name: "Next.js", count: 18 },
  { name: "React", count: 25 },
  { name: "TypeScript", count: 22 },
  { name: "Tailwind CSS", count: 15 },
  { name: "性能优化", count: 12 },
  { name: "用户体验", count: 10 },
  { name: "Node.js", count: 14 },
  { name: "GraphQL", count: 8 },
]

/**
 * 获取最新文章
 */
export function getLatestPosts(count: number = 3) {
  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

/**
 * 获取精选文章
 */
export function getFeaturedPosts() {
  return posts.filter((post) => post.featured)
}

/**
 * 获取精选项目
 */
export function getFeaturedProjects() {
  return projects.filter((project) => project.featured)
}

/**
 * 根据分类获取文章
 */
export function getPostsByCategory(categorySlug: string) {
  return posts.filter((post) =>
    post.category.toLowerCase().replace(/\s+/g, "-") === categorySlug
  )
}

/**
 * 根据标签获取文章
 */
export function getPostsByTag(tagName: string) {
  return posts.filter((post) =>
    post.tags.some((tag) => tag.toLowerCase() === tagName.toLowerCase())
  )
}

/**
 * 搜索文章
 */
export function searchPosts(query: string) {
  const lowerQuery = query.toLowerCase()
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}
