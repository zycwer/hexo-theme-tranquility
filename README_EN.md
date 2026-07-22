<p align="center">
  <a href="./README.md">中文</a> · <strong>English</strong>
</p>

<h1> <div align="center"><img align="center" height="40" src="source/images/tranquility.svg"/> Tranquility</div></h1>

<p align="center">A Hexo theme designed for personal homepages and multi-discipline bloggers.</p>

<p align="center">
<a href="https://github.com/zycwer/hexo-theme-tranquility/releases"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/zycwer/hexo-theme-tranquility?label=release&color=orange"></a>
<a href="https://hexo.io/"><img src="https://img.shields.io/badge/Hexo-%3E%3D8.0.0-blue?logo=hexo"></a>
<a href="https://github.com/zycwer/hexo-theme-tranquility/blob/main/LICENSE"><img src="https://img.shields.io/github/license/zycwer/hexo-theme-tranquility"></a>

<img src="./doc/images/index-ios-3.jpg"/>
</p>

> **💡 Fork Notice**
>
> This repository is a fork of [hooozen/hexo-theme-tranquility](https://github.com/hooozen/hexo-theme-tranquility). The original repository was archived in June 2026 and is no longer maintained. This fork continues maintenance, adding features and fixing bugs on top of the original.
>
> Major changes compared to the original repo:
>
> - Hitokoto Slogan toggle
> - Article-driven timeline (replaces config-defined events)
> - Hexo native about page (replaces config-defined content)
> - Build-time RSS-aggregated "Recent Updates" cards
> - Runtime dark mode (CSS variables — no rebuild needed to switch)
> - Open Graph / Twitter Card / JSON-LD structured data
> - Sitemap (sitemap.xml), robots.txt, RSS auto-discovery
> - PWA (manifest.json + Service Worker), lazy image loading
> - Back-to-top button, `prefers-reduced-motion` accessibility degradation
> - Font loading optimization (`font-display: swap` + preload)
> - Code simplification (scripts directory -23%); removed the CV feature (duplicated by the about page)
> - Security hardening (fixed XSS / `</script>` injection / localStorage fallback, etc.)
> - Removed the deprecated Gitalk comments feature
>
> See [Releases](https://github.com/zycwer/hexo-theme-tranquility/releases) for details.

## Demo Sites

- [Tranquility](https://theme.hozen.site/tranquility/) (original theme demo)
- [Hozen's Homepage](https://www.hozen.site)

## Features

- Homepage-style layout focused on personal branding
- Supports a [pure homepage mode](#site-mode) (no articles, aggregates external blog RSS)
- ["Subpage" design](#subpage) for multi-discipline writing
- [Recent Updates](#recent-updates-rss-aggregation) cards aggregating external blog RSS at build time — stable loading in mainland China
- [About page](#about-page) (Hexo native page) and [Timeline](#timeline) (article-driven, click to view details)
- [Hitokoto](#hitokoto-slogan) slogan that refreshes on every page load
- [Dark mode](#dark-mode) (light/dark/scheduled/follow-browser, one-click toggle in the navbar)
- [Open Graph](#open-graph--twitter-card) social cards, [JSON-LD](#json-ld-structured-data) structured data, [sitemap](#sitemap), [robots.txt](#robotstxt), [RSS auto-discovery](#rss-auto-discovery), and [PWA](#pwa-installable-app) support
- [Back-to-top button](#back-to-top-button), [accessibility motion degradation](#accessibility-prefers-reduced-motion), [font loading optimization](#font-loading-optimization)
- Responsive across desktop, tablet, and mobile for comfortable reading
- Custom font extraction and subsetting, balancing aesthetics and performance
- [Related posts](#related-posts), [math formulas](#math-formulas), [reward](#post-reward), [SEO](#others)
- and more

-----

## Table of Contents

- [Features](#features)
- [Demo Sites](#demo-sites)
- [Installation](#installation)
- [Upgrade](#upgrade)
- [Design Philosophy](#design-philosophy)
  - [The Change](#the-change)
- [Configuration](#configuration)
  - [Hitokoto (Slogan)](#hitokoto-slogan)
  - [Dark Mode](#dark-mode)
  - [Site Mode](#site-mode)
  - [Subpage](#subpage)
  - [Timeline](#timeline)
  - [About Page](#about-page)
  - [Recent Updates (RSS Aggregation)](#recent-updates-rss-aggregation)
  - [Open Graph & Twitter Card](#open-graph--twitter-card)
  - [JSON-LD Structured Data](#json-ld-structured-data)
  - [Sitemap](#sitemap)
  - [robots.txt](#robotstxt)
  - [RSS Auto-Discovery](#rss-auto-discovery)
  - [PWA (Installable App)](#pwa-installable-app)
  - [Code Highlighting](#code-highlighting)
  - [Math Formulas](#math-formulas)
  - [Homepage Customization](#homepage-customization)
  - [Navigation](#navigation)
  - [Footer Customization](#footer-customization)
  - [Tag Cloud](#tag-cloud)
  - [Post Cover](#post-cover)
  - [Table of Contents](#table-of-contents-1)
  - [Sticky Posts](#sticky-posts)
  - [Post Reward](#post-reward)
  - [Related Posts](#related-posts)
  - [Custom Fonts](#custom-fonts)
  - [Mermaid Enhancement](#mermaid-enhancement)
  - [Search](#search)
  - [Post Excerpt](#post-excerpt)
  - [Back-to-Top Button](#back-to-top-button)
  - [Accessibility (prefers-reduced-motion)](#accessibility-prefers-reduced-motion)
  - [Font Loading Optimization](#font-loading-optimization)
  - [Others](#others)

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

4. Theme configuration:
    Copy `themes/tranquility/_config-template.yml` to your blog's root directory and rename it to `_config.tranquility.yml`. Personalize the theme by editing `_config.tranquility.yml`. See [Configuration](#configuration) below or read the comments in the config file.

5. Troubleshooting (for non-developers):
    Reading error messages helps locate issues quickly. For example:

    - Missing dependencies

      As the theme evolves, it may depend on more third-party modules. Users need to add new dependencies themselves. For example:

      ```log
      ...
      Error: Cannot find module 'a_third_module'
      ...
      ```

      The message clearly indicates the `a_third_module` module is missing — just install it:

      ```bash
      npm install a_third_module
      ```

      See [npm-install | npm Docs](https://docs.npmjs.com/cli/v8/commands/npm-install)

## Upgrade

The theme is continuously iterated. When you encounter issues, check whether the theme has been updated. Upgrade steps:

- Pull updates in the theme directory:

    ```bash
    cd themes/tranquility
    git pull
    ```

- Read the [release notes](https://github.com/zycwer/hexo-theme-tranquility/releases), and check `themes/tranquility/_config-template.yml` for new or modified options. Update your `_config.tranquility.yml` accordingly.

## Design Philosophy

This theme changes Hexo's default design logic, so it works differently from most Hexo themes. Please read the following carefully.

Most Hexo themes are designed for **pure blogging**, where a blogger's content is typically concentrated in a single discipline (e.g. internet technology). Driven by this need, most themes display an article list on the homepage and use numerous Categories for subdivision. This design serves that use case well.

When a user wants a homepage that showcases personal identity and needs **clear** domain boundaries across blog content, those themes fall short. The "Tranquility" theme was created for this audience — and defines its target users accordingly.

### The Change

The homepage does not display an article list. Instead, it shows identity-focused modules like "About" and "Timeline".

The concept of "Subpage" replaces "Category". All subpages have a top-level entry in the navigation bar. A subpage should represent a broader scope — typically a major discipline or domain. For example, all internet-technology posts should belong to one subpage, whether they're "frontend" or "backend".

For posts within the same subpage, the theme borrows WeChat Official Account's classification logic and uses Tags for classification and aggregation. Thus, the theme **removes** the default Category concept and entry, replacing it with "Subpage" and "Tag".

If the description here isn't clear enough, open the [demo site](https://www.hozen.site) and browse around — it should become obvious. If this change doesn't resonate with you, you may not have this need, and another Hexo theme might be a better fit.

## Configuration

After [installation](#installation), you should have a `_config.tranquility.yml` file in your blog's root directory. If not, review the [installation steps](#installation). Unless otherwise stated, all configuration in this section is done in `_config.tranquility.yml` at the blog root.

You can find test articles for every configuration option on the [Tranquility demo site](https://theme.www.hozen.site/tranquility/), and the corresponding config in the [hooozen/hexo-theme-test](https://github.com/hooozen/hexo-theme-test) repository. When a config option is unclear, look for the matching example there.

### Hitokoto (Slogan)

The `slogan` shown at the top of the homepage (e.g. "宁静致远" — "Tranquility Begets Distance"). When `slogan_hitokoto` is enabled, this spot will fetch from the [hitokoto.cn](https://v1.hitokoto.cn) API in the browser, displaying a random quote that may change on every refresh:

```yml
slogan: "宁静致远"        # static slogan, used as fallback when hitokoto fails / JS disabled
slogan_hitokoto: false   # enable to show a random hitokoto quote at the slogan position
```

Notes:

- The hitokoto content is fetched client-side from `https://v1.hitokoto.cn/`. At build time, the static `slogan` is still rendered into the HTML, so it's **SEO-friendly and visible even without JS or on fetch failure** (automatic fallback to the static slogan).
- 5-second timeout; failures fall back silently without affecting the rest of the page.
- When enabled, this position automatically switches to system Song serif fonts (not the extracted subset font) to avoid font interleaving caused by random characters not present in the subset.

### Dark Mode

The theme ships with runtime dark mode (built on CSS variables — **no rebuild needed to switch**). Four strategies are supported, controlled by `color_mode`:

```yml
color_mode: light  # light | dark | auto | time
color_mode_time:   # only effective when color_mode: time
  start: 18        # dark starts (24h, inclusive)
  end: 6           # dark ends (24h, exclusive; cross-midnight supported, e.g. 18→6)
```

| Mode | Behavior |
| --- | --- |
| `light` | Always light (default) |
| `dark` | Always dark |
| `auto` | Follows the browser's `prefers-color-scheme`; reacts in real time when the system theme changes |
| `time` | Dark during the `color_mode_time.start` ~ `end` window; light otherwise |

A ☾/☀ toggle button sits on the right side of the navbar: clicking it instantly switches the theme and persists the choice to `localStorage` (`theme-override`). **Manual override takes precedence over the configured strategy.** Clearing browser storage reverts to the configured strategy.

Implementation notes:

- An inline synchronous script in the head sets `data-theme` before CSS loads, preventing FOUC (flash of unstyled content on switch).
- In `auto` mode, the script listens to `matchMedia('(prefers-color-scheme: dark)')` `change` events, so the theme follows system changes automatically (unless a manual override exists).
- All colors are defined as CSS variables in `source/css/_theme.styl`. `_variables.styl` maps Stylus variables to `var(--c-*)`, so existing styles respond to dark mode without per-rule changes.

### Site Mode

Switch the overall site form via `homepage_mode`:

```yml
# blog    = default blog theme (navigation shows subpage/blog entries)
# landing = pure personal homepage mode (hides blog/subpage entries, focuses on about, timeline, and recent updates)
homepage_mode: blog
```

The `landing` mode suits the scenario of "this site has no articles; articles are hosted on a separate blog": the navigation no longer shows blog/subpage entries, and the homepage focuses on the personal intro (about block), recent updates (aggregated from an external blog RSS — see [Recent Updates](#recent-updates-rss-aggregation)), and timeline (see [Timeline](#timeline)). Best used together with [About page](#about-page) and [Recent Updates](#recent-updates-rss-aggregation).

Note: `landing` mode only hides navigation entries. Existing article pages are still generated (just not linked). If you want to skip generating blog pages entirely, point `source` to an empty directory or remove `source/_posts` in your blog's root `_config.yml`.

### Subpage

Subpages are configured under `subpage`:

```yml
subpage: # enable "subpage" feature, see README
  enable: true  # whether to enable subpages
  pages:  # subpage array
    - name: # subpage identifier, e.g. developer
      path: # defaults to name if not set
      title: # menu label shown in the navbar, e.g. Developer
      icon: # icon path
      description: # description
```

When subpages are disabled (`enable: false`), the navbar shows only a single "Blog" button that leads to the full article list.

When enabled (`enable: true`), the `pages` array must be configured. Each entry uses `name` as its identifier. `path` specifies the subpage URL (defaults to `name`). `title` is shown in the navbar. Once configured, all entries appear in the top navbar with their `title`, each linking to the corresponding subpage. `icon` and `description` configure the subpage's icon and description.

After creating a new post, set its `category` field to a subpage's `name` to assign it to that subpage.

### Timeline

The timeline is designed to showcase the blogger's **important** events or milestones — honors, publications, talks, etc.

You can also use it to feature selected posts or other content. The timeline supports custom configuration.

![timeline](doc/images/timeline.gif)

Timeline is configured under `timeline`:

```yml
timeline:
  enable: true  # whether to enable the timeline
  reversed_order: true # whether to show in reverse chronological order
  items:  # configure timeline categories
    - name: article  # category name
      color: "#ee936c"  # category theme color
      icon: /images/icon/icon-article.svg  # category icon
      checked: false  # whether shown by default
    - name: apps
      color: "#60a465"
      icon: /images/icon/icon-app.svg
      checked: true
    - name: event
      color: "#568dc4"
      icon: /images/icon/icon-event.svg
      checked: false
```

After setting the `timeline` field in a post's front-matter to a category name, that post appears in the timeline list. For example:

```yml
---
id: 57
title: How Many Winters
date: 2022-11-30 23:23:48
tags:
  - prose
categories: life  # belongs to the life subpage
cover: /assets/images/57-1.jpg
timeline: article  # appears in the timeline list
---
```

#### Events are article-driven

Timeline events are entirely driven by **articles**: set the `timeline` field in a post's front-matter (to one of the `items`' `name`), and the post will appear on the homepage timeline. Clicking the title opens the article for details. No need to define events separately in the config file — see the example above.

Changes to the timeline config **may require restarting the server** to take effect.

### About Page

The about page uses Hexo's native **Page** feature. Content is written in a markdown file — no need to fill it in the theme config.

1. Create `about/index.md` in your blog's `source` directory:

```markdown
---
title: About
layout: about
date: 2024-01-01 00:00:00
---

Here's my about page. Full markdown syntax is supported.

## Experience

- Content is written directly in the page file
- Rendered from markdown to HTML using the theme's `about` layout
```

2. Enable the nav entry in `_config.tranquility.yml`:

```yml
nav:
  sticky: false
  about: true   # show an "About" entry in the navbar, linking to /about/
```

The theme provides the `layout: about` page template, which renders the page title and markdown body, and automatically shows the blog RSS subscription link at the bottom (if [Recent Updates](#recent-updates-rss-aggregation) is enabled).

### Recent Updates (RSS Aggregation)

"Recent Updates" displays the latest posts from an **external blog** as cards on the homepage, browsable with left/right arrows (max 3). Ideal for `landing` mode: this site has no articles, but aggregates the latest from a separate blog onto the personal homepage.

```yml
recent_updates:
  enable: true
  rss_url: https://example.com/feed.xml  # blog RSS feed URL
  max_count: 3        # max number of cards (recommend <= 3)
  title: Recent Updates      # section title
  show_excerpt: true   # whether to show excerpts
  excerpt_length: 80   # max excerpt character count
```

#### How it works

The theme fetches and parses RSS **at build time during `hexo generate`** on the server, rendering post data directly into static HTML. Advantages:

- **No CORS issues**: the client doesn't need to make cross-origin RSS requests;
- **Stable loading in mainland China**: no dependency on third-party proxies (like rss2json, allorigins); the output is pure static HTML;
- **SEO-friendly**: post cards exist directly in the HTML.

> Fetch failures do not abort the build — they only print a warning and hide the "Recent Updates" section on the homepage. So even if the blog RSS is temporarily unreachable, the site still generates fine.
>
> Because data is fetched at build time, you need to **re-run `hexo generate`** after your blog updates to refresh the homepage cards (pair with CI/scheduled builds for automation).

#### RSS structure requirements

The theme ships with a lightweight parser (no extra dependencies) that supports both **RSS 2.0** and **Atom 1.0**. The default feeds generated by most blog systems (Hexo's `hexo-generator-feed`, WordPress, Ghost, Typecho, etc.) meet these requirements.

**RSS 2.0** — each `<item>` should contain:

| Field | Tag | Required | Notes |
| --- | --- | --- | --- |
| Title | `<title>` | Yes | Post title |
| Link | `<link>` | Yes | Post URL |
| Date | `<pubDate>` | Yes | RFC 822 format, e.g. `Mon, 15 Jan 2024 10:00:00 +0800` |
| Excerpt | `<description>` or `<content:encoded>` | No | Supports CDATA and HTML; tags are stripped and content truncated automatically |

**Atom 1.0** — each `<entry>` should contain:

| Field | Tag | Required | Notes |
| --- | --- | --- | --- |
| Title | `<title>` | Yes | Post title |
| Link | `<link href="..."/>` | Yes | Post URL (takes the `href` attribute) |
| Date | `<updated>` or `<published>` | Yes | ISO 8601 format, e.g. `2024-01-15T10:00:00Z` |
| Excerpt | `<summary>` or `<content>` | No | Supports CDATA and HTML; tags are stripped and content truncated automatically |

Example (RSS 2.0):

```xml
<rss version="2.0">
  <channel>
    <item>
      <title>My First Post</title>
      <link>https://example.com/post-1</link>
      <pubDate>Mon, 15 Jan 2024 10:00:00 +0800</pubDate>
      <description><![CDATA[<p>Post excerpt content.</p>]]></description>
    </item>
  </channel>
</rss>
```

> Recommended: install [`hexo-generator-feed`](https://github.com/hexojs/hexo-generator-feed) on your Hexo blog to generate RSS. Configure `feed: { type: atom, path: feed.xml, limit: 20 }` in your blog's root `_config.yml`, then point `recent_updates.rss_url` to that feed URL.

### Open Graph & Twitter Card

The theme automatically injects Open Graph and Twitter Card meta tags into every page, used by social platforms to render the title, description, and cover image when sharing (read by WeChat, Telegram, Twitter/X, Slack, Discord, etc.).

No extra configuration needed — tags are generated automatically:

- `og:type` — `article` on post pages, `website` elsewhere
- `og:title` / `og:description` — from the page title and description (posts use their excerpt)
- `og:url` — absolute URL of the page (generated via `full_url_for`)
- `og:site_name` — taken from `title` in your blog's root `_config.yml`
- `og:image` — priority: post `cover` → homepage `index.photo` → `logo`
- `twitter:card` — `summary_large_image` by default (when a cover exists) or `summary`

To customize the share image, set the `cover` field in a post's front-matter (used both as the post list cover and the share card image):

```yml
---
title: One of My Posts
cover: /assets/images/my-cover.jpg
---
```

> `og:image` is automatically converted to an absolute URL. If `cover` is already a full URL starting with `http(s)://`, it is used as-is.

### JSON-LD Structured Data

The theme automatically injects [schema.org](https://schema.org/) JSON-LD structured data based on the page type, helping search engines understand the site content (read by Google rich results):

| Page type | Schema type | Main fields |
| --- | --- | --- |
| About page (`layout: about`) | `Person` | name, url, email, logo |
| Post page | `Article` | headline, datePublished, dateModified, author, image, keywords |
| Other pages (homepage, subpages, etc.) | `WebSite` | name, url, description |

No configuration needed — data is read automatically from the theme config and post front-matter.

### Sitemap

The theme ships with a built-in `sitemap.xml` generator that produces a sitemap at build time, ready to submit to Google Search Console / Bing Webmaster / Baidu Zhanzhang.

```yml
sitemap:
  enable: true  # enabled by default; set to false to disable
```

The generated `sitemap.xml` includes:

- Homepage (`priority=1.0`, `changefreq=daily`)
- All posts (sorted by publish date descending, `priority=0.8`, `changefreq=weekly`, with `lastmod`)
- All pages (`priority=0.6`, `changefreq=monthly`)
- All category and tag archive pages (`priority=0.4`, `changefreq=weekly`)

All URLs are absolute (based on the `url` config in your blog's root `_config.yml`).

### robots.txt

The theme ships with a built-in `robots.txt` generator that produces a crawl-control file at build time, allowing search engines to crawl pages, blocking resource directories (CSS/JS/fonts), and declaring the sitemap URL.

```yml
robots:
  enable: true
  # disallow:  # custom paths to disallow indexing (defaults to /css/ /js/ /font/ if unset)
  #   - /css/
  #   - /js/
```

The generated `robots.txt` includes:

- `User-agent: *` / `Allow: /` — allow all crawlers to access the whole site
- `Disallow: /css/`, `/js/`, `/font/` — block pure-resource directories from being indexed as standalone resources
- `Sitemap: <absolute-url>/sitemap.xml` — auto-references the sitemap (unless sitemap is disabled)

### RSS Auto-Discovery

The theme injects an RSS auto-discovery tag into the `<head>` of every page:

```html
<link rel="alternate" type="application/rss+xml" title="..." href="https://example.com/feed.xml">
```

Browsers and RSS readers use this to auto-discover the site's feed, so readers can subscribe without manually entering the feed URL. The URL is taken from `recent_updates.rss_url` in the [Recent Updates](#recent-updates-rss-aggregation) config; if `recent_updates` is not configured, this tag is not injected (no side effects).

> Recommended: generate RSS on your Hexo blog via [`hexo-generator-feed`](https://github.com/hexojs/hexo-generator-feed), and point `recent_updates.rss_url` to the same URL — that way "Recent Updates cards" and "RSS auto-discovery" share one feed.

### PWA (Installable App)

The theme can generate the `manifest.json` and Service Worker (`sw.js`) required by Progressive Web Apps, enabling "Add to Home Screen", offline access, and static asset caching.

```yml
pwa:
  enable: false       # disabled by default; enable to generate manifest.json and sw.js
  name:               # full app name (defaults to site title if empty)
  short_name:         # short name under the home-screen icon (defaults to first 12 chars of name)
  description:        # app description
  display: standalone # standalone | fullscreen | minimal-ui | browser
  theme_color: "#fcfcfb"        # app theme color (matches the dark-mode light palette)
  background_color: "#fcfcfb"   # splash screen background color
```

When enabled:

- `manifest.json` generates its `icons` array from the `favicon` config (apple-touch-icon 180×180, favicon-32×32, svg).
- `sw.js` uses a "cache-first for static assets, network-first with cache fallback for HTML" strategy: JS/CSS/images/fonts are read from cache first; HTML pages prefer the network and fall back to cache on failure (so users can revisit pages they've already seen, even offline).
- The page automatically registers the Service Worker (only in production, HTTPS, or `localhost`) and sets `<meta name="theme-color">`.

> **Note**: PWA Service Workers can only be registered under **HTTPS** (except `localhost`). GitHub Pages, Vercel, Netlify, Cloudflare Pages, and most modern hosting platforms provide HTTPS by default, so they work out of the box.

### Code Highlighting

Code highlighting depends on the `highlight` config in your blog's **root** `_config.yml`. Configure as follows:

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

### Math Formulas

The theme offers two ways to enable LaTeX math formula support. Both require the following setup first:

- **Remove** Hexo's default markdown renderer `hexo-renderer-marked` and install `hexo-renderer-pandoc`. Remove any other markdown renderers as well!

  ```bash
  npm uninstall hexo-renderer-marked
  npm install hexo-renderer-pandoc
  ```

- Install pandoc from [pandoc.org](https://www.pandoc.org/).

**Method 1**: Use the theme's built-in LaTeX renderer. Enable `mathjax` in the config:

```yml
mathjax: true # load the LaTeX math library
```

**Method 2**: Use the third-party plugin [hexo-filter-mathjax](https://github.com/next-theme/hexo-filter-mathjax) for server-side rendering. Set `mathjax: false` in the config.

For performance, Method 2 is recommended.

### Homepage Customization

- See the `index` config option

### Navigation

- `nav.sticky` configures whether the navbar sticks to the top

### Footer Customization

- `foot.title` configures the footer tagline

- `foot.linksRows` configures the number of link rows, see [issue#44](https://github.com/hooozen/hexo-theme-tranquility/issues/44)

- `links` configures friend links

- `social` configures social accounts or other links

- `contacts` configures contact methods

### Tag Cloud

The tag cloud appears on each subpage's homepage to show the distribution of tags under that subpage. Two forms are available: a 3D animated cloud and a static tag cloud.

- `tagcloud.fancy` toggles the 3D animated cloud
- Other `tagcloud` options configure the 3D cloud, see [tagcloud](https://hexo.io/docs/helpers#tagcloud)

### Post Cover

- Configure the cover image for posts in the article list by setting the `cover` field in the post's front-matter to the image URL

### Table of Contents

- Show the post's table of contents by setting `toc: true` in the post's front-matter. Recommended for posts with deep hierarchical structure; can be turned off for prose and text-heavy posts

### Sticky Posts

- Use a number in the `sticky` field to pin a post. Larger numbers mean higher priority. Numbers must be greater than `0`.

### Post Reward

- Configure post reward via the `reward` option, including avatar, QR code, and text

### Related Posts

Related posts show recommended posts at the bottom of each article.

- First install the dependency:

    ```bash
    npm install hexo-related-popular-posts
    ```

- Configure via the `related_post` option. See the [plugin docs](https://github.com/tea3/hexo-related-popular-posts) for details.

### Custom Fonts

Some areas of the theme use third-party CJK fonts for design. Because CJK font files are large, the theme extracts and packages only the glyphs actually used into a subset font.

Toggle via the `zh_font` config option.

### Mermaid Enhancement

Mermaid is a JavaScript-based diagramming tool that parses Markdown-like text syntax to create and dynamically modify diagrams.

- First install the dependency:

    ```bash
    npm install hexo-filter-mermaid-diagrams
    ```

- Enable in the config:

    ```yml
    mermaid:
      enable: true # enable Mermaid
      version: 10.9.3 # pin the version to avoid breakage from upstream "latest"
      options:
        startOnload: true
    ```

- Now you can draw diagrams in markdown posts (GitHub renders them automatically — use a `mermaid` code block):

    ```mermaid
    graph LR
      A --> B
      A --> D
    ```

- To preview Mermaid rendering locally, you need a markdown compiler that supports Mermaid. For VS Code, install [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid).

- See the [Mermaid guide](http://mermaid.js.org/intro/) for usage details.

### Search

Enable the search feature via the theme config:

```yml
search:
  path: search.json
  enable: true
  field: post
  content: true
```

### Post Excerpt

As you may know, using `<!--more-->` in a markdown file truncates the post so the content before it becomes the excerpt shown in the article list. You can also set an `abstract` field in the [front-matter](https://hexo.io/docs/front-matter) for a hidden excerpt.

The `abstract` setting differs from an `excerpt` created via `<!--more-->`. The `abstract` content does not appear in the post body, and setting `abstract` overrides `excerpt` in the article list display.

The `abstract` feature behaves like WeChat Official Account's abstract.

```yml
---
title: Hidden Excerpt Test
date: 2024-01-27 11:58:32
tags: text
category: featTest
cover: assets/hozen-durdledoor.jpg
abstract: "This post tests the hidden excerpt feature. This text only appears in the article list, not in the post body."
---
```

### Back-to-Top Button

The theme provides a "back to top" button in the bottom-right corner of every page: it fades in after scrolling past one viewport height, and smoothly scrolls back to the top on click.

- No configuration needed — enabled automatically.
- Scroll listening is throttled with `requestAnimationFrame` to avoid high-frequency callbacks affecting scroll performance.
- Click scrolling respects the [Accessibility](#accessibility-prefers-reduced-motion) setting: when "reduce motion" is on, it uses instant positioning (`behavior: auto`) instead of smooth scrolling.

### Accessibility (prefers-reduced-motion)

The theme respects the OS "reduce motion" preference (`prefers-reduced-motion: reduce`), making it friendlier for users with vestibular sensitivity or motion sickness:

- Global degradation: all CSS animation and transition durations are compressed to `0.01ms`, and `scroll-behavior` is set to `auto`.
- Heart curve (HeartCurve): when this preference is detected, the `requestAnimationFrame` animation loop is skipped and only a single static frame is drawn.
- Back-to-top button: smooth scrolling degrades to instant positioning.

This behavior is automatic — no configuration needed. Enable "reduce motion" in your system settings to activate it.

### Font Loading Optimization

The theme optimizes loading of custom subset fonts (see [Custom Fonts](#custom-fonts)) to reduce FOUT (flash of unstyled text) and speed up text rendering:

- `font-display: swap`: system fonts render text first while the custom font loads, then seamlessly swap in — avoiding long blank periods.
- `<link rel="preload">`: the first font file is preloaded at high priority, fetched in parallel with CSS to shorten the critical rendering path.
- Font subsetting: only the glyphs actually used are packaged (see [Custom Fonts](#custom-fonts)), dramatically reducing font size.

No configuration needed — applied automatically when `zh_font.enable: true` is set.

### Others

For other config options, see the comments in the config file:

- Baidu SEO (`baidu_site_verification`, `baidu_analytics`)
- Google Analytics (`google_ad`)
- Algolia search (`algolia` — enable after replacing with real credentials)
- etc.

> Comments: the Gitalk comments feature built into the original theme has been removed in this fork (the original repo is archived, Gitalk is unmaintained and depends on GitHub OAuth). For comments, we recommend [giscus](https://giscus.app/) (based on GitHub Discussions) or [Waline](https://waline.js.org/) — embed the corresponding component via a custom `layout` or directly in a page file under `source`.
