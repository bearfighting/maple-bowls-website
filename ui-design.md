# Maple Bowl — UI Design System

> Status: Draft v0.1  
> Target stack: **Next.js + TypeScript + Tailwind CSS + shadcn/ui + next-intl**  
> Supported locales from V1: **简体中文优先 / English / Français**

---

# 1. Purpose

This document defines the visual and interaction language for Maple Bowl.

The goal is not to create a large enterprise design system. The goal is to establish enough shared rules that:

- every page feels like the same product;
- AI coding agents do not invent new visual styles per component;
- shadcn/ui components can be reused without producing a generic “shadcn-looking” site;
- English, French and Chinese layouts remain visually coherent;
- future pages and product features can reuse the same system.

The system has three layers:

```text
1. shadcn semantic tokens
2. Maple Bowl brand tokens
3. Tailwind utilities for layout and spacing
```

## 1.1 Current visual reference

The primary visual reference is the existing `maplebowls.png` homepage
design. Use `maple-bowls.png` as supplementary brand guidance. The
existing `favicon.png` remains the favicon, and `home-logo.png` remains
the homepage hero visual unless a later asset decision replaces it.

The implementation should preserve the reference's cream canvas,
forest-green sections and actions, warm brown text, maple-red/orange
accents, rounded illustrated content blocks and shared dog/cat bowl
motif. It should not drift into a generic shadcn dashboard aesthetic.

---

# 2. Design Principles

## 2.1 Warm, not commercial

Maple Bowl should feel like a warm, trusted pet-food and better-living guide rather than a promotional store.

Use warm backgrounds, restrained brand color and generous whitespace.

Avoid:

- sale-banner aesthetics;
- excessive bright-red surfaces;
- aggressive CTA density;
- noisy gradients;
- oversized shadows;
- excessive card nesting.

## 2.2 Friendly, not childish

Mascots and illustrations can be playful, but information architecture and typography should remain calm and credible.

## 2.3 Information first

Nutrition tables, ingredient lists, source references and product facts prioritize clarity over decorative styling.

## 2.4 Semantic styling

Components should use semantic tokens:

```text
bg-background
text-foreground
bg-primary
text-primary-foreground
border-border
bg-muted
text-muted-foreground
```

Avoid arbitrary values such as:

```text
bg-[#D34336]
text-[#3A2E22]
rounded-[13px]
p-[22px]
```

unless there is a documented design reason.

## 2.5 Trilingual by design

Do not design using English-only assumptions. Validate Chinese first for
the primary experience, then verify English and French expansion.

Every important component must be tested in:

```text
EN
FR
ZH
```

French often produces longer labels. Chinese often creates denser, shorter labels and requires different line-height rhythm.

---

# 3. Technology Mapping

## 3.1 Next.js

Next.js owns:

- application structure;
- routing;
- layouts;
- server rendering;
- locale routes;
- metadata;
- content/data loading.

`next-intl` owns UI translation messages, locale-aware navigation and
request-scoped locale configuration. Domain entities keep their own
localized content fields.

Suggested structure:

```text
app/
├── [locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── nutrition-guide/
│   ├── food/
│   ├── brands/
│   ├── reviews/
│   ├── recipes/
│   ├── videos/
│   └── tools/
```

## 3.2 Tailwind CSS

Tailwind owns:

- layout;
- spacing;
- responsive behavior;
- typography utilities;
- sizing;
- grid/flex;
- common interaction states.

Use the standard Tailwind scale whenever possible.

Do not create a parallel custom spacing system unless Tailwind cannot express the requirement cleanly.

## 3.3 shadcn/ui

shadcn/ui owns low-level accessible UI primitives and interaction behavior.

Preferred examples:

```text
Button
Badge
Card
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

shadcn is an implementation primitive, not the Maple Bowl visual identity.

## 3.4 Maple Bowl domain components

Business-facing components live above shadcn primitives.

Suggested organization:

```text
components/
├── ui/
│   └── shadcn primitives
│
├── brand/
│   ├── logo.tsx
│   ├── mascot-callout.tsx
│   └── maple-milo.tsx
│
├── navigation/
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   ├── language-switcher.tsx
│   └── pet-preference.tsx
│
├── product/
│   ├── product-card.tsx
│   ├── product-hero.tsx
│   ├── nutrition-table.tsx
│   └── ingredient-list.tsx
│
└── content/
    ├── article-card.tsx
    ├── source-list.tsx
    ├── key-takeaways.tsx
    └── editorial-callout.tsx
