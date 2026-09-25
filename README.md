<p align="center">
  <strong>中文</strong> · <a href="./README_EN.md">English</a>
</p>

<h1> <div align="center"><img align="center" height="40" src="source/images/tranquility.svg"/> 致远</div></h1>

<p align="center">一款为个人主页及多学科领域博主设计的 Hexo 主题</p>

<p align="center">
<a href="https://github.com/zycwer/hexo-theme-tranquility/releases"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/zycwer/hexo-theme-tranquility?label=release&color=orange"></a>
<a href="https://www.npmjs.com/package/hexo-theme-tranquility"><img alt="npm" src="https://img.shields.io/npm/v/hexo-theme-tranquility?logo=npm&label=npm"></a>
<a href="https://github.com/zycwer/hexo-theme-tranquility/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/zycwer/hexo-theme-tranquility/ci.yml?branch=main&label=CI"></a>
<a href="https://hexo.io/"><img src="https://img.shields.io/badge/Hexo-%3E%3D8.0.0-blue?logo=hexo"></a>
<a href="https://github.com/zycwer/hexo-theme-tranquility/blob/main/LICENSE"><img src="https://img.shields.io/github/license/zycwer/hexo-theme-tranquility"></a>
<a href="https://docs.qwrcb.top"><img src="https://img.shields.io/badge/docs-docs.qwrcb.top-green"></a>

<img src="./doc/images/index-ios-3.jpg"/>
</p>

