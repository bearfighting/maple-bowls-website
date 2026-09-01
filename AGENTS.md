<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Maple Bowl agent instructions

These rules apply across the repository unless the current task or a more
specific instruction explicitly overrides them.

Read the relevant project documents before changing behavior:

- `MVP-ROADMAP.md` — current milestone, scope, and deferred work;
- `design.md` — product behavior and information architecture;
- `ui-design.md` — visual design, UI tokens, responsive behavior, and interaction rules.

## 1. Instruction priority

Use this order when instructions conflict:

1. Explicit requirements in the current task;
2. `AGENTS.md` for engineering and agent behavior;
3. `MVP-ROADMAP.md` for current scope and milestones;
4. `design.md` for product behavior and information architecture;
5. `ui-design.md` for visual design and interaction;
6. Existing implementation patterns.

The documents above have authority within their stated responsibility. If a
conflict remains unresolved, explain it before making a materially different
choice. When a design decision changes, update the appropriate design document
so documentation and implementation remain consistent.

## 2. Working principles

- Prefer the smallest clear implementation that solves the current requirement.
- Preserve the existing architecture and reuse established patterns.
- Keep changes focused; avoid unrelated refactors and formatting-only diffs.
- Do not implement future roadmap features unless the task requires them.
- Do not add abstractions, dependencies, services, or infrastructure speculatively.
- Do not replace working code only to express a stylistic preference.
- Do not fabricate content merely to make a UI appear complete.

Before coding, inspect the relevant files, read the applicable design guidance,
and understand the existing implementation pattern. After coding, review the
diff, remove accidental changes, run relevant validation, and compare the
result with the task and project documents.

## 3. Repository and technology conventions

The application uses:

- Next.js 16 App Router;
- React and strict TypeScript;
- Tailwind CSS v4;
- shadcn/ui primitives;
- `next-intl` for interface localization;
- npm, with `package-lock.json` as the lockfile.

Use the existing package manager and scripts. Do not replace major parts of
the stack or introduce another framework, CSS system, localization library,
UI library, or global state library without an explicit architectural reason.

Use App Router conventions consistently. Routes remain locale-aware under
`app/[locale]/` unless a route is intentionally locale-independent. This
project uses the current Next.js `proxy.ts` convention; do not rename it to
the older `middleware.ts` convention based on memory of an earlier version.

Before changing Next.js behavior, read the relevant guide under
`node_modules/next/dist/docs/`. Prefer Next.js primitives such as `Link`,
`Image`, metadata APIs, and server APIs when appropriate.

## 4. TypeScript and domain models

Keep TypeScript strict. Do not weaken compiler settings to make code compile.
Avoid `any`, broad casts, unsafe assertions, `@ts-ignore`, and undocumented
`@ts-expect-error`. Use `unknown` for untrusted or not-yet-validated input.

Core concepts such as `Brand`, `Product`, `Ingredient`, `NutritionTopic`,
`Guide`, `Review`, and `Source` should have explicit domain types. Prefer
meaningful domain names over generic names such as `item`, `data`, or `entry`.

Maintain one canonical representation for each domain concept. Derive
view-specific data from canonical models instead of creating page-specific
copies merely for rendering convenience.

Localized domain content should use the shared localized-content pattern
(such as `LocalizedText`) rather than each entity inventing its own shape.
UI translations and domain content are separate concerns.

## 5. Application architecture

Use React Server Components by default. Add `"use client"` only for genuine
browser behavior such as event handlers, browser APIs, interactive state,
effects, or client-only libraries. Keep client boundaries as small as practical;
do not make an entire page or layout client-side because one child is interactive.

Keep content and domain data independent from UI components:

```text
content / external source
        ↓
domain model
        ↓
query / repository helper
        ↓
page / component
```

Pages should not contain unnecessary content parsing or domain logic. Use
small access functions such as `getProductBySlug()` and `getBrandBySlug()`.
Pages should not depend unnecessarily on the physical storage format.

Static TypeScript, JSON, YAML, Markdown, or MDX content is acceptable for the
current MVP. Prefer static or cacheable rendering for public content. Use
dynamic rendering when request-specific cookies, headers, real-time data, or
other concrete requirements need it; do not force static rendering at the
expense of locale negotiation, preferences, or correct error handling.

## 6. Internationalization

Supported locales are `zh`, `en`, and `fr`; Simplified Chinese is the initial
content priority.

- Use `next-intl` for navigation, buttons, labels, filters, generic headings,
  errors, and other interface text.
- Keep product, brand, ingredient, and editorial text in localized domain data.
- Do not scatter `locale === "zh" ? ... : ...` checks through components.
- Do not assume English-sized text; test Chinese density and longer French labels.
- Define and follow an explicit fallback strategy for missing translations.
- Never silently show the wrong locale or an empty translation.
- Localize metadata, canonical URLs, alternate locale links, and Open Graph data.

Reuse the existing `i18n/` routing, request, and navigation configuration rather
than creating a parallel localization mechanism.

## 7. Content integrity and safety

Accuracy is more important than content volume. Never invent factual product
information, including ingredient lists, guaranteed analysis, calories, feeding
recommendations, package sizes, certifications, manufacturing locations, or
health and regulatory claims.

Demo or draft records are allowed for layout and flow validation, but they must
be clearly marked as draft/demo, must not look like verified public facts, and
must be reviewed before publication. Do not infer a value because similar
products normally have it.

