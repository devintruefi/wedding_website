# Patel Wedding · Room Chart

A live, beautiful display of the room chart for the Patel & Patel wedding at One&Only Moonlight Basin (June 25–28, 2026). Pulls live data from a published Google Sheet and renders a true top-down floor plan view of every guest room.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom One&Only-inspired palette)
- Server-side fetch with `revalidate = 60` for live data
- Cormorant Garamond + Inter via `next/font`
- Deployed on Vercel

## Data source

The site reads from a published CSV in the master Google Sheet. Update assignments in the sheet and the site refreshes automatically every 60 seconds.

CSV URL is set in `lib/data.ts`. The sheet must remain published to web for it to load.

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Deploy

Pushed automatically to Vercel on every commit to `main`.
