# 博客全面重构计划 — Vercel Geist Design System

## 一、问题诊断总览

### 1. 色彩系统违反
- **硬编码颜色泛滥**：`bg-yellow-500`, `text-blue-500`, `text-green-500`, `text-purple-500`, `text-white`, `bg-green-500` 等直接出现在组件中
- **`bg-accent` 误用**：多处使用 `bg-accent` 作为背景色，但 accent 是高饱和度蓝色，不适合做大面积背景
- **渐变硬编码**：`from-primary to-secondary` 在 avatar 和 about 页面中硬编码

### 2. 边框 vs 材质系统
- **边框滥用**：大量 `border border-border` 硬边框，违反 Geist 的"拟玻璃化"原则
- **缺少 backdrop-blur**：除 Header 外，几乎没有使用毛玻璃效果
- **阴影不一致**：`shadow-sm`, `hover:shadow-lg` 混用，缺乏统一的多层微阴影体系

### 3. 排版系统不一致
- **混用方式**：首页使用 `text-heading-72` 等自定义类，但 blog/page.tsx 直接用 `text-3xl font-bold`
- **about/contact/projects 页面完全未使用自定义排版类**
- **标题层级混乱**：同一页面出现 `text-3xl`, `text-2xl`, `text-lg` 等多种大小定义方式

### 4. 间距系统碎片化
- **无统一间距节奏**：`gap-4`, `gap-6`, `gap-8`, `space-y-4`, `space-y-6`, `space-y-8`, `space-y-24` 随意混用
- **section 间距不一致**：首页用 `space-y-24`，其他页面用 `space-y-8`
- **卡片内间距**：`p-6`, `p-8`, `pt-6`, `px-4` 各不相同

### 5. 组件使用不一致
- **Card border 冲突**：Card 组件已经使用 `ring-1 ring-foreground/10`，但很多页面又手动加 `border border-border`
- **Badge 样式不统一**：精选 badge 在首页用 `bg-accent text-accent-foreground`，在 blog 页用 `bg-yellow-500 hover:bg-yellow-600`
- **Button 使用方式混乱**：部分用 `<Link className={buttonVariants()}>`，部分用 `<Button>`

### 6. 布局结构问题
- **Hero 区域过于庞大**：`min-h-[90vh]` 占据过多空间，统计数字重复出现（Hero 内一次 + 内容区一次）
- **首页 fullWidth + container 混乱**：root layout 用 `fullWidth`，但内容区又手动加 `container`
- **侧边栏在 blog listing 和 blog post 中重复实现**，未复用 MainLayout 的 sidebar 功能

### 7. 交互与状态设计缺失
- **无 loading/error/empty 状态**：所有页面直接渲染数据，无 skeleton 或 fallback
- **无 focus-visible 管理**：自定义 input/textarea 缺少正确的焦点样式
- **自动播放动画**：首页 `animate-bounce` 的滚动提示违反"输入驱动"原则

---

## 二、重构计划（按执行顺序）

### Phase 1: 设计令牌系统重构 (globals.css)

**目标**：建立符合 Geist 原则的统一设计令牌

#### 1.1 色彩系统升级
```css
/* 将硬编码 hex 转为 oklch 色彩空间 */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.546 0.197 254.1);
  /* ... */
}
```

#### 1.2 新增语义化阴影令牌
```css
--shadow-xs: 0 1px 2px oklch(0 0 0 / 0.04);
--shadow-sm: 0 1px 3px oklch(0 0 0 / 0.06), 0 1px 2px oklch(0 0 0 / 0.04);
--shadow-md: 0 4px 6px oklch(0 0 0 / 0.06), 0 2px 4px oklch(0 0 0 / 0.04);
--shadow-card-hover: 0 8px 24px oklch(0 0 0 / 0.08), 0 2px 8px oklch(0 0 0 / 0.04);
```

#### 1.3 统一间距节奏
```css
/* 基于 4px 网格的间距令牌 */
--space-section: 6rem;    /* 96px - section 之间 */
--space-block: 3rem;      /* 48px - block 之间 */
--space-element: 1.5rem;  /* 24px - element 之间 */
--space-tight: 0.75rem;   /* 12px - 紧凑间距 */
```

#### 1.4 移除 globals.css 中的容器定义
容器配置应由 Tailwind config 或 layout 统一管理，不应在 CSS 层重复定义。

---

### Phase 2: 组件层重构

#### 2.1 Card 组件增强
- 移除所有页面中手动添加的 `border border-border rounded-lg shadow-sm`
- Card 本身已使用 `ring-1`，利用此特性统一卡片样式
- 添加 `variant` prop：`default` | `elevated` | `ghost`
- 添加 hover 状态的统一阴影过渡

#### 2.2 Badge 组件统一
- 移除所有硬编码颜色（`bg-yellow-500`, `bg-green-500` 等）
- 为"精选"标签创建语义化 variant：`featured`
- 统一使用 `text-label-12` 排版类

#### 2.3 Button 使用规范化
- 统一使用 `<Link className={buttonVariants()}>` 模式（因为项目使用 @base-ui/react）
- 确保所有交互元素有 `focus-visible` 样式
- CTA 按钮使用 `size="lg"` + 统一的 padding

#### 2.4 新增组件
- **`SectionHeading`**：统一的 section 标题 + 副标题 + "查看全部"链接组合
- **`StatCard`**：统一的统计数字卡片
- **`PostCard`**：提取博客文章卡片为独立组件
- **`ProjectCard`**：提取项目卡片为独立组件
- **`EmptyState`**：空状态组件
- **`LoadingSkeleton`**：加载骨架屏

---

### Phase 3: 布局层重构

