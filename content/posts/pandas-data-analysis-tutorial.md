---
title: "Pandas 数据分析实战：从数据清洗到可视化"
date: "2026-04-20"
category: "AI 基础"
tags: ["Pandas", "Python", "数据分析", "数据可视化"]
excerpt: "使用 Pandas 进行数据清洗、转换和分析的完整实战指南，包含丰富的代码示例。"
featured: false
views: 2340
---

# Pandas 数据分析实战：从数据清洗到可视化

Pandas 是 Python 数据分析的核心工具，掌握它是 AI 工程师的必备技能。

## DataFrame 基础

```python
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
```

## 数据清洗

```python
# 处理缺失值
df.dropna()                    # 删除含缺失值的行
df.fillna(0)                   # 用 0 填充
df['age'].fillna(df['age'].mean())  # 用平均值填充

# 数据类型转换
df['date'] = pd.to_datetime(df['date'])

# 去重
df.drop_duplicates()
```

## 数据分析

```python
# 分组统计
city_stats = df.groupby('city').agg({
    'salary': ['mean', 'max', 'min'],
    'name': 'count'
})

# 相关性分析
correlation = df[['age', 'salary']].corr()
```

## 数据可视化

```python
import matplotlib.pyplot as plt

# 绘制柱状图
df.groupby('city')['salary'].mean().plot(kind='bar')
plt.title('各城市平均薪资')
plt.ylabel('薪资')
plt.show()
```

> Pandas 让数据分析变得简单而高效。
