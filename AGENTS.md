# AGENTS.md

# Maple Bowl — Coding Agent Instructions

This file defines project-wide implementation constraints for AI coding agents and human contributors.

When implementation details conflict with this file, prefer the rules in this file unless a task explicitly updates the project architecture.

---

## 1. Project Stack

Use the established stack:

```text
Next.js
TypeScript
Tailwind CSS
shadcn/ui
next-intl
```

Deployment target for the public application is Vercel. Prefer
Next.js/Vercel-compatible rendering, static content and server-side
patterns unless a feature requires client-side behavior.

Do not replace a core technology without explicit instruction.

Do not introduce a competing UI framework or CSS system.

Avoid adding:

```text
Material UI
Chakra UI
Ant Design
Bootstrap
CSS-in-JS libraries
another utility CSS framework
```

unless explicitly requested.

---

## 2. Application Structure

The public application is multilingual from V1.

Supported locales:

```text
en
fr
zh
```

Simplified Chinese is the primary content and UI language for the first
release. English and French remain first-class locales in the architecture.
Translate ordinary content into Chinese whenever natural; for brands,
product names and technical terms, use Chinese plus the original name when
helpful, and preserve the original as a searchable alias.

Use locale-aware routing under:

```text
app/[locale]/
```

Conceptual URLs:

```text
/en/...
/fr/...
/zh/...
```

Do not implement multilingual support as a later translation patch.

The current locale should be represented in the URL.

Use `next-intl` for UI translations, locale-aware navigation and locale
configuration. Do not create a second ad-hoc translation system.

---

## 3. UI System

The source of truth for visual rules is:

```text
ui-design.md
```

or the repository location containing `ui-design.md`.

Follow that document before introducing new visual patterns.

### UI responsibility boundaries

```text
Next.js
→ routing, rendering, layouts, metadata

Tailwind CSS
→ layout, spacing, responsive styling, typography utilities

shadcn/ui
→ accessible UI primitives and interaction behavior

Maple Bowl components
→ brand expression and domain-specific components
```

---

## 4. Styling Rules

Prefer semantic shadcn theme tokens.

Use:

```text
bg-background
text-foreground
bg-card
text-card-foreground
bg-primary
text-primary-foreground
bg-secondary
bg-muted
text-muted-foreground
border-border
ring-ring
```

Do not casually use arbitrary brand values inside components.

Avoid:

```tsx
className="bg-[#D34336]"
className="text-[#3A2E22]"
className="p-[22px]"
className="rounded-[13px]"
```

Prefer:

```tsx
className="bg-primary text-primary-foreground"
className="p-6"
className="rounded-lg"
```

Arbitrary values require a concrete design reason.

---

## 5. Tailwind Rules

Use Tailwind's built-in scales before creating custom values.

Prefer standard:

```text
spacing
font sizes
grid
flex
breakpoints
width/height
radius
shadows
```

Do not create a parallel spacing system unless necessary.

Responsive behavior should be implemented with Tailwind breakpoints.

Mobile is a first-class target.

---

## 6. shadcn/ui Rules

Before implementing a primitive UI component, check whether shadcn/ui already provides it.

Prefer existing primitives for:

```text
Button
Card
Badge
Dialog
DropdownMenu
Popover
Select
Sheet
Tabs
Accordion
Tooltip
Command
Breadcrumb
Input
Checkbox
Separator
```

Do not create duplicate implementations without a strong reason.

It is acceptable to compose or style shadcn primitives into Maple Bowl domain components.

Do not treat shadcn's default appearance as the final product design.

---

## 7. Component Architecture

Separate primitives from domain components.

Suggested structure:

```text
components/
├── ui/
├── brand/
├── navigation/
├── product/
└── content/
```

Examples of domain components:

```text
ProductCard
BrandCard
NutritionTable
IngredientList
SourceList
PetPreference
LanguageSwitcher
MascotCallout
```

Do not prematurely create generic abstractions for components that are only used once.

Prefer composition over configuration-heavy mega-components.

---

## 8. Design Consistency

Do not invent a new design language for an individual page.

Reuse existing:

```text
colors
spacing rhythm
typography hierarchy
button variants
card patterns
border treatment
radius
icons
interaction behavior
```

When a needed pattern does not exist, add it intentionally to the design system rather than silently introducing a one-off style.

---

## 9. Brand Visual Direction

Maple Bowl should feel:

```text
warm
friendly
trustworthy
informational
calm
playful in moderation
```

Avoid making the website feel like:

```text
a discount e-commerce site
an affiliate review farm
a generic SaaS dashboard
a generic shadcn starter
a children's toy website
```

The primary visual palette is maple cream, forest green, warm brown,
maple red, sunrise orange and sage green. Maple red and orange are
accents, not the background of every component.

Use warm neutral surfaces and generous whitespace.

---

## 10. Typography

Typography must support:

```text
English
French
Simplified Chinese
```

Do not make layout assumptions based only on English string length.