#### 3.1 MainLayout 简化
- 移除 `fullWidth` 模式的特殊处理
- 统一由页面组件自行控制内容宽度
- 修复 sidebar grid 比例（当前 3:1 偏窄，考虑 7:3 或 5:2）

#### 3.2 Header 精简
- 保持 glassmorphism 效果，移除底部 border
- 使用 `shadow-sm` 替代 `border-b`
- 移动端菜单使用 `Sheet` 组件（已存在但未使用）

#### 3.3 Footer 瘦身
- 3 列布局 → 简洁的单行布局
- 移除冗余的"快速链接"（与 Header 重复）
- 保留版权信息 + 核心社交链接

---

### Phase 4: 页面级重构

#### 4.1 首页 (app/page.tsx)
**Hero 区域重构：**
- 减小高度：`min-h-[90vh]` → `min-h-[70vh]` 或基于内容自适应
- 添加 blueprint grid 背景（1px, 10-15% opacity）
- 移除底部 `animate-bounce` 滚动提示
- 统计数据区移到 Hero 外部，使用 `tabular-nums`

**内容区域重构：**
- 移除重复的统计卡片（Hero 内已有）
- 统一 section 间距为 `space-y-section`
- 文章卡片和项目卡片提取为独立组件
- 订阅区域改用拟玻璃化背景

#### 4.2 博客列表页 (app/blog/page.tsx)
- 排版统一使用 `text-heading-*` 类
- 移除 `border border-border`（Card 自带 ring）
- "精选" badge 使用语义化颜色
- 搜索框使用 shadcn `Input` 组件
- 使用 MainLayout 的 sidebar 功能而非手动 grid

#### 4.3 博客详情页 (app/blog/[slug]/page.tsx)
- 移除 Card 包裹文章内容的做法 → 使用干净的内容容器
- 文章内容区域使用优化的 prose 样式
- 标签区域移除硬边框，改用分隔线 + 间距
- 相关文章卡片统一使用 PostCard 组件
- 侧边栏使用 MainLayout 的 sidebar 功能

#### 4.4 关于页面 (app/about/page.tsx)
- 全面使用 `text-heading-*` 和 `text-copy-*` 排版类
- 技术栈标签使用统一的 Badge 样式
- 工作经历时间线改用更精致的设计（移除 `border-l-2`）
- 移除所有硬编码颜色

#### 4.5 联系页面 (app/contact/page.tsx)
- 表单输入框使用 shadcn `Input` 和 `Textarea` 组件
- 成功状态的绿色图标改用 `text-primary` 语义色
- 社交媒体链接区域改用更紧凑的卡片设计

#### 4.6 项目页面 (app/projects/page.tsx)
- 统计卡片移除硬编码颜色（`text-blue-500`, `text-yellow-500` 等）
- 项目卡片使用统一的 ProjectCard 组件
- "精选" badge 统一样式

---

### Phase 5: 响应式与状态设计

#### 5.1 响应式优化
- 移动端：单列布局，增大触控目标（min 44px）
- 平板：2 列网格
- 桌面：3 列网格 + 侧边栏
- 4K：限制最大内容宽度

#### 5.2 状态设计
- 为空列表设计 EmptyState
- 为数据加载设计 Skeleton 屏
- 为错误状态设计 ErrorBoundary
- 为表单提交状态设计 loading/success/error 反馈

#### 5.3 焦点管理
- 所有交互元素添加 `focus-visible:ring-2 focus-visible:ring-ring/50`
- 表单输入框使用 `Input` 组件的内置焦点样式
- 跳过导航链接（Skip to content）

---

## 三、执行优先级

| 优先级 | 任务 | 影响范围 | 工作量 |
|--------|------|----------|--------|
| P0 | 色彩系统 oklch 迁移 | 全站 | 中 |
| P0 | 移除硬编码颜色 | 全站 | 中 |
| P1 | 排版系统统一 | 全站 | 中 |
| P1 | Card/Badge 组件统一 | 全站 | 小 |
| P1 | 间距系统统一 | 全站 | 中 |
| P2 | 首页 Hero 重构 | 首页 | 大 |
| P2 | 提取 PostCard/ProjectCard | 多页 | 中 |
| P2 | Header/Footer 精简 | 全站 | 小 |
| P3 | 状态设计 (empty/loading/error) | 全站 | 大 |
| P3 | 响应式优化 | 全站 | 中 |
| P3 | 焦点管理与无障碍 | 全站 | 中 |

---

## 四、文件变更清单

### 新增文件
- `components/blog/post-card.tsx` — 统一的博客文章卡片
- `components/blog/project-card.tsx` — 统一的项目卡片
- `components/layout/section-heading.tsx` — Section 标题组合
- `components/ui/stat-card.tsx` — 统计数字卡片
- `components/ui/empty-state.tsx` — 空状态组件
- `components/ui/skeleton-card.tsx` — 卡片骨架屏

### 修改文件
- `app/globals.css` — 色彩系统 + 间距令牌 + 移除容器定义
- `styles/responsive.css` — 响应式优化
- `components/layout/header.tsx` — 精简 + Sheet 移动菜单
- `components/layout/footer.tsx` — 瘦身
- `components/layout/main-layout.tsx` — 简化布局逻辑
- `components/layout/sidebar.tsx` — 样式统一
- `components/ui/card.tsx` — 添加 variant prop
- `components/ui/badge.tsx` — 添加 featured variant
- `app/page.tsx` — Hero + 内容区全面重构
- `app/blog/page.tsx` — 列表页重构
- `app/blog/[slug]/page.tsx` — 详情页重构
- `app/about/page.tsx` — 排版 + 样式统一
- `app/contact/page.tsx` — 表单组件化
- `app/projects/page.tsx` — 样式统一
