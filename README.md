<p align="center">
  <strong>中文</strong> · <a href="./README_EN.md">English</a>
</p>

<h1> <div align="center"><img align="center" height="40" src="source/images/tranquility.svg"/> 致远</div></h1>

<p align="center">一款为个人主页及多学科领域博主设计的 Hexo 主题</p>

<p align="center">
<a href="https://github.com/zycwer/hexo-theme-tranquility/releases"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/zycwer/hexo-theme-tranquility?label=release&color=orange"></a>
<a href="https://hexo.io/"><img src="https://img.shields.io/badge/Hexo-%3E%3D8.0.0-blue?logo=hexo"></a>
<a href="https://github.com/zycwer/hexo-theme-tranquility/blob/main/LICENSE"><img src="https://img.shields.io/github/license/zycwer/hexo-theme-tranquility"></a>
<a href="https://docs.qwrcb.top"><img src="https://img.shields.io/badge/docs-docs.qwrcb.top-green"></a>

<img src="./doc/images/index-ios-3.jpg"/>
</p>

> **💡 Fork 说明**
>
> 本仓库是 [hooozen/hexo-theme-tranquility](https://github.com/hooozen/hexo-theme-tranquility) 的 fork。原仓库已于 2026 年 6 月归档、停止维护，本 fork 在其基础上持续维护并持续新增特性、修复缺陷。
>
> 相较原仓库的主要演进：一言 Slogan 开关、文章驱动时间线、Hexo 原生关于页、构建时 RSS 聚合的「最近更新」、运行时深色模式、Open Graph / JSON-LD / sitemap / robots.txt / RSS 自动发现、PWA、图片懒加载、回到顶部按钮、`prefers-reduced-motion` 无障碍降级、字体加载优化、安全加固（XSS / 注入防护）、移除 Gitalk 评论功能等。
>
> 详见 [Releases](https://github.com/zycwer/hexo-theme-tranquility/releases)。

## 文档

完整的安装、配置与高级自定义教程请访问 **[docs.qwrcb.top](https://docs.qwrcb.top)**（中英双语），包括：

- 基础配置（站点模式、首页、导航、子页、关于页、时间线、最近更新、页脚、赞赏）
- 写作功能（文章封面、目录、置顶、摘要、相关文章、标签云、代码高亮、数学公式、Mermaid）
- SEO 与可发现性（Open Graph、JSON-LD、sitemap、robots.txt、RSS 自动发现、搜索）
- 性能与体验（深色模式、PWA、无障碍、字体加载优化）
- 高级自定义（自定义样式与布局、注入脚本、CDN、站点统计、评论系统、CI/CD 自动部署）
- [版本号命名](https://docs.qwrcb.top/docs/versioning) · [更新日志](https://docs.qwrcb.top/docs/changelog) · [升级指南](https://docs.qwrcb.top/docs/upgrade)

## 演示站

- [致远](https://theme.hozen.site/tranquility/)（原主题演示站）
- [浩然的主页](https://www.hozen.site)

## 特点

- 主页风格，聚焦个性展示，支持纯个人主页模式（不含文章，聚合外部博客 RSS）
- 「子页」设计，适应多领域写作
- 最近更新卡片，构建时聚合外部博客 RSS，国内加载稳定
- 关于页（Hexo 原生页面）、时间线（文章驱动，点击进入详情）
- 一言（Hitokoto）Slogan，刷新随机切换
- 深色模式（浅色 / 深色 / 定时 / 跟随浏览器，导航栏一键切换）
- Open Graph 社交分享卡片、JSON-LD 结构化数据、站点地图、robots.txt、RSS 自动发现、PWA
- 回到顶部按钮、无障碍动效降级、字体加载优化
- 三端自适应，舒适阅读
- 自定义字体及提取压缩，兼具美观和性能
- 相关文章、数学公式、赞赏、SEO

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

4. 主题配置：将主题目录下的 `themes/tranquility/_config-template.yml` 复制到博客文件根目录下，并重命名为 `_config.tranquility.yml`。在 `_config.tranquility.yml` 个性化主题配置，具体配置项请查看[文档站](https://docs.qwrcb.top)或阅读配置文件的注释。

## 升级

本主题在不停迭代，当使用过程中遇到问题时可以查看主题是否已经有了更新。主题升级的步骤如下：

- 进入主题目录拉取更新

    ```bash
    cd themes/tranquility
    git pull
    ```

- 阅读[更新说明](https://github.com/zycwer/hexo-theme-tranquility/releases)，并查看 `themes/tranquility/_config-template.yml` 的新增和修改项，对应修改你的 `_config.tranquility.yml` 文件。

> 升级注意事项与版本号命名规则请参考[升级指南](https://docs.qwrcb.top/docs/upgrade)与[版本号命名](https://docs.qwrcb.top/docs/versioning)。

## 设计逻辑

本主题改变了 Hexo 的默认设计逻辑，所以与大多数的 Hexo 主题的用法不同，请参考下文。

大多数的 Hexo 主题的设计目的是在于**纯粹的博客记录**，并且博主的博客内容往往集中于单一学科领域（如互联网技术）。因此在这个需求驱动下，大多数 Hexo 主题被设计为主页展示文章列表，并使用繁多的分类（Category）为文章进行细分。这种设计很好的满足了需求。

当用户需要一个能够展示个人特点的主页，并且需要对博客的内容进行**明确**的领域划分时，这些主题并不能很好的满足这些需求。因此「致远」主题被设计出来，同时也规定了用户群体。

### 改变

主页并不展示文章列表，而是展示具有个人特点的内容，如「关于」和「时间线」模块。

引入「子页」的概念来取代「分类」（Category），所有的子页都在导航栏具有一级入口。基于此，子页的概念应该更广，往往为某一个学科大类或者领域，例如所有的互联网技术博文应该被划分为一个「子页」中，不管它属于「前端技术」还是「服务端技术」。

对于同属一个「子页」的文章，借鉴了微信公众号的分类逻辑，使用标签（Tag）来对文章进行分类和聚合。因此主题中**没有了**默认的 Category 的概念和入口，取而代之的是「子页」（Subpage）与「标签」（Tag）的概念。

有关该主题的设计理念，如果这里的描述不够清楚，打开[演示站](https://www.hozen.site)浏览一下应该就明白了。如果无法理解这种改变，可能是因为您并没有这种需求，使用其他 Hexo 主题可能会是更好的选择。

## License

[MIT](./LICENSE)
