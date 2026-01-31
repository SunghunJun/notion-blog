# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 14 blog using Notion as a headless CMS. Content is authored in Notion and automatically rendered as blog posts with Notion-style formatting.

## Environment Setup

Required environment variables in `.env.local`:
- `NOTION_API_KEY` - Notion integration API key
- `NOTION_DATABASE_ID` - Notion database ID containing blog posts
- `NEXT_PUBLIC_SITE_URL` - Site URL
- `NEXT_PUBLIC_SITE_NAME` - Blog name

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture

### Data Flow

1. **Notion Database** → Properties (Title, Slug, Date, Tags, Published, Description)
2. **Notion Page Content** → Markdown conversion via `notion-to-md`
3. **React Markdown** → HTML rendering with custom Notion-style components
4. **ISR** → Pages regenerate every 60 seconds

### Key Files

**`src/lib/notion.ts`**
- Notion API client initialization
- Data fetching functions: `getAllPosts()`, `getPostBySlug()`, `getAllPostSlugs()`
- Type transformations: Notion API → Post interface
- Markdown conversion using `notion-to-md`

**`src/app/page.tsx`**
- Homepage listing all published posts
- Server component with ISR (revalidate: 60)
- PostCard components for each post

**`src/app/posts/[slug]/page.tsx`**
- Individual post page (dynamic route)
- ReactMarkdown with custom Notion-style components
- Syntax highlighting via `rehype-highlight`
- Metadata generation for SEO

**`src/app/globals.css`**
- Notion-inspired styling
- System font stack for consistency with Notion UI
- Custom classes: `.notion-h1`, `.notion-h2`, `.notion-paragraph`, `.notion-list`, `.notion-quote`, `.notion-code-block`

### Content Rendering

Notion blocks are converted to markdown, then rendered using `react-markdown` with custom components:
- Headers (h1, h2, h3) → Notion-style headings
- Lists (ul, ol) → Notion-style lists
- Code blocks → Syntax highlighted with dark theme
- Blockquotes → Notion-style quotes with left border
- Inline code → Pink highlight like Notion

### Database Schema

Notion database must have these properties:
- **Title** (title) - Post title
- **Slug** (rich_text) - URL slug (e.g., "first-post")
- **Date** (date) - Publication date
- **Published** (checkbox) - Visibility toggle
- **Description** (rich_text) - Post summary (optional)
- **Tags** (multi_select) - Category tags (optional)

## Common Tasks

### Adding New Features

When adding features, maintain Notion-style consistency:
- Use system fonts (ui-sans-serif, -apple-system)
- Follow existing CSS variable patterns in `globals.css`
- Keep ISR revalidation at 60 seconds unless specific need

### Debugging Content Issues

Test Notion API connection:
```bash
node test-notion.js
```

Check markdown conversion:
```bash
node debug-content.js
```

### Styling Changes

Main CSS variables in `globals.css`:
- `--color-ink` - Text color
- `--color-paper` - Background color
- `--color-accent` - Link/accent color
- `--font-display`, `--font-body` - Typography (currently system fonts)

### Content Not Showing

1. Verify database is shared with integration (Notion → Database → "..." → Add connections)
2. Check `Published` checkbox is enabled
3. Ensure `Slug` property is filled
4. Wait 60 seconds for ISR revalidation or restart dev server

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **CMS**: Notion API (`@notionhq/client`)
- **Markdown**: `notion-to-md`, `react-markdown`
- **Syntax Highlighting**: `rehype-highlight`, `highlight.js`
- **Styling**: CSS (no framework, custom Notion-inspired styles)
- **TypeScript**: Strict mode enabled
