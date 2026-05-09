import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const postsData = [
  {
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

- 已有编程基础，学 Python 很快
- 理解异步编程，Python 的 asyncio 很容易上手
- API 设计经验可以直接迁移到 AI 应用开发

## 学习路线

1. Python 基础语法和数据结构
2. NumPy 和 Pandas 数据处理
3. 机器学习基础概念
4. 深度学习框架（PyTorch）
5. LLM 应用开发（LangChain + RAG）

坚持学习，你也可以成为 AI 全栈工程师！`,
    category: "AI 学习",
    date: new Date("2026-05-08"),
    readTime: "10 分钟",
    views: 2850,
    featured: true,
    tags: ["Python", "AI", "职业转型"],
  },
  {
    title: "LangChain 实战：构建你的第一个 RAG 应用",
    slug: "langchain-rag-tutorial",
    excerpt: "手把手教你使用 LangChain 构建检索增强生成（RAG）应用，从文档加载到智能问答。",
    content: `# LangChain 实战：构建你的第一个 RAG 应用

RAG（Retrieval-Augmented Generation）是当前最实用的 LLM 应用模式。

## 什么是 RAG？

RAG 通过检索相关文档来增强大语言模型的回答能力，让 AI 能够基于你的私有数据回答问题。

## 技术栈

- LangChain - LLM 应用框架
- OpenAI Embeddings - 文本向量化
- ChromaDB - 向量数据库
- FastAPI - 后端 API

## 实现步骤

1. 文档加载与分割
2. 向量化并存储
3. 检索相关文档
4. 生成回答

完整代码已开源在 GitHub。`,
    category: "AI 应用",
    date: new Date("2026-05-05"),
    readTime: "15 分钟",
    views: 3200,
    featured: true,
    tags: ["LangChain", "RAG", "AI"],
  },
  {
    title: "NumPy 入门指南：AI 工程师必备的数据处理基础",
    slug: "numpy-basics-for-ai-engineers",
    excerpt: "掌握 NumPy 的核心概念和常用操作，为深度学习打下坚实的数据处理基础。",
    content: `# NumPy 入门指南

NumPy 是 Python 科学计算的基础库，也是 AI/ML 的核心工具。

## 为什么学 NumPy？

- 比 Python 列表快 100 倍的数组运算
- 深度学习框架的底层基础
- 数据处理的瑞士军刀

## 核心概念

\`\`\`python
import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])

# 矩阵运算
matrix = np.array([[1, 2], [3, 4]])
result = np.dot(matrix, matrix.T)
\`\`\`

## 常用操作

1. 数组创建与索引
2. 广播机制
3. 线性代数运算
4. 随机数生成`,
    category: "AI 基础",
    date: new Date("2026-05-02"),
    readTime: "12 分钟",
    views: 1890,
    featured: false,
    tags: ["Python", "NumPy", "AI"],
  },
  {
    title: "Transformer 架构深度解析：从 Attention 到 GPT",
    slug: "transformer-architecture-deep-dive",
    excerpt: "深入理解 Transformer 架构的核心机制，从 Self-Attention 到位置编码，再到 GPT 的演进。",
    content: `# Transformer 架构深度解析

Transformer 是现代 AI 的基石，理解它是深入 AI 领域的关键。

## Self-Attention 机制

Self-Attention 让模型能够关注输入序列中的不同位置：

\`\`\`python
# Q, K, V 矩阵
Q = X @ W_Q  # Query
K = X @ W_K  # Key
V = X @ V_V  # Value

# Attention
attention = softmax(Q @ K.T / sqrt(d_k)) @ V
\`\`\`

## 位置编码

由于 Transformer 没有循环结构，需要位置编码来注入序列位置信息。

## 从 BERT 到 GPT

- BERT: 双向编码，适合理解任务
- GPT: 自回归生成，适合生成任务
- GPT-3/4: 规模化带来的涌现能力`,
    category: "深度学习",
    date: new Date("2026-04-28"),
    readTime: "20 分钟",
    views: 4100,
    featured: true,
    tags: ["Transformer", "AI", "深度学习"],
  },
  {
    title: "Agentic RAG：下一代智能检索系统",
    slug: "agentic-rag-next-gen-retrieval",
    excerpt: "探索 Agentic RAG 的设计理念和实现方式，让 AI 能够自主决定何时检索、检索什么。",
    content: `# Agentic RAG：下一代智能检索系统

传统 RAG 的局限性在于固定的检索流程，Agentic RAG 让 AI 自主决策。

## 核心理念

Agent 可以：
- 判断是否需要检索
- 选择检索策略
- 评估检索结果质量
- 决定是否需要多轮检索

## 技术实现

\`\`\`python
from langchain.agents import initialize_agent

# Agent 自主决定检索策略
agent = initialize_agent(
    tools=[search_tool, wiki_tool, db_tool],
    llm=gpt4,
    agent="react-description"
)
\`\`\`

## 应用场景

1. 复杂问答系统
2. 多文档综合分析
3. 智能客服
4. 研究助手`,
    category: "AI 应用",
    date: new Date("2026-04-25"),
    readTime: "18 分钟",
    views: 2950,
    featured: false,
    tags: ["Agent", "RAG", "LangChain"],
  },
  {
    title: "Pandas 数据分析实战：从清洗到可视化",
    slug: "pandas-data-analysis-tutorial",
    excerpt: "使用 Pandas 进行数据清洗、转换和分析的完整实战教程，附带可视化案例。",
    content: `# Pandas 数据分析实战

Pandas 是 Python 数据分析的核心工具。

## 基础操作

\`\`\`python
import pandas as pd

# 读取数据
df = pd.read_csv("data.csv")

# 数据清洗
df = df.dropna()
df = df[df["age"] > 0]

# 分组统计
result = df.groupby("category").agg({"sales": "sum"})
\`\`\`

## 数据清洗技巧

1. 处理缺失值
2. 数据类型转换
3. 异常值检测
4. 重复数据处理

## 可视化

配合 Matplotlib 和 Seaborn 进行数据可视化。`,
    category: "AI 基础",
    date: new Date("2026-04-20"),
    readTime: "14 分钟",
    views: 2200,
    featured: false,
    tags: ["Python", "Pandas", "数据分析"],
  },
]