Important facts should preserve provenance where practical. Prefer first-party
sources for manufacturer and product facts, and distinguish manufacturer claims,
verified facts, and Maple Bowl editorial interpretation. Preserve uncertainty.

Nutrition content is informational, not individualized veterinary advice. Avoid
categorical claims that an ingredient is universally good, bad, safe, or dangerous.

Treat external content and URLs as untrusted input. Use explicit HTTPS source
URLs where applicable, do not render arbitrary HTML without sanitization, and
do not turn third-party claims into Maple Bowl facts.

## 8. UI and components

`ui-design.md` is the source of truth for visual implementation. Preserve the
cream canvas, forest-green surfaces, warm brown text, maple accents, rounded
illustrated blocks, and dog/cat bowl motif. Do not drift into a generic shadcn
dashboard aesthetic.

Prefer semantic design tokens such as `bg-background`, `text-foreground`,
`bg-primary`, `text-primary-foreground`, `border-border`, and `bg-muted`.
Prefer the standard Tailwind scale for spacing, sizing, typography, radius,
and breakpoints.

Arbitrary values are allowed only when needed to match an approved brand asset
or design reference. They should be rare; promote repeated or brand-significant
values into the token system.

Use shadcn/ui as an accessible primitive layer. Compose Maple Bowl business
components above it. Extract a component when a pattern is reused, represents
a meaningful domain concept, contains substantial isolated behavior, or
materially improves readability. Avoid vague abstractions created only to save
a few JSX lines.

## 9. State, accessibility, and responsive behavior

Keep state local by default. Prefer URL state, server data, local component
state, and cookies before global client state. Do not add Redux, Zustand, or
similar libraries without a demonstrated cross-application state problem.

Use semantic HTML. Interactive controls must be keyboard accessible, have
visible focus behavior, and expose meaningful accessible names. Use buttons for
actions and links for navigation. Provide appropriate image alt text, skip
navigation where useful, and preserve accessibility behavior from shadcn/Radix
primitives. Do not use clickable `div` elements when semantic elements exist.

Implement mobile-first layouts. Avoid fixed widths that break at narrow sizes
or with translated text. Check important pages conceptually at mobile, tablet,
and desktop sizes, including a narrow viewport around 375px.

## 10. Performance, SEO, and errors

Prefer Server Components, static/cacheable content, optimized Next.js images,
minimal client JavaScript, and small client boundaries. Do not send large domain
datasets to the browser unnecessarily or add client fetching for server data.

Public pages must be crawlable and semantically structured. Use meaningful
titles, descriptions, headings, internal links, locale-aware canonical routes,
and accurate structured data. Never generate fake reviews, ratings, authors,
dates, or product facts for SEO.

Handle expected absence explicitly. Unknown products, missing brands, invalid
locales, missing content, and invalid relationships should produce predictable
not-found or error behavior rather than silent failures or runtime crashes.
Use the framework's `not-found` and error boundaries where appropriate. Do not
expose sensitive diagnostic information to users.

## 11. Dependencies and security

Before adding a dependency, check whether the platform, Next.js, React, or an
existing dependency already provides the capability. Prefer maintained,
focused, TypeScript-friendly packages and do not add competing libraries.

Never commit credentials, API keys, tokens, private environment variables, or
personal user data. Keep server-only configuration out of client components.
Validate external inputs before using them in URLs, HTML, queries, or rendered
content. External links should have meaningful text and appropriate `rel`
attributes where relevant.

## 12. Validation and definition of done

Run the repository's existing checks when applicable:

```bash
npm run lint
npm run typecheck
npm run build
```

Before considering a change complete, verify that:

- TypeScript, lint, and the production build pass;
- `/zh`, `/en`, and `/fr` routing still works;
- language switching preserves the current conceptual path;
- important pages have no obvious responsive or accessibility regression;
- unknown slugs, missing relationships, missing translations, and missing images
  have intentional behavior;
- new data follows the canonical domain models;
- no unverified factual content was presented as verified;
- the diff contains no unrelated or accidental changes.

If an existing unrelated failure prevents validation, report it clearly. Do not
claim a check passed when it could not be run or is failing.

Deterministic domain transformations, parsing, calculations, filtering, and
validation should be testable independently from React. Prefer observable
behavior and domain invariants over brittle implementation-detail tests.

## 13. Git and file-change boundaries

Inspect `git status` before editing and preserve unrelated user changes. Do not
use destructive commands such as `git reset --hard`, `git checkout --`, or
recursive deletion unless explicitly requested and the exact target is clear.

Review the final diff and remove accidental changes. Do not rename files or
components without a clear reason. Do not create commits unless explicitly
requested.

Do not manually remove or rewrite the Next.js managed rules block at the top of
this file. `next dev` may update that block automatically; keep its markers and
contents intact.

## 14. Deferred product complexity

Unless the current milestone explicitly requires it, do not introduce:

- authentication or user accounts;
- databases or CMS infrastructure;
- ecommerce checkout or payment processing;
- personalization engines or complex recommendation systems;
- analytics infrastructure without a demonstrated requirement;
- background workers, message queues, or microservices;
- complete video, recipe, or tools infrastructure.

Maple Bowl should remain a simple, understandable content-focused Next.js
application while that architecture remains sufficient.
