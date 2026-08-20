---
title: Markdown 基础排版测试
date: 2026-08-10 09:30:00
categories: [baseTest]
tags: [Markdown, 排版]
timeline: article
---

本文覆盖 Hexo + Tranquility 的基础排版：标题、列表、表格、引用、图片与代码高亮。

## 文本样式

**粗体**、*斜体*、~~删除线~~、`行内代码`，以及[站内链接](/posts/hello-tranquility/)与[外部链接](https://hexo.io)。

## 引用

> 引用可以有多行：
>
> 第二行引用文字。
> > 嵌套引用。

## 列表

无序列表：

- 特性一
- 特性二
  - 嵌套项
- 特性三

有序列表：

1. 安装主题
2. 修改配置
3. 重新生成

## 表格

| 对齐 | 左 | 中 | 右 |
| --- | :-- | :-: | --: |
| 示例 | a | b | c |
| 示例 | 1 | 2 | 3 |

## 图片

![主题 Logo](/images/logo.svg)

## 代码高亮

JavaScript：

```javascript
// 代码块标题：防抖
function debounce(fn, wait = 200) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}
```

Python：

```python
def fib(n: int):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

Shell：

```bash
hexo clean && hexo generate && hexo server
```

YAML：

```yaml
theme_config:
  announcement:
    enable: true
    content: 欢迎访问演示站
```

## 分割线

---

以上就是全部基础排版元素。