French labels may be substantially longer.

Chinese paragraphs may require different line-height density.

Use the project font configuration and `next/font`.

Do not introduce page-specific font families.

---

## 11. Internationalization

Multilingual support is architectural.

Always distinguish:

```text
translation
localization
market-specific data
```

They are not interchangeable.

Core entities such as:

```text
Brand
Product
Ingredient
Nutrition Topic
```

should not be duplicated merely because content exists in multiple languages.

Language-neutral structured data should be stored once where possible.

Localized content should reference the same underlying entity.

---

## 12. Pet Preference

V1 supports lightweight preference without user accounts.

Conceptual values:

```ts
type PetPreference = "dog" | "cat" | "both" | "unset";
```

Preference may influence:

```text
content ordering
recommended guides
featured products
default species filters
search ranking
```

Preference must not:

```text
hide public content
change permissions
require authentication
create a user identity
change canonical content
```

Guiding rule:

> Preference affects ranking, not access.

---

## 13. Language Preference

Language preference is separate from pet preference.

Conceptual locale:

```ts
type Locale = "en" | "fr" | "zh";
```

The URL is the source of truth for the current locale.

A cookie may remember the preferred locale, but canonical/indexable content must not depend only on that cookie.

Language switching should preserve the current conceptual page/entity where possible.

---

## 14. Server and Client Components

Prefer Server Components by default.

Use Client Components only when required for:

```text
browser state
interactive controls
effects
event handlers
client-only APIs
```

Do not add `"use client"` to large page trees merely for convenience.

Keep client boundaries small.

---

## 15. Data Fetching

Prefer server-side data access for public content pages where practical.

Avoid fetching data on the client when the same information can be rendered server-side.

Preserve:

```text
SEO
performance
cacheability
stable rendering
```

Personalization should enhance the page without making core public content client-only.

---

## 16. Accessibility

Do not remove accessible behavior supplied by shadcn/Radix primitives.

All interactive UI should support:

```text
keyboard navigation
focus visibility
labels
semantic HTML
reasonable touch targets
```

Do not communicate important state through color alone.

---

## 17. Icons

Prefer one consistent icon family compatible with the project, typically Lucide.

Do not mix several icon libraries.

Custom visual assets are reserved primarily for:

```text
Maple Bowl logo
paw/maple motifs
Maple & Milo
brand illustrations
```

---

## 18. Content UI

Product and nutrition pages are informational first.

Avoid:

```text
universal numeric product ratings
aggressive pros/cons templates
fake urgency
promotional badges everywhere
unsupported health claims
```

Facts, editorial notes and sources should be visually distinguishable.

---

## 19. Performance

Avoid unnecessary dependencies.

Do not install a package for functionality that is trivial to implement with the existing stack.

Prefer:

```text
Server Components
static/server rendering
optimized images
small client bundles
lazy loading where meaningful
```

Do not optimize prematurely at the expense of clarity, but avoid obviously wasteful patterns.

---

## 20. Dependency Rules

Before adding a dependency:

1. verify the existing stack does not already solve the problem;
2. verify shadcn/Radix does not already provide the primitive;
3. prefer small, established dependencies;
4. avoid overlapping libraries.

Do not change package versions, framework versions or package managers without task-specific reason.

---

## 21. Code Style

Use TypeScript.

Prefer clear domain naming over clever abstraction.

Use:

```text
Brand
Product
Ingredient
NutritionTopic
PetPreference
Locale
```

rather than ambiguous names such as:

```text
Item
Thing
DataObject
Stuff
```

Keep components focused.

Prefer explicit code when abstraction would obscure product logic.

---

## 22. File and Naming Conventions

Follow the repository's established conventions.

For new React component files, prefer descriptive names consistent with the codebase.

Do not rename large directory trees merely for aesthetic preference.

Avoid unrelated refactoring during focused feature tasks.

---

## 23. Testing Expectations

For important UI changes, verify at minimum:

```text
mobile layout
desktop layout
EN
FR
ZH
keyboard interaction
empty/loading states where applicable
```

For reusable domain components, test representative long French strings and realistic Chinese content—not placeholders only.

---

## 24. Agent Behavior

Before implementing:

1. inspect existing related components;
2. inspect the design tokens/theme;
3. reuse established patterns;
4. identify whether a shadcn primitive already exists;
5. keep the requested change focused.

Do not silently redesign adjacent parts of the application.

Do not introduce speculative future architecture unless it is necessary for the current task.

If a task exposes a missing shared pattern, prefer updating the relevant shared component/design rule rather than copying a one-off solution.

---

## 25. Core Implementation Principle

> **Consistency beats novelty.**

For ordinary UI work, prefer:

```text
existing Maple Bowl component
→ existing shadcn primitive
→ Tailwind standard utility
→ new shared pattern
→ arbitrary one-off style only as a last resort
```

The desired result is a site where the 50th page looks as intentional as the first page without requiring a redesign.
