<p align="center">
  <a href="./README.md">中文</a> · <strong>English</strong>
</p>

<h1> <div align="center"><img align="center" height="40" src="source/images/tranquility.svg"/> Tranquility</div></h1>

<p align="center">A Hexo theme designed for personal homepages and multi-discipline bloggers.</p>

<p align="center">
<a href="https://github.com/zycwer/hexo-theme-tranquility/releases"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/zycwer/hexo-theme-tranquility?label=release&color=orange"></a>
<a href="https://hexo.io/"><img src="https://img.shields.io/badge/Hexo-%3E%3D8.0.0-blue?logo=hexo"></a>
<a href="https://github.com/zycwer/hexo-theme-tranquility/blob/main/LICENSE"><img src="https://img.shields.io/github/license/zycwer/hexo-theme-tranquility"></a>
<a href="https://docs.qwrcb.top"><img src="https://img.shields.io/badge/docs-docs.qwrcb.top-green"></a>

<img src="./doc/images/index-ios-3.jpg"/>
</p>

> **💡 Fork Notice**
>
> This repository is a fork of [hooozen/hexo-theme-tranquility](https://github.com/hooozen/hexo-theme-tranquility). The original repository was archived in June 2026 and is no longer maintained. This fork continues maintenance, adding features and fixing bugs on top of the original.
>
> Major changes compared to the original repo: Hitokoto Slogan toggle, article-driven timeline, Hexo native about page, build-time RSS-aggregated "Recent Updates", runtime dark mode, Open Graph / JSON-LD / sitemap / robots.txt / RSS auto-discovery, PWA, lazy image loading, back-to-top button, `prefers-reduced-motion` accessibility degradation, font loading optimization, security hardening (XSS / injection protection), removed Gitalk comments, etc.
>
> See [Releases](https://github.com/zycwer/hexo-theme-tranquility/releases) for details.

## Documentation

Full installation, configuration, and advanced customization tutorials are available at **[docs.qwrcb.top](https://docs.qwrcb.top)** (bilingual Chinese/English), including:

- Basic (site mode, homepage, navbar, subpages, about page, timeline, recent updates, footer, reward)
- Writing (post cover, TOC, sticky, excerpt, related posts, tag cloud, code highlighting, math, Mermaid)
- SEO & Discoverability (Open Graph, JSON-LD, sitemap, robots.txt, RSS auto-discovery, search)
- Performance & Experience (dark mode, PWA, accessibility, font loading optimization)
- Advanced (custom styles & layouts, script injection, CDN, analytics, comments, CI/CD deployment)
- [Versioning](https://docs.qwrcb.top/docs/versioning) · [Changelog](https://docs.qwrcb.top/docs/changelog) · [Upgrade Guide](https://docs.qwrcb.top/docs/upgrade)

## Demo Sites

- [Tranquility](https://theme.hozen.site/tranquility/) (original theme demo)
- [Hozen's Homepage](https://www.hozen.site)

## Features

- Homepage-style layout focused on personal branding; supports a pure homepage mode (no articles, aggregates external blog RSS)
- "Subpage" design for multi-discipline writing
- Recent Updates cards aggregating external blog RSS at build time — stable loading in mainland China
- About page (Hexo native page) and Timeline (article-driven, click to view details)
- Hitokoto slogan that refreshes on every page load
- Dark mode (light/dark/scheduled/follow-browser, one-click toggle in the navbar)
- Open Graph social cards, JSON-LD structured data, sitemap, robots.txt, RSS auto-discovery, and PWA support
- Back-to-top button, accessibility motion degradation, font loading optimization
- Responsive across desktop, tablet, and mobile for comfortable reading
- Custom font extraction and subsetting, balancing aesthetics and performance
- Related posts, math formulas, reward, SEO

## Installation

0. Prerequisites: [Node.js (>=16)](https://nodejs.org/), [Git](https://git-scm.com/), [Hexo](https://hexo.io/), and a working Hexo blog. If you're new to these, start with the [Hexo docs](https://hexo.io/docs/).

1. Clone this repository into your Hexo blog's `themes/tranquility` folder:

    ```sh
    cd hexo
    git clone https://github.com/zycwer/hexo-theme-tranquility.git themes/tranquility
    ```

2. Set the `theme` field to `tranquility` in your blog's root `_config.yml` (see [Themes | Hexo](https://hexo.io/docs/themes)).

3. Remove conflicting dependencies and install the required ones:

    ```bash
    npm uninstall hexo-generator-category hexo-generator-archive
    npm install hexo-pagination moment opentype.js
    ```

4. Theme configuration: Copy `themes/tranquility/_config-template.yml` to your blog's root directory and rename it to `_config.tranquility.yml`. Personalize the theme by editing `_config.tranquility.yml`. See the [docs site](https://docs.qwrcb.top) or read the comments in the config file for configuration options.

## Upgrade

The theme is continuously iterated. When you encounter issues, check whether the theme has been updated. Upgrade steps:

- Pull updates in the theme directory:

    ```bash
    cd themes/tranquility
    git pull
    ```

- Read the [release notes](https://github.com/zycwer/hexo-theme-tranquility/releases), and check `themes/tranquility/_config-template.yml` for new or modified options. Update your `_config.tranquility.yml` accordingly.

> For upgrade notes and versioning rules, see the [Upgrade Guide](https://docs.qwrcb.top/docs/upgrade) and [Versioning](https://docs.qwrcb.top/docs/versioning).

## Design Philosophy

This theme changes Hexo's default design logic, so it works differently from most Hexo themes. Please read the following carefully.

Most Hexo themes are designed for **pure blogging**, where a blogger's content is typically concentrated in a single discipline (e.g. internet technology). Driven by this need, most themes display an article list on the homepage and use numerous Categories for subdivision. This design serves that use case well.

When a user wants a homepage that showcases personal identity and needs **clear** domain boundaries across blog content, those themes fall short. The "Tranquility" theme was created for this audience — and defines its target users accordingly.

### The Change

The homepage does not display an article list. Instead, it shows identity-focused modules like "About" and "Timeline".

The concept of "Subpage" replaces "Category". All subpages have a top-level entry in the navigation bar. A subpage should represent a broader scope — typically a major discipline or domain. For example, all internet-technology posts should belong to one subpage, whether they're "frontend" or "backend".

For posts within the same subpage, the theme borrows WeChat Official Account's classification logic and uses Tags for classification and aggregation. Thus, the theme **removes** the default Category concept and entry, replacing it with "Subpage" and "Tag".

If the description here isn't clear enough, open the [demo site](https://www.hozen.site) and browse around — it should become obvious. If this change doesn't resonate with you, you may not have this need, and another Hexo theme might be a better fit.

## License

[MIT](./LICENSE)
