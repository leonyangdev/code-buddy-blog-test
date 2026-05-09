/**
 * 博客数据 — 基于真实 GitHub 信息
 */

// GitHub 用户信息
export const githubProfile = {
  username: "leonyangdev",
  name: "兰亭古墨",
  bio: "高级前端开发工程师 | AI 全栈工程师 | 正在深入学习人工智能",
  location: "ShenZhen, CHINA",
  avatarUrl: "/avatar.png",
  email: "leonyangdev@gmail.com",
  twitter: "leonyangdev",
  twitterUrl: "https://x.com/leonyangdev",
  githubUrl: "https://github.com/leonyangdev",
  publicRepos: 152,
  followers: 18,
  following: 71,
  totalStars: 597,
  memberSince: "2017",
  education: {
    school: "东华理工大学",
    major: "计算机科学与技术",
    degree: "本科",
  },
  yearsOfExperience: 9,
}

export const posts = [
  {
    id: 1,
    title: "从零开始学 Python：前端工程师的 AI 转型之路",
    slug: "python-for-frontend-engineers-ai-transition",
    excerpt: "作为一个有 9 年经验的前端工程师，分享我学习 Python 和转向 AI 领域的心路历程和实践经验。",
    content: `# 从零开始学 Python：前端工程师的 AI 转型之路

作为一个有 9 年经验的前端开发工程师，我决定将职业方向转向 AI 全栈。这篇文章记录我的学习路径。

## 为什么选择 Python？

\`\`\`python
# Python 的简洁语法让我想起了 JavaScript 的优雅
def greet(name: str) -> str:
    return f"Hello, {name}! Welcome to AI world."

print(greet("Developer"))
\`\`\`

## 前端工程师的优势

- **工程化思维**：模块化、组件化的思想同样适用于 ML 项目
- **调试能力**：Chrome DevTools 的经验帮助我理解 Python 调试
- **API 设计**：前后端分离的经验对构建 AI 服务很有帮助

## 学习路线

1. Python 基础语法和数据结构
2. NumPy 和 Pandas 数据处理
3. 机器学习基础概念
4. 深度学习框架（PyTorch）
5. LLM 应用开发（LangChain、RAG）

> 转型不是放弃过去，而是在已有基础上扩展新的能力。
`,
    category: "AI 学习",
    tags: ["Python", "AI", "职业转型"],
    date: "2026-05-08",
    readTime: "10 分钟",
    views: 2850,
    featured: true,
  },
  {
    id: 2,
    title: "LangChain 实战：构建你的第一个 RAG 应用",
    slug: "langchain-rag-tutorial",
    excerpt: "手把手教你使用 LangChain 构建检索增强生成（RAG）应用，从文档加载到智能问答。",
    content: `# LangChain 实战：构建你的第一个 RAG 应用

RAG（Retrieval-Augmented Generation）是当前最实用的 LLM 应用模式之一。

## 什么是 RAG？

RAG 结合了检索和生成两个步骤：
1. 从知识库中检索相关文档
2. 将检索结果作为上下文传递给 LLM
3. LLM 基于上下文生成回答

\`\`\`python
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

# 加载文档
loader = TextLoader("knowledge.txt")
documents = loader.load()

# 文本分割
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
docs = text_splitter.split_documents(documents)

# 创建向量数据库
vectorstore = FAISS.from_documents(docs, OpenAIEmbeddings())
\`\`\`

## 关键组件

| 组件 | 作用 | 常用选择 |
|------|------|----------|
| Document Loader | 加载数据源 | TextLoader, PDFLoader |
| Text Splitter | 分割文本 | RecursiveCharacterTextSplitter |
| Embeddings | 文本向量化 | OpenAI, HuggingFace |
| Vector Store | 存储向量 | FAISS, Chroma, Pinecone |

## 实际应用场景

- 企业知识库问答
- 文档智能助手
- 客服自动化
- 技术文档搜索

> RAG 让 LLM 能够基于最新、最准确的信息回答问题。
`,
    category: "AI 应用",
    tags: ["LangChain", "RAG", "Python", "LLM"],
    date: "2026-05-05",
    readTime: "15 分钟",
    views: 3200,
    featured: true,
  },
  {
    id: 3,
    title: "NumPy 入门指南：AI 工程师必备的数据处理基础",
    slug: "numpy-basics-for-ai-engineers",
    excerpt: "掌握 NumPy 的核心概念和常用操作，为深度学习打下坚实的数据处理基础。",
    content: `# NumPy 入门指南：AI 工程师必备的数据处理基础

NumPy 是 Python 科学计算的基础库，也是学习机器学习的必经之路。

## 为什么需要 NumPy？

\`\`\`python
import numpy as np

# Python 列表 vs NumPy 数组
python_list = [1, 2, 3, 4, 5]
numpy_array = np.array([1, 2, 3, 4, 5])

# NumPy 的优势：向量化操作
result = numpy_array * 2  # [2, 4, 6, 8, 10]
\`\`\`

## 核心概念

### 数组创建

\`\`\`python
# 常用创建方式
zeros = np.zeros((3, 4))
ones = np.ones((2, 3))
random = np.random.randn(3, 3)
arange = np.arange(0, 10, 2)
linspace = np.linspace(0, 1, 5)
\`\`\`

### 数组操作

\`\`\`python
# 形状操作
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr.shape)      # (2, 3)
print(arr.reshape(3, 2))  # 改变形状
print(arr.T)           # 转置
\`\`\`

### 数学运算

\`\`\`python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(np.dot(a, b))    # 点积: 32
print(np.cross(a, b))  # 叉积
print(np.sum(a))       # 求和: 6
print(np.mean(a))      # 平均值: 2.0
\`\`\`

## 与深度学习的关系

NumPy 的数组操作思想直接延伸到 PyTorch 的 Tensor 操作：

\`\`\`python
import torch

# NumPy 到 PyTorch
np_array = np.array([1, 2, 3])
torch_tensor = torch.from_numpy(np_array)
\`\`\`

> 掌握 NumPy，就掌握了 AI 数据处理的通用语言。
`,
    category: "AI 基础",
    tags: ["NumPy", "Python", "数据处理", "AI"],
    date: "2026-05-02",
    readTime: "12 分钟",
    views: 1890,
    featured: false,
  },
  {
    id: 4,
    title: "Transformer 架构详解：从 Attention 到 GPT",
    slug: "transformer-architecture-deep-dive",
    excerpt: "深入理解 Transformer 架构的核心原理，包括 Self-Attention、Multi-Head Attention 和位置编码。",
    content: `# Transformer 架构详解：从 Attention 到 GPT

Transformer 是现代 AI 的基石，理解它对于学习 LLM 至关重要。

## Self-Attention 机制

\`\`\`python
import torch
import torch.nn.functional as F

def self_attention(Q, K, V):
    # 计算注意力分数
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / torch.sqrt(torch.tensor(d_k, dtype=torch.float32))

    # Softmax 归一化
    attention_weights = F.softmax(scores, dim=-1)

    # 加权求和
    output = torch.matmul(attention_weights, V)
    return output, attention_weights
\`\`\`

## Multi-Head Attention

\`\`\`python
class MultiHeadAttention(torch.nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.num_heads = num_heads
        self.d_k = d_model // num_heads

        self.W_q = torch.nn.Linear(d_model, d_model)
        self.W_k = torch.nn.Linear(d_model, d_model)
        self.W_v = torch.nn.Linear(d_model, d_model)
        self.W_o = torch.nn.Linear(d_model, d_model)

    def forward(self, Q, K, V):
        batch_size = Q.size(0)

        # 线性变换并分头
        Q = self.W_q(Q).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(K).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(V).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)

        # 计算注意力
        attn_output, _ = self_attention(Q, K, V)

        # 拼接并输出
        attn_output = attn_output.transpose(1, 2).contiguous().view(batch_size, -1, self.num_heads * self.d_k)
        return self.W_o(attn_output)
\`\`\`

## 关键创新

1. **并行计算**：相比 RNN，Transformer 可以并行处理序列
2. **长距离依赖**：Attention 机制直接建立任意位置间的连接
3. **位置编码**：通过位置编码保留序列顺序信息

> Transformer 的出现，开启了大语言模型的新时代。
`,
    category: "深度学习",
    tags: ["Transformer", "Attention", "深度学习", "NLP"],
    date: "2026-04-28",
    readTime: "20 分钟",
    views: 4560,
    featured: true,
  },
  {
    id: 5,
    title: "Agentic RAG：下一代智能检索系统",
    slug: "agentic-rag-next-gen-retrieval",
    excerpt: "探索 Agentic RAG 的设计理念和实现方式，让 AI Agent 自主决定何时、如何检索信息。",
    content: `# Agentic RAG：下一代智能检索系统

传统 RAG 是"检索-生成"的固定流程，而 Agentic RAG 让 AI Agent 自主决策。

## 传统 RAG 的局限

- 固定的检索策略
- 无法处理复杂查询
- 缺乏推理和规划能力

## Agentic RAG 架构

\`\`\`python
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain.tools import Tool
from langchain_openai import ChatOpenAI

# 定义工具
tools = [
    Tool(
        name="search_knowledge_base",
        func=search_vectorstore,
        description="搜索知识库获取相关信息"
    ),
    Tool(
        name="query_database",
        func=query_sql_db,
        description="查询数据库获取结构化数据"
    ),
    Tool(
        name="call_api",
        func=call_external_api,
        description="调用外部 API 获取实时信息"
    ),
]

# 创建 Agent
llm = ChatOpenAI(model="gpt-4")
agent = create_openai_tools_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools)

# Agent 自主决策
result = agent_executor.invoke({
    "input": "分析最近一个月的销售趋势并给出建议"
})
\`\`\`

## 关键特性

| 特性 | 传统 RAG | Agentic RAG |
|------|----------|-------------|
| 检索策略 | 固定 | 动态决策 |
| 工具使用 | 单一 | 多工具协调 |
| 推理能力 | 有限 | 深度推理 |
| 错误处理 | 简单 | 自我纠正 |

## 应用场景

- 复杂的多步骤研究任务
- 需要多数据源整合的分析
- 自动化工作流

> Agentic RAG 代表了 AI 应用从"工具"到"助手"的进化。
`,
    category: "AI 应用",
    tags: ["Agentic RAG", "LangChain", "Agent", "LLM"],
    date: "2026-04-25",
    readTime: "18 分钟",
    views: 3890,
    featured: true,
  },
  {
    id: 6,
    title: "Pandas 数据分析实战：从数据清洗到可视化",
    slug: "pandas-data-analysis-tutorial",
    excerpt: "使用 Pandas 进行数据清洗、转换和分析的完整实战指南，包含丰富的代码示例。",
    content: `# Pandas 数据分析实战：从数据清洗到可视化

Pandas 是 Python 数据分析的核心工具，掌握它是 AI 工程师的必备技能。

## DataFrame 基础

\`\`\`python
import pandas as pd
import numpy as np

# 创建 DataFrame
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'age': [25, 30, 35, 28],
    'city': ['Beijing', 'Shanghai', 'Shenzhen', 'Guangzhou'],
    'salary': [15000, 20000, 25000, 18000]
}
df = pd.DataFrame(data)
print(df)
\`\`\`

## 数据清洗

\`\`\`python
# 处理缺失值
df.dropna()                    # 删除含缺失值的行
df.fillna(0)                   # 用 0 填充
df['age'].fillna(df['age'].mean())  # 用平均值填充

# 数据类型转换
df['date'] = pd.to_datetime(df['date'])

# 去重
df.drop_duplicates()
\`\`\`

## 数据分析

\`\`\`python
# 分组统计
city_stats = df.groupby('city').agg({
    'salary': ['mean', 'max', 'min'],
    'name': 'count'
})

# 相关性分析
correlation = df[['age', 'salary']].corr()
\`\`\`

## 数据可视化

\`\`\`python
import matplotlib.pyplot as plt

# 绘制柱状图
df.groupby('city')['salary'].mean().plot(kind='bar')
plt.title('各城市平均薪资')
plt.ylabel('薪资')
plt.show()
\`\`\`

> Pandas 让数据分析变得简单而高效。
`,
    category: "AI 基础",
    tags: ["Pandas", "Python", "数据分析", "数据可视化"],
    date: "2026-04-20",
    readTime: "16 分钟",
    views: 2340,
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

// Categories computed from posts
const categoryMap = new Map<string, number>()
posts.forEach((post) => {
  categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1)
})
export const categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
  name,
  count,
  slug: name.toLowerCase().replace(/\s+/g, "-"),
}))

