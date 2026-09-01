# Maple Bowl

Maple Bowl is a trilingual pet food, nutrition and better-living guide.
The current MVP is built with static display data and is designed for
deployment on Vercel.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- next-intl

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000. The root route negotiates a locale from the
browser/system preference and falls back to `/zh`.

## Deployment configuration

Set these public environment variables in the deployment environment:

```text
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
NEXT_PUBLIC_CONTACT_EMAIL=<your-real-address>
```

Replace both example values before deployment. `NEXT_PUBLIC_SITE_URL` is used for canonical URLs, alternate language links,
Open Graph URLs, sitemap and robots. It falls back to `http://localhost:3000`
in local development. The contact link is omitted when
`NEXT_PUBLIC_CONTACT_EMAIL` is not configured.

The MVP uses static TypeScript content. Product and brand records may be
marked as draft and must be rechecked before factual public publication.
Brand artwork currently lives in `public/brand/`; image provenance and usage
permission must be confirmed before launch.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

The generated `/sitemap.xml` includes published locale and entity routes. The
generated `/robots.txt` keeps search query URLs out of crawling, while search
metadata also marks the search page as non-indexable.