```

---

# 4. Color System

## 4.1 Brand primitives

Initial working palette:

```css
:root {
  --maple-red: #D34336;
  --maple-red-dark: #B8322A;
  --sunrise-orange: #F6A623;

  --forest-green: #1F4E3A;
  --sage-green: #A1B88E;
  --cream: #F8F1E7;
  --cream-soft: #FFF9EF;

  --brown-900: #3A2E22;
  --brown-700: #574438;
  --brown-500: #806A5A;
  --brown-300: #BDAF9F;
  --brown-100: #EDE3D6;

  --white: #ffffff;
}
```

These are brand primitives, not the primary API used by components.

The current reference artwork uses maple cream, forest green, warm brown,
maple red, sunrise orange and sage green. Approximate brand primitives:

```css
--maple-red: #D34336;
--sunrise-orange: #F6A623;
--forest-green: #1F4E3A;
--warm-brown: #3A2E22;
--maple-cream: #F8F1E7;
--sage-green: #A1B88E;
```

These should be mapped into semantic tokens and not used directly in
ordinary component classes.

## 4.2 shadcn semantic tokens

The implementation should map brand primitives into the shadcn semantic system.

Working direction:

```css
:root {
  --background: 40 56% 98%;
  --foreground: 22 24% 14%;

  --card: 0 0% 100%;
  --card-foreground: 22 24% 14%;

  --popover: 0 0% 100%;
  --popover-foreground: 22 24% 14%;

  --primary: 150 43% 21%;
  --primary-foreground: 40 56% 98%;

  --secondary: 39 47% 95%;
  --secondary-foreground: 22 24% 14%;

  --muted: 35 30% 94%;
  --muted-foreground: 22 19% 41%;

  --accent: 4 63% 52%;
  --accent-foreground: 0 0% 100%;

  --border: 26 25% 85%;
  --input: 26 25% 85%;
  --ring: 150 43% 21%;

  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 100%;

  --radius: 0.75rem;
}
```

Adapt syntax to the Tailwind/shadcn version used by the project.

## 4.3 Color usage

### Page background

Use warm off-white:

```text
bg-background
```

### Primary surface

Use:

```text
bg-card
```

### Quiet section

Use:

```text
bg-muted
```

or a project-specific soft brand surface.

### Brand emphasis

Use:

```text
bg-primary
text-primary
border-primary
```

sparingly.

Brand red should not dominate every section.

## 4.4 Suggested page rhythm

Homepage example:

```text
Hero                  warm cream
Start Here            white
Nutrition Guide        soft cream
Brands                 white
Maple & Milo           soft brand accent
Newsletter             pale sage / cream
Footer                 forest green
```

Prefer section-level background rhythm over placing every section inside cards.

---

# 5. Typography

## 5.1 Typography goals

Typography should be:

- friendly;
- highly readable;
- suitable for long-form articles;
- stable across English, French and Chinese;
- clear in dense product/nutrition UI.

## 5.2 Font roles

Use at most two primary roles:

```text
Display / headings
Body / UI / data
```

A practical implementation may use one unified sans-serif family plus locale-aware fallbacks.

Possible Latin choices:

```text
Inter
Nunito Sans
Manrope
```

Chinese fallback:

```text
Noto Sans SC
```

The final selection should avoid a strong stylistic mismatch between Latin and CJK rendering.

## 5.3 Next.js font loading

Prefer `next/font`.

Avoid ad-hoc `<link>` font loading inside individual pages.

## 5.4 Type scale

Use Tailwind's standard size scale.

Recommended semantic mapping:

```text
Display
text-5xl md:text-6xl
font-bold
tracking-tight

H1
text-4xl md:text-5xl
font-bold
tracking-tight

H2
text-3xl md:text-4xl
font-semibold
tracking-tight

H3
text-xl md:text-2xl
font-semibold

Body
text-base
leading-7

Lead
text-lg
leading-8

Small
text-sm
leading-6

