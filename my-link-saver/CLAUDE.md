# CLAUDE.md

## What I am building
A personal link saver. Users can paste a URL, give it a title and optional tags, 
and see all saved links in a list. They can delete links. No login required.

## Tech stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS for styling
- Supabase for the database (PostgreSQL)
- Deployed on Vercel

## Folder structure rules
- Pages go in /app/
- Reusable components go in /components/
- Database queries go in /lib/db.ts
- All API routes go in /app/api/

## Code style rules
- Use TypeScript everywhere
- Use async/await, never .then()
- API responses always return: { success: boolean, data?: any, error?: string }
- Use Tailwind CSS classes only — no custom CSS files

## Current status
Project just created. Nothing built yet.

## What NOT to change without asking me
- Nothing yet — project is empty