---
title: MathJax 数学公式演示
date: 2026-08-12 14:20:00
categories: [featTest]
tags: [MathJax, 数学]
timeline: article
mathjax: true
---

主题通过配置 `mathjax: true` 加载 MathJax，支持行内与块级公式。

## 行内公式

质能方程 $E = mc^2$ 是物理学中最著名的公式之一；黄金分割比 $\varphi = \dfrac{1+\sqrt{5}}{2} \approx 1.618$ 常见于设计之中。

## 块级公式

高斯积分：

$$
\int_{-\infty}^{\infty} e^{-x^2} \, \mathrm{d}x = \sqrt{\pi}
$$

欧拉恒等式：

$$
e^{i\pi} + 1 = 0
$$

## 矩阵与方程组

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\begin{pmatrix}
x \\ y
\end{pmatrix}
=
\begin{pmatrix}
1 \\ 0
\end{pmatrix}
$$

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

## 多行推导

$$
\begin{aligned}
(a+b)^2 &= a^2 + 2ab + b^2 \\
(a-b)^2 &= a^2 - 2ab + b^2
\end{aligned}
$$

> 提示：MathJax 从 CDN 按需加载，主题生成的 CSP 会自动放行对应域名，无需手动配置。
