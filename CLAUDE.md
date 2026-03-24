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
**i18n**: Astro native routing, 7 locales (en, de, ru, tr, uk, kk, zh), EN has no URL prefix

### Layout & Pages

- `src/layouts/BaseLayout.astro` — shared HTML shell with SEO meta, OG, Twitter, GA, JSON-LD, hreflang links. Props: `title`, `description`, `ogUrl`, `lang?`, `ogImage?`, `themeColor?`, `includeJsonLd?`. Named slot `jsonld` for page-specific structured data.
- `src/pages/index.astro` — EN landing page
- `src/pages/privacy-policy.astro` — EN privacy policy
- `src/pages/{de,ru,tr,uk,kk,zh}/index.astro` — locale landing pages (thin wrappers)
- `src/pages/{de,ru,tr,uk,kk,zh}/privacy-policy.astro` — locale privacy policies (thin wrappers)

### Components

All in `src/components/`. Each is a section of the landing page:
- `Navbar.astro` — logo, nav links, functional language switcher dropdown
- `Hero.astro` — app icon, heading, badges, CTA buttons
- `Showcase.astro` — image carousel (vanilla JS) + feature cards. Contains the only client-side JavaScript in the project
- `Callout.astro` — purple CTA banner
- `Legal.astro` — privacy notice
- `Footer.astro` — 3-column grid footer (shared between both pages)
- `PrivacyPolicyContent.astro` — shared privacy policy body + styles (used by all locale privacy pages)
- `GoogleAnalytics.astro` — GA4 scripts (`G-VEWM0XYMMH`), uses `is:inline`

All section components accept a `lang` prop and use `t()` for translated strings.

### i18n

- `src/i18n/ui.ts` — `useTranslations(lang)` returns `t(key)` function, plus `getLocalizedPath()`, `getCurrentPath()`, locale maps
- `src/i18n/locales/{en,de,ru,tr,uk,kk,zh}.json` — translation files (~142 keys each)
- Astro i18n config in `astro.config.mjs` with `prefixDefaultLocale: false`
- EN pages live at root (`/`, `/privacy-policy/`), other locales at `/{locale}/`

**Adding a new locale:**
1. Add locale code to `locales` array and all maps in `src/i18n/ui.ts`
2. Add locale to `astro.config.mjs` (`i18n.locales` and `sitemap.i18n.locales`)
3. Create `src/i18n/locales/{locale}.json` (copy `en.json`, translate values)
4. Create `src/pages/{locale}/index.astro` and `privacy-policy.astro` (copy from any existing locale, change `lang` constant)

**Adding a new translation key:**
1. Add key+value to `en.json`
2. Add the same key to all other locale JSON files with translated values
3. Use `t('key.name')` in the component

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
- `is:inline` scripts cannot use Astro expressions like `t()` — build JSON-LD in frontmatter if translation is needed
- Translation JSON values must not contain smart/curly quotes (`"` `"`) — use straight quotes or corner brackets (`「」`) for CJK
- App Store ID: `6754165643`
