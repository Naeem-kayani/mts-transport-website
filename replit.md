# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### MTS - Mani Transport Service (`artifacts/mts-website`)
- **Type**: React + Vite web app
- **Preview Path**: `/`
- **Description**: Full 7-page transport booking website for MTS (Mani Transport Service) in Rawalpindi, Pakistan
- **Pages**: Home, About, Services, Routes, Fleet, Contact, FAQ
- **Admin**: Basic admin section at `/admin/login` (credentials: admin@mts-transport.com / admin123)
- **Features**: Sticky navbar, floating WhatsApp button, floating Send Message button, framer-motion animations, filterable routes, fleet carousel, FAQ accordions, contact form
- **Color Scheme**: Crimson Red (#DC143C) primary, white backgrounds, Poppins font
- **No backend** — pure frontend, all data is hardcoded/local state
