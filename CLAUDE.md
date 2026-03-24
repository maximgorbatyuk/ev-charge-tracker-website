# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for the EV Charge Tracker iOS app. Built with Astro 6, deployed to GitHub Pages at `evchargetracker.app`.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Production build to ./dist/
npm run preview   # Preview production build locally
```

## Architecture

**Framework**: Astro 6 (static site, no client-side framework)
**Styling**: Single global CSS file (`src/styles/brutalism-style.css`) with CSS custom properties — brutalism design system
**Deployment**: GitHub Actions → GitHub Pages (auto-deploys on push to `main`)

### Layout & Pages

- `src/layouts/BaseLayout.astro` — shared HTML shell with SEO meta, Open Graph, Twitter cards, Google Analytics, JSON-LD schemas. Accepts props: `title`, `description`, `ogUrl`, `ogImage?`, `themeColor?`, `includeJsonLd?`. Has a `jsonld` named slot for page-specific structured data.
- `src/pages/index.astro` — landing page, composes all section components
- `src/pages/privacy-policy.astro` — privacy policy with page-specific scoped styles

### Components

All in `src/components/`. Each is a section of the landing page:
- `Hero.astro` — app icon, heading, badges, CTA buttons
- `Showcase.astro` — image carousel (vanilla JS) + feature cards. Contains the only client-side JavaScript in the project
- `Callout.astro` — purple CTA banner
- `Legal.astro` — privacy notice
- `Footer.astro` — 3-column grid footer (shared between both pages)
- `GoogleAnalytics.astro` — GA4 scripts (`G-VEWM0XYMMH`), uses `is:inline`

### Static Assets

All in `public/`:
- `assets/` — app icon (PNG) and 4 app screenshots (WebP)
- `CNAME` — custom domain for GitHub Pages (`evchargetracker.app`)
- `robots.txt` — with sitemap reference
- `favicon.ico`

### Reference Template

`template/` contains the original static HTML/CSS that the Astro site was built from. Keep as reference.

## Key Conventions

- **No style changes** to `brutalism-style.css` without explicit approval — it's a verbatim copy of the design template
- External links with `target="_blank"` must include `rel="noopener noreferrer"`
- Images need `width`/`height` attributes (CLS prevention) and `loading="lazy"` for below-fold images
- Google Analytics scripts require `is:inline` directive (gtag pattern breaks with Astro bundling)
- JSON-LD schemas use the `jsonld` named slot in BaseLayout for page-specific structured data
- App Store ID: `6754165643`
