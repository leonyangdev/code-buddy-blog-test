---
title: "NumPy 入门指南：AI 工程师必备的数据处理基础"
date: "2026-05-02"
category: "AI 基础"
tags: ["NumPy", "Python", "数据处理", "AI"]
excerpt: "掌握 NumPy 的核心概念和常用操作，为深度学习打下坚实的数据处理基础。"
featured: false
views: 1890
---

# NumPy 入门指南：AI 工程师必备的数据处理基础

NumPy 是 Python 科学计算的基础库，也是学习机器学习的必经之路。

## 为什么需要 NumPy？

```python
import numpy as np

# Python 列表 vs NumPy 数组
python_list = [1, 2, 3, 4, 5]
numpy_array = np.array([1, 2, 3, 4, 5])

# NumPy 的优势：向量化操作
result = numpy_array * 2  # [2, 4, 6, 8, 10]
```

## 核心概念

### 数组创建

```python
# 常用创建方式
zeros = np.zeros((3, 4))
ones = np.ones((2, 3))
random = np.random.randn(3, 3)
arange = np.arange(0, 10, 2)
linspace = np.linspace(0, 1, 5)
```

### 数组操作

```python
# 形状操作
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr.shape)      # (2, 3)
print(arr.reshape(3, 2))  # 改变形状
print(arr.T)           # 转置
```

### 数学运算

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(np.dot(a, b))    # 点积: 32
print(np.cross(a, b))  # 叉积
print(np.sum(a))       # 求和: 6
print(np.mean(a))      # 平均值: 2.0
```

## 与深度学习的关系

NumPy 的数组操作思想直接延伸到 PyTorch 的 Tensor 操作：

```python
import torch

# NumPy 到 PyTorch
np_array = np.array([1, 2, 3])
torch_tensor = torch.from_numpy(np_array)
```

> 掌握 NumPy，就掌握了 AI 数据处理的通用语言。
