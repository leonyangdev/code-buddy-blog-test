/**
 * 示例文章数据
 */
export const posts = [
  {
    id: 1,
    title: "Next.js 16 新特性解析：App Router 的全面升级",
    slug: "nextjs-16-app-router-upgrade",
    excerpt: "深入探讨 Next.js 16 带来的 App Router 改进，包括性能优化、开发体验提升和新的 API 设计。",
    content: "Next.js 16 带来了许多令人兴奋的新特性...",
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
    content: "Tailwind CSS 4.0 引入了革命性的变化...",
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
    content: "TypeScript 6.0 的类型系统更加完善...",
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
    content: "React Server Components 改变了我们构建应用的方式...",
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
    content: "性能优化是 Web 开发的重要课题...",
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
    content: "可访问性是现代 Web 开发的重要考量...",
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
 * @param count 获取数量
 * @returns 最新文章数组
 */
export function getLatestPosts(count: number = 3) {
  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

/**
 * 获取精选文章
 * @returns 精选文章数组
 */
export function getFeaturedPosts() {
  return posts.filter((post) => post.featured)
}

/**
 * 获取精选项目
 * @returns 精选项目数组
 */
export function getFeaturedProjects() {
  return projects.filter((project) => project.featured)
}

/**
 * 根据分类获取文章
 * @param categorySlug 分类 slug
 * @returns 文章数组
 */
export function getPostsByCategory(categorySlug: string) {
  return posts.filter((post) => 
    post.category.toLowerCase().replace(/\s+/g, "-") === categorySlug
  )
}

/**
 * 根据标签获取文章
 * @param tagName 标签名称
 * @returns 文章数组
 */
export function getPostsByTag(tagName: string) {
  return posts.filter((post) => 
    post.tags.some((tag) => tag.toLowerCase() === tagName.toLowerCase())
  )
}

/**
 * 搜索文章
 * @param query 搜索关键词
 * @returns 匹配的文章数组
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