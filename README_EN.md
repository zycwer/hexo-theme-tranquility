<p align="center">
  <a href="./README.md">中文</a> · <strong>English</strong>
</p>

<h1> <div align="center"><img align="center" height="40" src="source/images/tranquility.svg"/> Tranquility</div></h1>

<p align="center">A Hexo theme designed for personal homepages and multi-discipline bloggers.</p>

<p align="center">
<a href="https://github.com/zycwer/hexo-theme-tranquility/releases"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/zycwer/hexo-theme-tranquility?label=release&color=orange"></a>
<a href="https://www.npmjs.com/package/hexo-theme-tranquility"><img alt="npm" src="https://img.shields.io/npm/v/hexo-theme-tranquility?logo=npm&label=npm"></a>
<a href="https://hexo.io/"><img src="https://img.shields.io/badge/Hexo-%3E%3D8.0.0-blue?logo=hexo"></a>
<a href="https://github.com/zycwer/hexo-theme-tranquility/blob/main/LICENSE"><img src="https://img.shields.io/github/license/zycwer/hexo-theme-tranquility"></a>
<a href="https://docs.qwrcb.top"><img src="https://img.shields.io/badge/docs-docs.qwrcb.top-green"></a>

<img src="./doc/images/index-ios-3.jpg"/>
</p>