Caption
text-xs
leading-5
```

Avoid inventing many page-specific font sizes.

## 5.5 Chinese typography

Chinese is the primary content language for the first release. Allow
locale-specific adjustment where necessary.

Conceptually:

```css
html:lang(zh) {
  /* slightly more generous line height may be applied */
}
```

Do not force Chinese text into the exact visual density of English paragraphs.

---

# 6. Spacing

## 6.1 Use Tailwind scale

Preferred common values:

```text
1  = 4px
2  = 8px
3  = 12px
4  = 16px
5  = 20px
6  = 24px
8  = 32px
10 = 40px
12 = 48px
16 = 64px
20 = 80px
24 = 96px
```

## 6.2 Common patterns

Component internal gap:

```text
gap-2
gap-3
gap-4
```

Card/content padding:

```text
p-4
p-5
p-6
```

Major section spacing:

```text
py-12
py-16
md:py-20
lg:py-24
```

Page horizontal padding:

```text
px-4
sm:px-6
lg:px-8
```

## 6.3 Rules

Prefer:

```text
p-6
gap-4
py-16
```

over:

```text
p-[23px]
gap-[19px]
py-[71px]
```

Arbitrary spacing should be exceptional.

---

# 7. Layout

## 7.1 Containers

Suggested project-specific values:

```css
:root {
  --content-width: 80rem;
  --article-width: 46rem;
  --wide-content-width: 90rem;
  --header-height: 4.5rem;
}
```

Equivalent Tailwind utilities/components may be preferred.

## 7.2 Page container

Typical page:

```tsx
<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
```

## 7.3 Article width

Long-form reading should use a narrower measure than product directories.

Example:

```text
max-w-3xl
```

## 7.4 Grids

Use responsive CSS grid.

Typical product grid:

```text
1 column mobile
2 columns small/medium
3 columns desktop
4 only where content density remains comfortable
```

Do not force four-column layouts merely to show more content.

---

# 8. Radius, Borders and Shadows

## 8.1 Radius

Use shadcn's base radius and derived values.

Working value:

```text
--radius: 0.75rem
```

Suggested usage:

```text
Buttons          medium
Cards            medium/large
Callouts         large
Badges           pill
```

Avoid excessive `rounded-3xl` usage across the entire product.

## 8.2 Borders

Borders should usually be subtle.

Use:

```text
border-border
```

Product-data components often benefit more from clear borders than shadows.

## 8.3 Shadows

Keep shadows restrained.

Preferred hierarchy:

```text
shadow-none
shadow-sm
shadow-md
```

Large dramatic shadows should be rare.

---

# 9. Buttons

## 9.1 Variants

V1 standard variants:

```text
default / primary
secondary
outline
ghost
link
destructive
```

Reuse shadcn Button variants rather than creating one-off buttons.

## 9.2 Primary button

Use for:

- primary page CTA;
- confirmed selection;
- important conversion/action.

Do not fill informational pages with red primary buttons.

## 9.3 Secondary / outline

Use for:

- alternate navigation;
- compare;
- explore;
- non-primary actions.

## 9.4 Ghost

Use in:

- navigation;
- toolbars;
- low-emphasis actions.

## 9.5 Button sizing

Use standard component sizes.

Avoid page-specific button heights.

Minimum touch target should remain accessible on mobile.

---

# 10. Cards

## 10.1 Card philosophy

Cards represent meaningful grouped objects.

Examples:

- Product;
- Brand;
- Guide;
- Ingredient summary.

Do not wrap every paragraph or section inside a Card.

## 10.2 Product Card

Minimum visible information:

```text
Product image
Brand
Product name
Species
Food type
```

Avoid adding too many metadata rows until comparison needs justify them.

## 10.3 Brand Card

Prefer:

```text
Logo / mark
Brand name
Origin
Short descriptor
```

## 10.4 Article Card

Prefer:

```text
Image optional
Category
Title
Short summary
```

---

# 11. Navigation

## 11.1 Header

The header should remain calm and compact.

Reference desktop navigation:

```text
Logo | Nutrition Guide | Product Reviews | Brands | Recipes | Videos | Tools | Search | Language | Newsletter
```

Recipes, Videos and Tools may be marked “Coming soon” until their
content or interaction is ready. Their presence should not create dead
or misleading primary actions.

Required V1 controls:

```text
Logo
Primary navigation
Search
Pet preference
Language switcher
Mobile menu
```

## 11.2 Language switcher

Prefer shadcn `DropdownMenu`.

Options:

```text
English
Français
简体中文
```

Switching locale should preserve the conceptual page/entity where possible.

## 11.3 Pet preference

Use `DropdownMenu` or `Popover`.

Options:

```text
Dogs
Cats
Both
```

This is a content preference, not an account/profile control.

## 11.4 Mobile navigation

Use shadcn `Sheet`.

Do not create a separate visual language for mobile.

---

# 12. Forms and Filters

Use shadcn primitives wherever practical.

Preferred primitives:

```text
Input
Select
Checkbox
RadioGroup
Switch
Popover
Command
```

Filters should remain usable with:

- keyboard;
- touch;
- long French labels;
- Chinese text;
- small mobile screens.

Mobile product filters may move into a `Sheet`.

---

# 13. Product and Nutrition UI

## 13.1 Product facts

Product facts should visually read as reference information.

Use:

- aligned labels;
- clear units;
- restrained separators;
- semantic badges.

## 13.2 Nutrition table

Avoid marketing-style charts unless they genuinely improve interpretation.

Support:

```text
minimum
maximum
percentage
unit
missing value
manufacturer not provided
```

## 13.3 Ingredient list

Ingredient text should remain readable as text.

Where ingredients map to known entities, links may be added without making the paragraph visually noisy.

## 13.4 Sources

Source references should be visible but low-emphasis.

Use a consistent Source List component.

---

# 14. Mascots and Illustration

Maple and Milo may appear in:

- hero areas;
- onboarding;
- educational callouts;
- empty states;
- media modules.

Do not use mascot illustrations inside every informational section.

Mascot callouts should be distinguishable from factual manufacturer information.

---

# 15. Icons

Use one consistent icon system.

Prefer the icon set used by shadcn-compatible components (for example Lucide).

Do not mix multiple outline/icon families unless required by brand artwork.

Use custom icons only for:

- Maple Bowl identity;
- paw/maple motifs;
- Maple & Milo.

---

# 16. Responsive Design

Mobile is a first-class V1 target.

Every core component must be tested for:

```text
long English product names
long French navigation labels
Chinese typography
nutrition tables
filter controls
ingredient lists
language switcher
pet preference switcher
```

Avoid desktop-only hover-dependent functionality.

---

# 17. Accessibility

Minimum expectations:

- semantic HTML;
- keyboard navigation;
- visible focus states;
- appropriate labels;
- sufficient contrast;
- alt text for meaningful images;
- decorative illustrations marked appropriately;
- accessible form validation;
- minimum touch targets;
- no color-only status communication.

Prefer shadcn/Radix behavior where it provides accessible interaction primitives.

---

# 18. Motion

Motion should be subtle.

Use for:

- dropdown/sheet/dialog transitions;
- small hover transitions;
- soft state changes.

Avoid:

- constant mascot motion on reading pages;
- large parallax;
- animated gradients;
- distracting page transitions.

Respect reduced-motion preferences.

---

# 19. Dark Mode

Dark mode is not a V1 requirement unless implementation cost is effectively negligible.

Do not compromise the core warm-light Maple Bowl identity merely to support dark mode early.

If added later, implement through semantic tokens rather than component overrides.

---

# 20. Implementation Rules

## Required

Use:

```text
semantic shadcn tokens
Tailwind spacing/layout scale
shared variants
shared domain components
existing shadcn primitives
locale-aware typography
```

## Avoid

Do not casually introduce:

```text
arbitrary hex colors
arbitrary spacing
arbitrary radius
duplicate Button implementations
duplicate Card implementations
page-specific design systems
inline style objects for ordinary UI
hard-coded English-width assumptions
```

## Guiding rule

> **Maple Bowl uses shadcn/ui semantic CSS variables for theming, Tailwind CSS utilities for layout and spacing, and a small layer of Maple Bowl brand tokens for identity-specific values. Avoid arbitrary values unless no existing token or Tailwind scale fits the requirement.**

---

# 21. Review Checklist

Before merging a new UI component, verify:

- Does it reuse an existing shadcn primitive where appropriate?
- Does it use semantic colors?
- Does it use the Tailwind spacing scale?
- Does it avoid unnecessary arbitrary values?
- Does it work in EN / FR / ZH?
- Does it work on mobile?
- Is keyboard/focus behavior correct?
- Does it look consistent with Maple Bowl rather than generic shadcn?
- Is the component reusable, or is it unnecessarily abstract?
