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

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```
