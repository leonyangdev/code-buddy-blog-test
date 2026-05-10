---
title: "Transformer 架构详解：从 Attention 到 GPT"
date: "2026-04-28"
category: "深度学习"
tags: ["Transformer", "Attention", "深度学习", "NLP"]
excerpt: "深入理解 Transformer 架构的核心原理，包括 Self-Attention、Multi-Head Attention 和位置编码。"
featured: true
views: 4560
---

# Transformer 架构详解：从 Attention 到 GPT

Transformer 是现代 AI 的基石，理解它对于学习 LLM 至关重要。

## Self-Attention 机制

```python
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
```

## Multi-Head Attention

```python
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
```

## 关键创新

1. **并行计算**：相比 RNN，Transformer 可以并行处理序列
2. **长距离依赖**：Attention 机制直接建立任意位置间的连接
3. **位置编码**：通过位置编码保留序列顺序信息

> Transformer 的出现，开启了大语言模型的新时代。
