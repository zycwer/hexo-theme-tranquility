<p align="center">
  <strong>中文</strong> · <a href="./README_EN.md">English</a>
</p>

<h1> <div align="center"><img align="center" height="40" src="source/images/tranquility.svg"/> 致远</div></h1>

<p align="center">一款为个人主页及多学科领域博主设计的 Hexo 主题</p>

<p align="center">
<a href="https://github.com/zycwer/hexo-theme-tranquility/releases"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/zycwer/hexo-theme-tranquility?label=release&color=orange"></a>
<a href="https://hexo.io/"><img src="https://img.shields.io/badge/Hexo-%3E%3D8.0.0-blue?logo=hexo"></a>
<a href="https://github.com/zycwer/hexo-theme-tranquility/blob/main/LICENSE"><img src="https://img.shields.io/github/license/zycwer/hexo-theme-tranquility"></a>

<img src="./doc/images/index-ios-3.jpg"/>
</p>

> **💡 Fork 说明**
>
> 本仓库是 [hooozen/hexo-theme-tranquility](https://github.com/hooozen/hexo-theme-tranquility) 的 fork。原仓库已于 2026 年 6 月归档、停止维护，本 fork 在其基础上持续维护并新增了以下特性：
>
> - 一言（Hitokoto）Slogan 开关
> - 文章驱动的时间线（取代配置文件事件）
> - Hexo 原生关于页（取代配置文件内容）
> - 构建时 RSS 聚合的「最近更新」卡片
> - 代码精简优化（scripts 目录 -23%）
> - 删除与关于页重复的简历（CV）功能
>
> 详见 [v1.4.0 Release](https://github.com/zycwer/hexo-theme-tranquility/releases/tag/v1.4.0)。

## 演示站

- [致远](https://theme.hozen.site/tranquility/)（原主题演示站）
- [浩然的主页](https://www.hozen.site)

## 特点

- 主页风格，聚焦个性展示
- 支持[纯个人主页模式](#站点模式)（不含文章，聚合外部博客 RSS）
- [“子页”设计](#子页)，适应多领域写作
- [最近更新](#最近更新rss-聚合)卡片，构建时聚合外部博客 RSS，国内加载稳定
- [关于页](#关于页)（Hexo 原生页面）、[时间线](#时间线)（文章驱动，点击进入详情）
- [一言（Hitokoto）](#一言slogan)Slogan，刷新随机切换
- [深色模式](#深色模式)（浅色/深色/定时/跟随浏览器，导航栏一键切换）
- [Open Graph](#open-graph--twitter-card) 社交分享卡片、[JSON-LD](#json-ld-结构化数据) 结构化数据、[站点地图](#站点地图)、[PWA](#pwa-可安装应用)
- 三端自适应，舒适阅读
- 自定义字体及提取压缩，兼具美观和性能
- [相关文章](#相关文章)、[数学公式](#数学公式)、[Gitalk 评论](#其他)、[赞赏](#文章赞赏)、[SEO](#其他)
- 等

 -----

## 目录

- [特点](#特点)
- [目录](#目录)
- [安装](#安装)
- [升级](#升级)
- [设计逻辑](#设计逻辑)
  - [改变](#改变)
- [配置](#配置)
  - [一言（Slogan）](#一言slogan)
  - [深色模式](#深色模式)
  - [站点模式](#站点模式)
  - [子页](#子页)
  - [时间线](#时间线)
  - [关于页](#关于页)
  - [最近更新（RSS 聚合）](#最近更新rss-聚合)
  - [Open Graph & Twitter Card](#open-graph--twitter-card)
  - [JSON-LD 结构化数据](#json-ld-结构化数据)
  - [站点地图](#站点地图)
  - [PWA（可安装应用）](#pwa可安装应用)
  - [代码高亮](#代码高亮)
  - [数学公式](#数学公式)
  - [首页自定义](#首页自定义)
  - [导航](#导航)
  - [页脚自定义](#页脚自定义)
  - [标签云](#标签云)
  - [文章封面](#文章封面)
  - [文章目录](#文章目录)
  - [文章置顶](#文章置顶)
  - [文章赞赏](#文章赞赏)
  - [相关文章](#相关文章)
  - [自定义字体](#自定义字体)
  - [Mermaid 增强](#mermaid-增强)
  - [文章搜索](#文章搜索)
  - [文章摘要](#文章摘要)
  - [其他](#其他)

## 安装

0. 前置条件：[node(>=16)](https://nodejs.org/en)、[Git](https://git-scm.com/)、[Hexo](https://hexo.io/) 以及使用 Hexo 博客文件。如果你还不了解以上内容，请从[这里](https://hexo.io/zh-cn/docs/)获取相关帮助。

1. 下载本仓库的文件到你的 Hexo 目录的 `themes\tranquility` 文件夹下:

    ```sh
    cd hexo
    git clone https://github.com/zycwer/hexo-theme-tranquility.git themes/tranquility
    ```

2. 并配置根目录下 `_config.yml` 中的 `theme` 字段为 `tranquility`（参考 [主题 | Hexo](https://hexo.io/zh-cn/docs/themes))。

3. 移除冲突的依赖，并安装必要依赖:

    ```bash
    npm uninstall hexo-generator-category hexo-generator-archive
    npm install hexo-pagination moment opentype.js
    ```

4. 主题配置
    将主题目录下的配置文件 `themes/tranquility/_config-template.yml` 复制到博客文件根目录下，并重命名为 `_config.tranquility.yml`。在 `_config.tranquility.yml` 个性化主题配置，具体的配置项查看[配置](#配置)或阅读配置文件的注释。

5. 补充(*针对非开发者*)  
    阅读报错可以使我们更快的定位问题，例如：

    - 缺少依赖

      随着主题的更新可能会依赖更多的第三方模块，此时用户需要自己添加新的依赖。例如，运行报错内容如下：

      ```log
      ...
      Error: Cannot find module 'a_third_module'
      ...
      ```

      显然根据提示，缺少名为 `a_third_module` 的模块，只需要安装该依赖即可：

      ```bash
      npm install a_third_module
      ```

      参考 [npm-install | npm Docs](https://docs.npmjs.com/cli/v8/commands/npm-install)

## 升级

本主题在不停迭代，当使用过程中遇到问题时可以查看主题是否已经有了更新。主题升级的步骤如下：

- 进入主题目录拉取更新

    ```bash
    cd themes/tranquility
    git pull
    ```

- 阅读[更新说明](https://github.com/zycwer/hexo-theme-tranquility/releases)，并查看 `themes/tranquility/_config-template.yml` 的新增和修改项，对应修改你的 `_theme.tranuility.yml` 文件

## 设计逻辑

本主题改变了 Hexo 的默认设计逻辑，所以与大多数的 Hexo 主题的用法不同，请参考下文。

大多数的 Hexo 主题的设计目的是在于**纯粹的博客记录**，并且博主的博客内容往往集中于单一学科领域（如互联网技术）。因此在这个需求驱动下，大多数 Hexo 主题被设计为主页展示文章列表，并使用繁多的分类（Category）为文章进行细分。这种设计很好的满足了需求。

当用户需要一个能够展示个人特点的主页，并且需要对博客的内容进行**明确**的领域划分时，这些主题并不能很好的满足这些需求。因此“致远”主题被设计出来，同时也规定了用户群体。

### 改变

主页并不展示文章列表，而是展示具有个人特点的内容，如“关于”和“时间线”模块。

引入“子页”的概念来取代“分类”（Category），所有的子页都在导航栏具有一级入口。基于此，子页的概念应该更广，往往为某一个学科大类或者领域，例如所有的互联网技术博文应该被划分为一个“子页”中，不管它属于“前端技术”还是“服务端技术”。

对于同属一个“子页”的文章，借鉴了微信公众号的分类逻辑，使用标签（Tag）来对文章进行分类和聚合。因此主题中**没有了**默认的 Category 的概念和入口，取而代之的是“子页”（Subpage）与“标签”（Tag）的概念。  

有关该主题的设计理念，如果这里的描述不够清楚，打开[演示站](https://www.hozen.site)浏览一下应该就明白了。如果无法理解这种改变，可能是因为您并没有这种需求，使用其他 Hexo 主题可能会是更好的选择。

## 配置

经过[安装](#安装)步骤，你在博客根目录下已经有了一个 `_config.tranquility.yml` 文件。如没有，请阅读并检查[安装步骤](#安装)。如不加说明，该部分的配置均在博客更目录下的 `_config.tranquility.yml` 文件进行。

本章所有的配置内容你都可以在 [致远](https://theme.www.hozen.site/tranquility/) 网站找到对应的测试文章，并在 [hooozen/hexo-theme-test](https://github.com/hooozen/hexo-theme-test) 仓库中找到对应的配置文件。所以当哪个配置项说明读不懂时不妨去找一下对应的例子。

### 一言（Slogan）

首页顶部展示的 `slogan`（如“宁静致远”）。开启 `slogan_hitokoto` 后，该位置会在浏览器端请求 [hitokoto.cn](https://v1.hitokoto.cn) 的「一言」接口，随机展示一句话，每次刷新都可能不同：

```yml
slogan: “宁静致远”        # 静态 slogan，作为一言请求失败 / JS 未执行时的回退
slogan_hitokoto: false   # 开启后首页 slogan 处展示随机一言
```

说明：

- 一言内容由客户端请求 `https://v1.hitokoto.cn/`，构建时仍把静态 `slogan` 渲染进 HTML，因此 **SEO 友好、无 JS 或请求失败时仍可见**（自动回退到静态 slogan）。
- 接口 5 秒超时，失败静默回退，不会影响页面其他部分。
- 开启后该位置字体自动切换为系统宋体（不使用提取子字体），避免随机字符不在子字体中导致的字体交错问题。

### 深色模式

主题内置运行时深色模式（基于 CSS 变量，**切换无需重建**），支持四种策略，由 `color_mode` 控制：

```yml
color_mode: light  # light | dark | auto | time
color_mode_time:   # 仅 color_mode: time 时生效
  start: 18        # 深色开始（24h 制，含）
  end: 6           # 深色结束（24h 制，不含，支持跨午夜，如 18→6）
```

| 模式 | 行为 |
| --- | --- |
| `light` | 始终浅色（默认） |
| `dark` | 始终深色 |
| `auto` | 跟随浏览器 `prefers-color-scheme`，系统切换时实时响应 |
| `time` | 在 `color_mode_time.start` ~ `end` 时段使用深色，其余浅色 |

导航栏右侧有一个 ☾/☀ 切换按钮：点击会立即切换主题，并把选择写入 `localStorage`（`theme-override`），**手动覆盖优先于配置策略**。清除浏览器存储后会回到配置的策略。

实现要点：

- 首屏内联同步脚本在 CSS 加载前设置 `data-theme`，避免 FOUC（切换瞬间的样式闪烁）。
- `auto` 模式下监听 `matchMedia('(prefers-color-scheme: dark)')` 的 `change` 事件，系统切换时自动跟随（除非已有手动覆盖）。
- 所有颜色通过 `source/css/_theme.styl` 的 CSS 变量定义，`_variables.styl` 中把 Stylus 变量映射到 `var(--c-*)`，因此已有的样式无需逐处修改即可响应深色模式。

### 站点模式

通过 `homepage_mode` 切换站点的整体形态：

```yml
# blog    = 默认博客主题（导航展示子页/博客入口）
# landing = 纯个人主页模式（隐藏博客/子页入口，聚焦关于页、大事件与最近更新）
homepage_mode: blog
```

`landing` 模式适合“本站不含文章、文章托管在独立博客”的场景：导航栏不再显示博客/子页入口，首页聚焦个人介绍（关于区块）、最近更新（从外部博客 RSS 聚合，见[最近更新](#最近更新rss-聚合)）与大事件（见[时间线](#时间线)）。配合 [关于页](#关于页) 与 [最近更新](#最近更新rss-聚合) 一起使用效果最佳。

注意：`landing` 模式仅隐藏导航入口，已存在的文章页面仍会被生成（只是不被链接）。如果你希望完全不生成博客页面，可在博客根目录 `_config.yml` 中将 `source` 指向空目录或移除 `source/_posts`。

### 子页

子页的配置在 `subpage` 下进行：

```yml
subpage: # 开启“子页”功能，详见 README
  enable: true  # 是否开启子页功能
  pages:  # 子页数组
    - name: # 子页标识，如 developer
      path: # 若不设置则默认使用 name
      title: # 显式在导航栏的菜单名，如 开发者
      icon: # 图标的路径
      description: # 描述
```

若关闭子页功能（`enbale: false`），则导航栏只会有一个“博客”按钮，点击该按钮就会进入所有文章列表。

若开启子页功能（`enbale: true`），则必须配置 `pages` 数组。该数组中使用 `name` 标识子页。`path` 指定子页的路径，默认使用 `name`。该数组的 `title` 会展示在导航栏的菜单中。配置完毕后，`pages` 数组中的所有项都会以 `title` 为名展示在网页的头部导航栏，点击每一项进入相应的子页。`icon` 和 `description` 用于配置子页中的图标和表述。

例如，[致远](https://theme.hozen.site/tranquility/)所使用的[子页配置](https://github.com/hooozen/hexo-theme-test/blob/main/_config.tranquility.yml#L13)。

新建文章后，只需要把文章头部的 `category` 字段设置为某子页的 `name` 即可将该文章划分到该子页下。

### 时间线

时间线的设计初衷是为了展示博主的**重要**事件或履历，如荣誉、宿醉、死亡等[<sup>[1]</sup>](#ref1)。

你也可以用它来展示精选文章或其他内容，时间线支持自定义配置。

![timeline](doc/images/timeline.gif)

时间线的配置在 `timeline` 下进行

```yml
timeline:
  enable: true  # 是否开启时间线
  reversed_order: true # 是否按时间倒序展示
  items:  # 配置时间线分类
    - name: article  # 分类名称
      color: "#ee936c"  # 分类主题色
      icon: /images/icon/icon-article.svg  # 分类图标
      checked: false  # 是否默认展示
    - name: apps
      color: "#60a465"
      icon: /images/icon/icon-app.svg
      checked: true
    - name: event
      color: "#568dc4"
      icon: /images/icon/icon-event.svg
      checked: false
```

在文章中配置 `timeline` 字段并指定时间线分类名称后，该文章会展示在时间线列表中，例如：

```yml
---
id: 57
title: 多少冬天
date: 2022-11-30 23:23:48
tags: 
  - 散文
categories: life  # 属于 life 子类下
cover: /assets/images/57-1.jpg
timeline: article  # 展示在时间线列表中
---
```

#### 大事件由文章驱动

时间线的大事件完全由**文章**驱动：在文章 front-matter 中设置 `timeline` 字段（值为 `items` 中某个 `name`），该文章就会出现在首页时间线，点击标题进入文章查看详情。无需在配置文件中单独定义事件，详见上文示例。

有关时间线的配置修改**可能需要重新启动服务**才会生效

### 关于页

关于页使用 Hexo 原生的**页面（Page）**功能实现，内容写在 markdown 文件里，无需在主题配置文件中填写。

1. 在博客 `source` 目录下新建 `about/index.md`：

```markdown
---
title: 关于
layout: about
date: 2024-01-01 00:00:00
---

这里是关于我的介绍，支持完整的 markdown 语法。

## 经历

- 内容直接写在页面文件中
- 由 markdown 渲染为 HTML，使用主题提供的 `about` 布局
```

2. 在 `_config.tranquility.yml` 中开启导航入口：

```yml
nav:
  sticky: false
  about: true   # 在导航栏显示“关于”入口，指向 /about/
```

主题提供 `layout: about` 页面模板，会渲染页面标题与 markdown 正文，并在底部自动展示博客 RSS 订阅链接（若开启了[最近更新](#最近更新rss-聚合)）。

### 最近更新（RSS 聚合）

“最近更新”把**外部博客**的最新文章以卡片形式展示在首页，左右切换浏览（最多 3 篇）。适合 `landing` 模式：本站不含文章，把独立博客的最新动态聚合到个人主页。

```yml
recent_updates:
  enable: true
  rss_url: https://example.com/feed.xml  # 博客 RSS 源地址
  max_count: 3        # 最多展示的卡片数量（建议 <= 3）
  title: 最近更新      # 区块标题
  show_excerpt: true   # 是否展示摘要
  excerpt_length: 80   # 摘要最大字符数
```

#### 工作原理

主题在 **`hexo generate` 构建时**于服务端抓取并解析 RSS，把文章数据直接渲染进静态 HTML。这样做的优点：

- **无 CORS 问题**：客户端不需要跨域请求 RSS；
- **国内加载稳定**：不依赖任何第三方代理（如 rss2json、allorigins），生成的是纯静态页面；
- **SEO 友好**：文章卡片直接存在于 HTML 中。

> 抓取失败不会中断构建，只会打印警告并隐藏首页的“最近更新”区块。因此即使博客 RSS 暂时不可达，站点仍可正常生成。
>
> 由于数据在构建时抓取，博客更新后需要**重新 `hexo generate`** 才会刷新首页卡片（可配合 CI/定时构建自动刷新）。

#### RSS 结构要求

主题内置一个轻量解析器（无需额外依赖），支持 **RSS 2.0** 与 **Atom 1.0** 两种常见格式。绝大多数博客系统（Hexo 的 `hexo-generator-feed`、WordPress、Ghost、Typecho 等）默认生成的订阅源即符合要求。

**RSS 2.0** —— 每个 `<item>` 需包含：

| 字段 | 标签 | 是否必需 | 说明 |
| --- | --- | --- | --- |
| 标题 | `<title>` | 是 | 文章标题 |
| 链接 | `<link>` | 是 | 文章地址 |
| 日期 | `<pubDate>` | 是 | RFC 822 格式，如 `Mon, 15 Jan 2024 10:00:00 +0800` |
| 摘要 | `<description>` 或 `<content:encoded>` | 否 | 支持 CDATA 与 HTML，会自动去标签并截断 |

**Atom 1.0** —— 每个 `<entry>` 需包含：

| 字段 | 标签 | 是否必需 | 说明 |
| --- | --- | --- | --- |
| 标题 | `<title>` | 是 | 文章标题 |
| 链接 | `<link href="..."/>` | 是 | 文章地址（取 `href` 属性） |
| 日期 | `<updated>` 或 `<published>` | 是 | ISO 8601 格式，如 `2024-01-15T10:00:00Z` |
| 摘要 | `<summary>` 或 `<content>` | 否 | 支持 CDATA 与 HTML，会自动去标签并截断 |

示例（RSS 2.0）：

```xml
<rss version="2.0">
  <channel>
    <item>
      <title>我的第一篇文章</title>
      <link>https://example.com/post-1</link>
      <pubDate>Mon, 15 Jan 2024 10:00:00 +0800</pubDate>
      <description><![CDATA[<p>文章摘要内容。</p>]]></description>
    </item>
  </channel>
</rss>
```

> 推荐使用 Hexo 博客安装 [`hexo-generator-feed`](https://github.com/hexojs/hexo-generator-feed) 生成 RSS：在博客根目录 `_config.yml` 中配置 `feed: { type: atom, path: feed.xml, limit: 20 }`，然后将 `recent_updates.rss_url` 指向该 feed 地址即可。

### Open Graph & Twitter Card

主题自动为每个页面注入 Open Graph 与 Twitter Card meta 标签，用于社交平台分享时展示标题、描述和封面图（微信、Telegram、Twitter/X、Slack、Discord 等均会读取）。

无需额外配置，标签会自动生成：

- `og:type` —— 文章页为 `article`，其余页面为 `website`
- `og:title` / `og:description` —— 取自页面标题与描述（文章页取摘要）
- `og:url` —— 页面绝对 URL（通过 `full_url_for` 生成）
- `og:site_name` —— 取自博客根目录 `_config.yml` 的 `title`
- `og:image` —— 优先级：文章 `cover` → 首页 `index.photo` → `logo`
- `twitter:card` —— 默认 `summary_large_image`（有封面时）或 `summary`

如需自定义分享图，在文章 front-matter 中设置 `cover` 字段（既用于文章列表封面，也用于分享卡片）：

```yml
---
title: 我的一篇文章
cover: /assets/images/my-cover.jpg
---
```

> `og:image` 会自动转换为绝对 URL。若 `cover` 已经是 `http(s)://` 开头的完整 URL，则原样使用。

### JSON-LD 结构化数据

主题根据页面类型自动注入 [schema.org](https://schema.org/) JSON-LD 结构化数据，帮助搜索引擎理解站点内容（Google 富媒体搜索结果会读取）：

| 页面类型 | Schema 类型 | 主要字段 |
| --- | --- | --- |
| 关于页（`layout: about`） | `Person` | name、url、email、logo |
| 文章页 | `Article` | headline、datePublished、dateModified、author、image、keywords |
| 其他页面（首页、子页等） | `WebSite` | name、url、description |

无需配置，自动从主题配置与文章 front-matter 中读取数据。

### 站点地图

主题内置 `sitemap.xml` 生成器，构建时自动产出站点地图，提交给 Google Search Console / Bing Webmaster / 百度站长等平台。

```yml
sitemap:
  enable: true  # 默认开启，设为 false 可关闭
```

生成的 `sitemap.xml` 包含：

- 首页（`priority=1.0`，`changefreq=daily`）
- 所有文章（按发布时间倒序，`priority=0.8`，`changefreq=weekly`，含 `lastmod`）
- 所有页面（`priority=0.6`，`changefreq=monthly`）
- 所有分类与标签归档页（`priority=0.4`，`changefreq=weekly`）

URL 均为绝对路径（基于博客根目录 `_config.yml` 的 `url` 配置）。

### PWA（可安装应用）

主题可生成 Progressive Web App 所需的 `manifest.json` 与 Service Worker（`sw.js`），让站点支持「添加到主屏幕」、离线访问与静态资源缓存。

```yml
pwa:
  enable: false       # 默认关闭，开启后生成 manifest.json 与 sw.js
  name:               # 应用全名（留空则取站点 title）
  short_name:         # 主屏幕图标下的短名（留空则取 name 前 12 字符）
  description:        # 应用描述
  display: standalone # standalone | fullscreen | minimal-ui | browser
  theme_color: "#fcfcfb"        # 应用主题色（与深色模式浅色色板一致）
  background_color: "#fcfcfb"   # 启动画面背景色
```

开启后：

- `manifest.json` 自动从 `favicon` 配置生成 `icons` 数组（apple-touch-icon 180×180、favicon-32×32、svg）。
- `sw.js` 采用「静态资源缓存优先、HTML 网络优先回退缓存」策略：JS/CSS/图片/字体优先从缓存读取，HTML 页面优先请求网络，网络失败时回退到缓存（保证用户能离线访问已浏览过的页面）。
- 页面会自动注册 Service Worker（仅在生产环境、HTTPS 或 `localhost` 下生效），并设置 `<meta name="theme-color">`。

> **注意**：PWA 必须在 **HTTPS** 环境下才能注册 Service Worker（`localhost` 除外）。GitHub Pages、Vercel、Netlify、Cloudflare Pages 等托管平台默认提供 HTTPS，可直接使用。

### 代码高亮

代码高亮依赖于博客**根目录**下的 `_config.yml` 的 `highlight` 配置，请配置如下：

```yml
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace: ""
  wrap: true
  hljs: true
prismjs:
  enable: false
  preprocess: true
  line_number: true
  tab_replace: ""

```

### 数学公式

主题有两种方式开启对 Latex 数学公式的支持，但都需要先进行以下操作：

- **移除** Hexo 默认的 markdown 渲染插件 `hexo-renderer-marked`，并安装 `hexo-renderer-pandoc`。如果安装了其他的 markdown 渲染插件也请移除！

  ```bash
  npm uninstall hexo-renderer-marked
  npm install hexo-renderer-pandoc
  ```

- 安装 pandoc 软件，查看 [pandoc.org](https://www.pandoc.org/)。

第一种方法，使用主题预置的 Latex 解析，直接在配置文件中开启 `mathjax` 即可使用

```yml
mathjax: true # 加载 LateX 数学公式库
```

第二种方法，使用第三方插件 [hexo-filter-mathjax](https://github.com/next-theme/hexo-filter-mathjax) 进行服务端渲染。并关闭配置文件中的 `mathjax: false`

从访问性能来讲，推荐使用第二种方法。

### 首页自定义

- 查看 `index` 配置项

### 导航

- `nav.sticky` 配置导航栏是否粘滞在顶部

### 页脚自定义

- `foot.title` 配置页脚显式的标语

- `foot.linksRows` 配置链接的行数, 参考 [issue#44](https://github.com/hooozen/hexo-theme-tranquility/issues/44).

- `links` 配置友链

- `social` 配置社交帐户或其他链接

- `contacts` 配置联系方式

### 标签云

标签云出现在每个子页的首页，用来展示该子页下文章的标签分布。标签云有两种形式：3D 动画云和静态标签云。

- `tagcloud.fancy` 选择是否开启 3D 动画云
- `tagcloud` 的其他选项用以配置 3D 标签云，参考 [tagcloud](https://hexo.io/zh-cn/docs/helpers#tagcloud)

### 文章封面

- 文章列表封面图片的配置，通过设置文章头部的 `cover` 字段指定封面图片的 URL

### 文章目录

- 通过在文章头部配置 `toc: true` 来展示文章目录。具有较多层级结构的文章推荐开启，而散文等文本类可以关闭。

### 文章置顶

- 通过数字来指定文章头部的 `sticky` 属性对文章进行置顶，数字越大置顶优先级越高。数字都需要大于 `0`。

### 文章赞赏

- 配置项 `reward` 进行文章赞赏配置，包括头像、二维码和语句等。

### 相关文章

相关文章用来在每篇文章底部展示与本篇文章相关的推荐文章。

- 首先安装依赖

    ```bash
    npm install hexo-related-popular-posts
    ```

- 通过 `related_post` 配置项进行配置，具体配置查看[插件文档](https://github.com/tea3/hexo-related-popular-posts)。

### 自定义字体

主题的部分区域为了设计感使用了第三方的汉字字体。但由于汉字字体包太大，因此本主题对用户使用的部分字体进行了提取打包成子字体。

通过 `zh_font` 配置项进行开启或关闭

### Mermaid 增强

Mermaid 是一个基于 Javascript 的图表绘制工具，通过解析类 Markdown 的文本语法来实现图表的创建和动态修改。

- 首先安装依赖

    ```bash
    npm install hexo-filter-mermaid-diagrams
    ```

- 在配置文件中启用

    ```yml
    mermaid:
      enable: true # 启用 Mermaid 增强
      version: 10.9.3 # 固定版本，避免使用 latest 因上游 breaking change 失效
      options:
        startOnload: true
    ```

- 然后就可以在 markdown 文章中绘图了（GitHub 会自动渲染，用法就是代码块设置为 mermaid）

    ```mermaid
    graph LR
      A --> B
      A --> D
    ```

- 如果想要在本地预览 mermaid 的渲染结果，需要支持 mermaid 的 markdown 编译器。如果使用 vscode，需要下载 [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid) 这个插件。

- Mermaid 的具体的用法可参考 [Mermaid 指引](http://mermaid.js.org/intro/)。

### 文章搜索

新增搜索功能，通过如下配置主题配置文件启用：

```yml
search:
  path: search.json
  enable: true
  field: post
  content: true
```

### 文章摘要

我们都知道通过在 markdown 文件中使用 `<!--more-->` 可以截断文章，使得在这之前的内容可以作为 excerpt 显示在文章列表页。另外，也可以在[Front-matter](https://hexo.io/zh-cn/docs/front-matter)中设置 abstract 字段来设置隐藏式摘要。

abstract 的设置不同于通过在正文使用 <!--more--> 隔断的节录（excerpt）。abstract 的内容不会再出现在正文中，并且设置 abstrct 后会覆盖 excerpt 在文章列表的中的展示。

abstract 功能功能类似微信公众号的摘要表现。

```yml
---
title: 隐藏式摘要测试
date: 2024-01-27 11:58:32
tags: text
category: featTest
cover: assets/hozen-durdledoor.jpg
abstract: "该文章测试隐藏式摘要功能，此文本只会在文章列表展示，文章正文中不再出现。"
---
```

### 其他

请他配置请查看配置文件注释

- gitalk 文章评论
- 百度 SEO
- 等

-----

<div id='ref1'></div>
[1]. 引用了英雄联盟角色亚索的台词：“生命中有三件必经之事，荣誉、死亡，还有……宿醉……”
