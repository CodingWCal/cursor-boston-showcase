# Vibe Marketing Platform

A curated editorial showcase for **Cursor Boston × Hult** cohort members' best weekly builds. Think Stripe Press meets Are.na — warm, minimal, typography-forward. Not a portfolio directory.

Built over one week using AI-assisted engineering (OpenCode + Claude Code).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with editorial design tokens |
| Database | SQLite via Prisma v7 + better-sqlite3 driver adapter |
| Auth | NextAuth.js v5 with GitHub OAuth |
| Validation | Zod |
| Utilities | clsx, tailwind-merge |
| Deployment | Vercel (recommended) |

## Design System

- **Colors**: Warm off-white background (`#F8F6F3`), dark mode (`#1A1A1A`), blue accent (`#2563EB`)
- **Typography**: Inter (sans), JetBrains Mono (mono) via `next/font/google`
- **Borders**: `#E5E2DC` / `#333333` — no box-shadows, borders only
- **Radius**: 0-4px editorial sharp; 9999px pill only on tech stack tags
- **Tokens**: 16 custom properties via Tailwind v4 `@theme` directive in `globals.css`

All design tokens are defined in `src/app/globals.css` and available as Tailwind classes (`bg-vibe-bg`, `text-vibe-accent`, `border-vibe-border`, etc.).

## Features

- **Editorial project grid** — 2-column card layout with gradient fallbacks, tech tags, member attribution
- **Project detail pages** — full-bleed hero, markdown description, tech badges, member links
- **Member profiles** — bio, social links, associated projects
- **Member directory** — grid of current members and alumni
- **Dark mode** — system-aware with manual toggle, persisted in localStorage
- **Admin CRUD** — GitHub-authenticated editors can create/edit/delete projects
- **Responsive** — mobile-first with breakpoints at 768px
- **SEO** — per-page metadata, semantic HTML

## Prisma Schema

Four models — `Member`, `Project`, `ProjectMember` (explicit join table), `Editor`:

- `Member` — cohort member with avatar, bio, social links, status (active/alumni)
- `Project` — weekly build with JSON strings for `images` and `techStack` (SQLite limitation)
- `ProjectMember` — many-to-many join with cascade deletes
- `Editor` — GitHub-authenticated admin users

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env vars
cp .env.local.example .env.local

# 3. Create GitHub OAuth App
# Visit https://github.com/settings/developers
# Set callback URL to http://localhost:3000/api/auth/callback/github
# Fill GITHUB_ID, GITHUB_SECRET, and NEXTAUTH_SECRET in .env.local

# 4. Push schema and seed data
npx prisma db push
npx tsx prisma/seed.ts

# 5. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Seed Data

Three sample projects are seeded automatically:

| Project | Tech Stack | Member |
|---------|-----------|--------|
| Odyssey Travel Planner | Next.js 14, Prisma, Supabase, Leaflet, Clerk | Calvin Van |
| Automated Hedge Fund | Python, FastAPI, Redis, Docker, scikit-learn | Alex H. |
| Vibe Marketing Platform | Next.js 15, Tailwind CSS v4, Prisma, SQLite, NextAuth.js | Calvin Van |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts, Header, Footer
│   ├── page.tsx            # Homepage — hero + featured grid
│   ├── loading.tsx         # Skeleton loading state
│   ├── error.tsx           # Error boundary
│   ├── globals.css         # Tailwind v4 + design tokens
│   ├── projects/           # Project list & detail pages
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── members/            # Member directory & profiles
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   └── admin/              # Admin CRUD (auth-gated)
│       ├── page.tsx
│       └── projects/
│           ├── new/
│           │   └── page.tsx
│           └── [slug]/
│               └── page.tsx
├── components/
│   ├── Header.tsx          # Site header with nav
│   ├── Footer.tsx          # Site footer
│   ├── ProjectCard.tsx     # Project card with gradient fallback
│   ├── Skeleton.tsx        # Loading skeleton + card skeleton
│   └── ThemeToggle.tsx     # Dark mode toggle
├── lib/
│   ├── prisma/
│   │   └── db.ts           # Prisma client singleton with LibSQL adapter (local file or Turso)
│   └── utils/
│       ├── cn.ts           # clsx + tailwind-merge
│       ├── formatDate.ts   # Date formatting
│       └── slugify.ts      # URL slug generation
└── types/
    └── index.ts            # Re-exported Prisma types
```

## Database Notes

- **Local dev**: Uses local SQLite file (`dev.db`) via `@libsql/client` — zero config
- **Production**: Uses **Turso** (serverless SQLite) via the same LibSQL adapter — swap `DATABASE_URL` only
- Prisma v7 uses a driver adapter pattern — `PrismaLibSql` wraps the LibSQL client
- `DATABASE_URL` goes in `prisma.config.ts`, not `schema.prisma`
- `String[]` not supported — `images` and `techStack` stored as JSON strings, parse with `JSON.parse()` / `JSON.stringify()`

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Set the following environment variables in the Vercel dashboard:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Turso DB URL (e.g. `libsql://your-db.turso.io`) |
| `DATABASE_AUTH_TOKEN` | Your Turso auth token |
| `GITHUB_ID` | GitHub OAuth App client ID |
| `GITHUB_SECRET` | GitHub OAuth App client secret |
| `NEXTAUTH_SECRET` | Random string for session encryption |
| `NEXTAUTH_URL` | Your Vercel deployment URL |
| `NEXT_PUBLIC_APP_URL` | Your Vercel deployment URL |

### Production Database (Turso)

1. **Install Turso CLI**: `npm i -g turso`
2. **Login**: `turso auth login`
3. **Create DB**: `turso db create cursor-boston-showcase`
4. **Get URL**: `turso db show cursor-boston-showcase --url`
5. **Get token**: `turso db tokens create cursor-boston-showcase`
6. **Push schema**: `DATABASE_URL="libsql://..." DATABASE_AUTH_TOKEN="..." npx prisma db push`
7. **Seed data**: `DATABASE_URL="libsql://..." DATABASE_AUTH_TOKEN="..." npx tsx prisma/seed.ts`

## License

MIT — built by Calvin Van for Cursor Boston × Hult 2026.
