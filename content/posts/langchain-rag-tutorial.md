---
title: "LangChain 实战：构建你的第一个 RAG 应用"
date: "2026-05-05"
category: "AI 应用"
tags: ["LangChain", "RAG", "Python", "LLM"]
excerpt: "手把手教你使用 LangChain 构建检索增强生成（RAG）应用，从文档加载到智能问答。"
featured: true
views: 3200
---

# LangChain 实战：构建你的第一个 RAG 应用

RAG（Retrieval-Augmented Generation）是当前最实用的 LLM 应用模式之一。

## 什么是 RAG？

RAG 结合了检索和生成两个步骤：
1. 从知识库中检索相关文档
2. 将检索结果作为上下文传递给 LLM
3. LLM 基于上下文生成回答

```python
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
```

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