// Tags computed from posts
const tagMap = new Map<string, number>()
posts.forEach((post) => {
  post.tags.forEach((tag) => {
    tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
  })
})
export const tags = Array.from(tagMap.entries())
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => b.count - a.count)

export function getLatestPosts(count: number = 3) {
  return [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

export function getFeaturedPosts() {
  return posts.filter((post) => post.featured)
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured)
}

// Database-backed functions (with fallback to hardcoded data)
export async function getPostsFromDB(count?: number) {
  try {
    const { prisma } = await import("./prisma")
    const dbPosts = await prisma.post.findMany({
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
    // Fallback to hardcoded data if DB not available
    const sorted = [...posts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    return count ? sorted.slice(0, count) : sorted
  }
}

export async function getPostBySlugFromDB(slug: string) {
  try {
    const { prisma } = await import("./prisma")
    const p = await prisma.post.findUnique({
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
    return posts.find((p) => p.slug === slug) || null
  }
}

export async function incrementViews(slug: string) {
  try {
    const { prisma } = await import("./prisma")
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
    const { prisma } = await import("./prisma")
    const result = await prisma.post.groupBy({
      by: ["category"],
      _count: { id: true },
    })
    return result.map((r) => ({
      name: r.category,
      count: r._count.id,
      slug: r.category.toLowerCase().replace(/\s+/g, "-"),
    }))
  } catch {
    return categories
  }
}

export async function getTagsFromDB() {
  try {
    const { prisma } = await import("./prisma")
    const result = await prisma.tag.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { posts: { _count: "desc" } },
    })
    return result.map((t) => ({
      name: t.name,
      count: t._count.posts,
    }))
  } catch {
    return tags
  }
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
