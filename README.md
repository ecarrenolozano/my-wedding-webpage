# Boda Wedding Page

Premium bilingual wedding website starter built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Current status

The project includes:

- `src/config/site.config.ts` for centralized editable site content
- `src/content/i18n/` for lightweight dictionary-based translations
- `src/components/` for homepage composition, hero section, and language switcher
- `src/app/` for the App Router entry points and global styles

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Recommended next build slice

- Add event overview, schedule, and venue sections
- Replace placeholder content in `site.config.ts`
- Build the RSVP flow as a separate multi-step experience

## Supabase heartbeat

This repo includes a daily heartbeat to reduce the risk of Supabase Free pausing the project for inactivity.

Files involved:

- `supabase/schema.sql` adds `public.project_heartbeat`
- `src/app/api/cron/heartbeat/route.ts` exposes a protected endpoint
- `.github/workflows/heartbeat.yml` calls that endpoint once per day and also supports manual runs

Required setup:

1. Add `CRON_SECRET` to Vercel environment variables.
2. Add GitHub Actions secrets:
   - `SITE_URL` with your production URL, for example `https://your-site.vercel.app`
   - `CRON_SECRET` with the same exact value used in Vercel
3. Apply the SQL changes from `supabase/schema.sql` in your Supabase project.