> **💡 Fork Notice**
>
> This repository is a fork of [hooozen/hexo-theme-tranquility](https://github.com/hooozen/hexo-theme-tranquility). The original repository was archived in June 2026 and is no longer maintained. This fork continues maintenance, adding features and fixing bugs on top of the original. See [Releases](https://github.com/zycwer/hexo-theme-tranquility/releases) and the [Changelog](https://docs.qwrcb.top/docs/changelog) for the full evolution.

## Quick Start

```bash
cd hexo
npm install hexo-theme-tranquility
npm uninstall hexo-generator-category hexo-generator-archive
# root _config.yml: theme: tranquility
hexo clean && hexo s
```

> `hexo-generator-category` / `hexo-generator-archive` conflict with this theme's "Subpage" design and must be removed. Full steps (including the Git install option) in [Installation](#installation).

## Demo Sites

- [Tranquility Demo](https://zycwer.github.io/hexo-theme-tranquility/) (full feature showcase, rebuilt automatically on every commit)
- [Tranquility](https://theme.hozen.site/tranquility/) (original theme demo)
- [Hozen's Homepage](https://www.hozen.site)

## Features

**Personal homepage**

- Homepage focused on personal branding: about, timeline, projects, and skills sections; supports a [pure homepage mode](https://docs.qwrcb.top/docs/configuration/basic/homepage) (no articles, aggregates external blog RSS)
- ["Subpage" design](https://docs.qwrcb.top/docs/configuration/basic/subpage) replacing categories — every subpage gets a top-level navbar entry, built for multi-discipline writing
- [Recent Updates](https://docs.qwrcb.top/docs/configuration/basic/recent-updates) cards aggregating external blog RSS at build time — stable loading in mainland China
- Dismissible announcement banner, site uptime counter, Hitokoto slogan, reward

**Writing**

- Post cover, TOC, sticky posts, excerpt, related posts, tag cloud
- Code highlighting, [math formulas](https://docs.qwrcb.top/docs/configuration/writing/math) (MathJax), [Mermaid diagrams](https://docs.qwrcb.top/docs/configuration/writing/mermaid)

**SEO & discoverability**

- Open Graph / Twitter Card social cards, JSON-LD structured data
- sitemap, robots.txt, RSS auto-discovery
- Local search (no external service required), optional Algolia DocSearch

**Performance / experience / security**

- Dark mode with four strategies (light/dark/scheduled/follow-browser, one-click toggle in the navbar)
- PWA offline access, lazy image loading, content-fingerprinted asset caching, Chinese font subsetting
- Back-to-top button, `prefers-reduced-motion` accessibility degradation, responsive across desktop/tablet/mobile
- CSP security policy, build-time URL validation, XSS injection protection

## Installation

### Prerequisites

[Node.js (>=16)](https://nodejs.org/), [Git](https://git-scm.com/), [Hexo](https://hexo.io/), and a working Hexo blog. New to Hexo? Start with the [Hexo docs](https://hexo.io/docs/).

### Option A: npm (Recommended)

1. Install the theme (runtime dependencies like `hexo-pagination` and `opentype.js` are installed automatically):

    ```sh
    cd hexo
    npm install hexo-theme-tranquility
    ```

2. Set the `theme` field in your blog's root `_config.yml` (see [Themes | Hexo](https://hexo.io/docs/themes)):

    ```yml
    theme: tranquility
    ```

3. Remove conflicting dependencies (they conflict with this theme's "Subpage" design; npm cannot uninstall them automatically):

    ```bash
    npm uninstall hexo-generator-category hexo-generator-archive
    ```

4. Theme configuration: create `_config.tranquility.yml` in your blog's root directory with **only the options you want to override** — the rest fall back to the in-package defaults (deep-merged by Hexo). See the [docs site](https://docs.qwrcb.top) or read the comments in `node_modules/hexo-theme-tranquility/_config.yml`.

### Option B: Git Clone

For users who need to modify the source or track mainline.

1. Clone this repository into your Hexo blog's `themes/tranquility` folder:

    ```sh
    cd hexo
    git clone https://github.com/zycwer/hexo-theme-tranquility.git themes/tranquility
    ```

2. Set `theme: tranquility` (same as above).

3. Remove conflicting dependencies and install the required ones:

    ```bash
    npm uninstall hexo-generator-category hexo-generator-archive
    npm install hexo-pagination moment opentype.js nunjucks hexo-renderer-nunjucks hexo-renderer-stylus
    ```

4. Copy `themes/tranquility/_config-template.yml` to your blog's root directory and rename it to `_config.tranquility.yml`, then customize as needed.

### Verify

```bash
hexo clean && hexo s
```

Open `http://localhost:4000` — the theme homepage means the installation succeeded. For troubleshooting, see the [installation docs](https://docs.qwrcb.top/docs/installation).

## Upgrade

| Install method | Upgrade command |
| --- | --- |
| npm | `npm install hexo-theme-tranquility@latest` |
| Git clone | `cd themes/tranquility && git pull` |

Recommended after upgrading:

1. Read the [release notes](https://github.com/zycwer/hexo-theme-tranquility/releases) for changes and caveats;
2. Check [`_config-template.yml`](./_config-template.yml) for new or modified options (with npm, fields you **haven't overridden** in `_config.tranquility.yml` automatically follow the new defaults).

> See the [Upgrade Guide](https://docs.qwrcb.top/docs/upgrade) and [Versioning](https://docs.qwrcb.top/docs/versioning) for details.

## Documentation

Full installation, configuration, and advanced customization tutorials at **[docs.qwrcb.top](https://docs.qwrcb.top)** (bilingual Chinese/English):

- [Installation](https://docs.qwrcb.top/docs/installation) · [Design Philosophy](https://docs.qwrcb.top/docs/design) · [Upgrade Guide](https://docs.qwrcb.top/docs/upgrade)
- Configuration: [Basic](https://docs.qwrcb.top/docs/configuration/basic/homepage) · [Writing](https://docs.qwrcb.top/docs/configuration/writing/post-cover) · [SEO](https://docs.qwrcb.top/docs/configuration/seo/open-graph) · [Performance & Experience](https://docs.qwrcb.top/docs/configuration/experience/dark-mode)
- Advanced: custom styles & layouts · script injection · CDN · analytics · comments · CI/CD deployment
- [Changelog](https://docs.qwrcb.top/docs/changelog) · [Versioning](https://docs.qwrcb.top/docs/versioning)

## Design Philosophy

This theme changes Hexo's default design logic: the **homepage shows no article list** — instead it displays identity-focused modules like About and Timeline. The concept of "**Subpage**" replaces "Category": each subpage maps to a broad discipline and gets a top-level navbar entry; within a subpage, posts are aggregated by tags.

This defines the theme's audience: bloggers who want a homepage that showcases personal identity **and** need clear domain boundaries across multi-discipline content. If the description isn't intuitive, browse the [demo site](https://zycwer.github.io/hexo-theme-tranquility/) — it should become obvious. If you don't have this need, another Hexo theme might be a better fit.

See [Design Philosophy](https://docs.qwrcb.top/docs/design) for details.

## License

[MIT](./LICENSE)