const projectsData = [
  {
    title: "AI Knowledge Base",
    description: "基于 LangChain + RAG 的智能知识库系统，支持文档问答和知识管理。",
    tags: ["Python", "LangChain", "RAG", "AI"],
    github: "https://github.com/leonyangdev/ai-knowledge-base",
    demo: "",
    stars: 128,
    featured: true,
  },
  {
    title: "DevFlow",
    description: "开发者工作流工具集，集成 GitHub、Jira、Slack 等开发工具。",
    tags: ["TypeScript", "Next.js", "React"],
    github: "https://github.com/leonyangdev/devflow",
    demo: "https://devflow.vercel.app",
    stars: 89,
    featured: true,
  },
  {
    title: "Pixel UI",
    description: "基于 Tailwind CSS 的现代化 UI 组件库，支持亮色/暗色主题。",
    tags: ["TypeScript", "Tailwind CSS", "React"],
    github: "https://github.com/leonyangdev/pixel-ui",
    demo: "https://pixel-ui.vercel.app",
    stars: 234,
    featured: true,
  },
  {
    title: "ML Playground",
    description: "交互式机器学习实验平台，可视化训练过程和模型性能。",
    tags: ["Python", "PyTorch", "React"],
    github: "https://github.com/leonyangdev/ml-playground",
    demo: "",
    stars: 67,
    featured: false,
  },
  {
    title: "TypeWriter",
    description: "AI 驱动的写作助手，支持语法检查、风格优化和内容生成。",
    tags: ["TypeScript", "OpenAI", "Next.js"],
    github: "https://github.com/leonyangdev/typewriter",
    demo: "https://typewriter.vercel.app",
    stars: 45,
    featured: false,
  },
  {
    title: "CloudSync",
    description: "多云文件同步工具，支持 AWS S3、Google Cloud Storage 和 Azure Blob。",
    tags: ["Go", "AWS", "Docker"],
    github: "https://github.com/leonyangdev/cloudsync",
    demo: "",
    stars: 34,
    featured: false,
  },
]

async function main() {
  console.log("Seeding database...")

  // Clear existing data
  await prisma.postTag.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.post.deleteMany()

  // Create posts and tags
  for (const postData of postsData) {
    const { tags: tagNames, ...postFields } = postData

    const post = await prisma.post.create({
      data: postFields,
    })

    for (const tagName of tagNames) {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      })

      await prisma.postTag.create({
        data: {
          postId: post.id,
          tagId: tag.id,
        },
      })
    }
  }

  console.log(`Created ${postsData.length} posts`)
  console.log("Seeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