> **💡 Fork 说明**
>
> 本仓库是 [hooozen/hexo-theme-tranquility](https://github.com/hooozen/hexo-theme-tranquility) 的 fork。原仓库已于 2026 年 6 月归档、停止维护，本 fork 在其基础上持续维护，新增特性、修复缺陷。完整演进见 [Releases](https://github.com/zycwer/hexo-theme-tranquility/releases) 与[更新日志](https://docs.qwrcb.top/docs/changelog)。

## 快速开始

```bash
cd hexo
npm install hexo-theme-tranquility
npm uninstall hexo-generator-category hexo-generator-archive
# 博客根目录 _config.yml：theme: tranquility
hexo clean && hexo s
```

> `hexo-generator-category` / `hexo-generator-archive` 与本主题「子页」设计冲突，必须移除。完整步骤（含 Git 安装方式）见[安装](#安装)。

## 演示站

- [Tranquility 演示站](https://zycwer.github.io/hexo-theme-tranquility/)（特性全览，每次提交自动构建）
- [致远](https://theme.hozen.site/tranquility/)（原主题演示站）
- [浩然的主页](https://www.hozen.site)

## 特点

**个人主页**

- 主页聚焦个性展示：关于、时间线、项目、技能，支持[纯个人主页模式](https://docs.qwrcb.top/docs/configuration/basic/homepage)（不含文章，聚合外部博客 RSS）
- [「子页」设计](https://docs.qwrcb.top/docs/configuration/basic/subpage)取代分类，每个子页在导航栏拥有一级入口，适应多领域写作
- [最近更新卡片](https://docs.qwrcb.top/docs/configuration/basic/recent-updates)：构建时聚合外部博客 RSS，国内加载稳定
- 可关闭公告横幅、页脚建站时长统计、一言（Hitokoto）Slogan、赞赏

**写作功能**

- 文章封面、目录、置顶、摘要、相关文章、标签云
- [归档页](https://docs.qwrcb.top/docs/configuration/basic/nav)：按年份分组的时间线式文章归档，导航栏可选入口
- 代码高亮、[数学公式](https://docs.qwrcb.top/docs/configuration/writing/math)（MathJax）、[Mermaid 图表](https://docs.qwrcb.top/docs/configuration/writing/mermaid)

**SEO 与可发现性**

- Open Graph / Twitter Card 社交分享卡片、JSON-LD 结构化数据
- sitemap、robots.txt、RSS 自动发现
- 本地搜索（免外部服务），可选 Algolia DocSearch

**性能 / 体验 / 安全**

- 深色模式四策略（浅色 / 深色 / 定时 / 跟随浏览器，导航栏一键切换）
- PWA 离线访问、图片懒加载、资源内容指纹强缓存、中文字体子集化
- 樱花飘落装饰动画（`prefers-reduced-motion` 自动降级，不拦截交互）
- 音乐播放器：APlayer 迷你模式浮动于左下角，跨页记忆曲目与播放进度
- 回到顶部按钮、`prefers-reduced-motion` 无障碍降级、三端自适应
- CSP 安全策略、构建期 URL 校验、XSS 注入防护

## 安装

### 前置条件

[Node.js (>=16)](https://nodejs.org/)、[Git](https://git-scm.com/)、[Hexo](https://hexo.io/) 与一个可用的 Hexo 博客。不熟悉 Hexo 请先阅读 [Hexo 文档](https://hexo.io/zh-cn/docs/)。

### 方式一：npm 安装（推荐）

1. 安装主题（运行时依赖 `hexo-pagination`、`opentype.js` 等自动装齐）：

    ```sh
    cd hexo
    npm install hexo-theme-tranquility
    ```

2. 配置博客根目录 `_config.yml` 的 `theme` 字段（参考 [主题 | Hexo](https://hexo.io/zh-cn/docs/themes)）：

    ```yml
    theme: tranquility
    ```

3. 移除冲突依赖（与本主题「子页」设计冲突，npm 无法自动卸载别的包）：

    ```bash
    npm uninstall hexo-generator-category hexo-generator-archive
    ```

4. 主题配置：在博客根目录新建 `_config.tranquility.yml`，**只需写需要修改的项**，其余走包内默认值（Hexo 深合并覆盖）。配置项说明见[文档站](https://docs.qwrcb.top)，或阅读包内 `node_modules/hexo-theme-tranquility/_config.yml` 注释。

### 方式二：Git 克隆安装

适合需要修改源码或跟踪主线的用户。

1. 克隆仓库到 `themes/tranquility`：

    ```sh
    cd hexo
    git clone https://github.com/zycwer/hexo-theme-tranquility.git themes/tranquility
    ```

2. 配置 `theme: tranquility`（同上）。

3. 移除冲突依赖并安装必要依赖：

    ```bash
    npm uninstall hexo-generator-category hexo-generator-archive
    npm install hexo-pagination moment opentype.js nunjucks hexo-renderer-nunjucks hexo-renderer-stylus
    ```

4. 将 `themes/tranquility/_config-template.yml` 复制到博客根目录并重命名为 `_config.tranquility.yml`，按需修改。

### 验证

```bash
hexo clean && hexo s
```

浏览器访问 `http://localhost:4000`，看到主题首页即安装成功。报错排查见[安装文档](https://docs.qwrcb.top/docs/installation#报错排查)。

## 升级

| 安装方式 | 升级命令 |
| --- | --- |
| npm | `npm install hexo-theme-tranquility@latest` |
| Git 克隆 | `cd themes/tranquility && git pull` |

升级后建议：

1. 阅读[更新说明](https://github.com/zycwer/hexo-theme-tranquility/releases)，了解变更与注意事项；
2. 对照 [`_config-template.yml`](./_config-template.yml) 核对新增 / 修改的配置项（npm 方式下，`_config.tranquility.yml` 中**未覆盖**的字段会自动跟随新版默认值）。

> 详见[升级指南](https://docs.qwrcb.top/docs/upgrade)与[版本号命名](https://docs.qwrcb.top/docs/versioning)。

## 文档

完整的安装、配置与高级自定义教程请访问 **[docs.qwrcb.top](https://docs.qwrcb.top)**（中英双语）：

- [安装](https://docs.qwrcb.top/docs/installation) · [设计逻辑](https://docs.qwrcb.top/docs/design) · [升级指南](https://docs.qwrcb.top/docs/upgrade)
- 配置：[基础](https://docs.qwrcb.top/docs/configuration/basic/homepage) · [写作](https://docs.qwrcb.top/docs/configuration/writing/post-cover) · [SEO](https://docs.qwrcb.top/docs/configuration/seo/open-graph) · [性能与体验](https://docs.qwrcb.top/docs/configuration/experience/dark-mode)
- 高级：自定义样式与布局 · 注入脚本 · CDN · 站点统计 · 评论系统 · CI/CD 自动部署
- [更新日志](https://docs.qwrcb.top/docs/changelog) · [版本号命名](https://docs.qwrcb.top/docs/versioning)

## 设计逻辑

本主题改变了 Hexo 的默认设计逻辑：**主页不展示文章列表**，而是展示关于、时间线等个性内容；以「**子页**」取代「分类」（Category）——每个子页对应一个学科大类，在导航栏拥有一级入口；子页内部用「标签」聚合文章。

这为主题规定了用户群体：需要一个展示个人特点的主页、且需要对多领域内容做明确划分的博主。如果这里的描述不够直观，打开[演示站](https://zycwer.github.io/hexo-theme-tranquility/)浏览一下就明白了；如果没有这类需求，其他 Hexo 主题可能是更好的选择。

详见[设计逻辑](https://docs.qwrcb.top/docs/design)。

## License

[MIT](./LICENSE)
