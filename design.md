# Maple Bowl --- V1 Product & Website Design Framework

> Status: Draft v0.2\
> Purpose: establish the complete product/design framework before
> validating individual decisions.\
> Principle: **framework first, refinement through implementation and
> real content.**

------------------------------------------------------------------------

## 0. Document Goals

This document defines the first complete design framework for Maple
Bowl. It is intentionally broader than the first implementation.

The document separates three concepts:

-   **V1 Foundation** --- decisions that should be reasonably stable
    before implementation.
-   **V1 MVP** --- functionality intended for the first public version.
-   **Future** --- explicitly anticipated directions that should not
    complicate V1.

This is a living design document. Sections may contain assumptions and
unresolved questions.

## 0.1 Current Project Decisions

The current implementation baseline is:

```text
Brand name       Maple Bowl
Technology       Next.js + TypeScript + Tailwind CSS + shadcn/ui
Deployment       Vercel
Primary visual   maplebowls.png
Supplementary    maple-bowls.png
Favicon          existing favicon.png
Homepage visual  existing home-logo.png
```

The visual direction in `maplebowls.png` has priority. It defines the
homepage composition, navigation density, cream background, forest-green
surfaces, warm typography, illustrated dog-and-cat bowl motif and the
initial content-navigation pattern. `maple-bowls.png` is used as a
supporting brand-board reference for logo variants, colors, characters,
typography and usage examples.

The first version uses static display data. Product, nutrition and
editorial content should be structured like realistic content, but any
unverified information is MVP draft content and must be reviewed before
public factual publication. No content-management or data-entry workflow
is required for the first implementation.

------------------------------------------------------------------------

# 1. Product Definition

## 1.1 Brand

**Maple Bowl**

Working brand descriptor:

> Better Food. Happier Pets.

Maple Bowl is the consumer-facing pet food, nutrition and better-living brand.

### Possible future brand structure

``` text
Maple Bowl
├── Pet Food & Nutrition
│   └── pet food, nutrition and better living
├── Maple & Milo
│   └── brand characters / educational storytelling
└── Future pet lifestyle categories
```

For V1, do not require users to understand a sub-brand architecture. The
website should primarily present **Maple Bowl**.

## 1.2 Product Positioning

Maple Bowl V1 is a pet food, nutrition and better-living guide with a
Canadian perspective.

It should help pet owners:

1.  understand pet nutrition;
2.  understand ingredients and food labels;
3.  discover brands and products;
4.  compare relevant food information;
5.  make more informed feeding decisions;
6.  discover practical recipes, reviews and tools as the content base grows.

The website is **not primarily an e-commerce store** and should not feel
like an affiliate-review farm.

## 1.3 Geographic Positioning

Canada is the starting point, not the permanent boundary.

Initial emphasis:

-   Canadian brands;
-   products manufactured or sold in Canada;
-   Canadian pet-food industry;
-   information useful to Chinese-speaking consumers interested in
    Canadian products.

Future content may cover products from other countries.

## 1.4 Audience

Primary early audiences:

-   ordinary dog and cat owners;
-   users trying to understand pet-food labels;
-   users researching pet-food brands/products;
-   Chinese-speaking consumers interested in Canadian pet food.

Secondary future audiences:

-   Canadian manufacturers;
-   retailers/distributors;
-   nutrition professionals;
-   international buyers.

## 1.5 Product Principles

### P1 --- Education before selling

Help users understand before asking them to buy anything.

### P2 --- Facts and editorial interpretation are separate

Clearly distinguish:

-   manufacturer claims;
-   structured factual data;
-   Maple Bowl explanation;
-   Maple Bowl opinion.

### P3 --- Recommend without fear-based marketing

Avoid exaggerated health claims, sensational ingredient warnings, and
unnecessary anxiety.

### P4 --- Preference affects ranking, not access

Dog/cat preference may personalize content order, but must not hide the
rest of the site.

### P5 --- Structured knowledge is a core asset

Brands, products, ingredients and nutrition concepts should form a
reusable information graph rather than isolated blog posts.

### P6 --- Canada is a perspective, not a database constraint

The information architecture must allow international expansion.

### P7 --- No account required in V1

Personalization should work without identity, login or profile creation.

### P8 --- Content should remain useful outside search engines

Design for reference value, internal navigation and repeat use---not
only SEO acquisition.

------------------------------------------------------------------------

# 2. V1 Scope

## 2.1 Core V1

V1 should support:

-   homepage;
-   first-visit dog/cat preference;
-   Nutrition Guide section;
-   nutrition guides;
-   ingredient pages;
-   pet-food directory;
-   brands directory;
-   brand pages;
-   structured product pages;
-   editorial articles and product reviews;
-   search;
-   responsive navigation;
-   basic multilingual architecture;
-   SEO fundamentals;
-   preference cookie;
-   About / methodology / privacy pages.

## 2.2 Language Requirement

V1 must support:

```text
English              en
French               fr
Simplified Chinese   zh
```

The application must be fully capable of rendering all core page types in all three languages from the first public version.

This does **not** mean every editorial article must be translated before publication.

Core UI, navigation, trust pages and primary catalog structures should be available in all three languages. Editorial coverage may be progressively translated.

## 2.3 V1 Content Target

Initial target, not a launch requirement:

  Content                   Target
  ----------------------- --------
  Nutrition guides           5--10
  Ingredient pages          10--20
  Brands                     5--10
  Products                  20--50
  Editorial/food guides      5--10

Start development with substantially fewer real records and expand after
validating the model.

## 2.4 Explicitly Out of Scope

Do not require for V1:

-   user accounts;
-   authentication;
-   user profiles;
-   user reviews;
-   comments/community;
-   shopping cart;
-   direct e-commerce;
-   subscriptions/paywall;
-   AI nutrition recommendations;
-   full personalized feeding plans;
-   native mobile app;
-   large recipe platform;
-   manufacturer portal.

------------------------------------------------------------------------

# 3. Brand & Visual System

## 3.1 Existing Identity Direction

The current Maple Bowl identity establishes:

-   paw + maple leaf mark;
-   dog and cat mascots;
-   warm off-white background;
-   deep forest-green and warm brown typography;
-   maple red and orange accents;
-   maple cream, sage green and warm off-white supporting tones;
-   friendly illustrated dog-and-cat food-bowl imagery.

The website should preserve this emotional character while making
content pages calmer and more information-dense.

## 3.2 Brand Personality

The interface should feel:

-   warm;
-   friendly;
-   trustworthy;
-   curious;
-   Canadian without becoming stereotypical;
-   educational without feeling clinical;
-   playful without looking childish.

## 3.3 Maple & Milo

Working character roles:

### Maple --- Dog

-   curious;
-   enthusiastic;
-   approachable;
-   represents common pet-owner questions.

### Milo --- Cat

-   observant;
-   slightly skeptical;
-   detail-oriented;
-   useful for explanations and "things worth knowing."

Characters can appear in:

-   onboarding;
-   homepage;
-   explanatory callouts;
-   empty states;
-   videos;
-   future animation.

They should **not** appear so frequently that long-form educational
content becomes visually noisy.

## 3.4 Color Roles

The current reference artwork uses a light maple-cream base with forest
green as the main supporting color, warm brown for readable text, and
maple red/orange as accents. The reference palette is approximately:

```text
Maple red       #D34336
Sunrise orange  #F6A623
Forest green    #1F4E3A
Warm brown      #3A2E22
Maple cream     #F8F1E7
Sage green      #A1B88E
```

These values should be mapped into semantic theme tokens rather than
used directly inside page components.

Semantic roles:

``` text
background            warm off-white
surface               white / cream
text-primary          dark brown
text-secondary        muted brown/gray
brand-primary         maple red
brand-secondary       warm tan
accent-soft           pale yellow/cream
success/info/etc.     restrained functional colors
```

Avoid making every component red. Maple red is an accent and brand
anchor.

## 3.5 Typography

Use two complementary roles:

-   **Display / brand:** Baloo 2 or a visually compatible rounded display typeface.
-   **Body / data:** Nunito or a similarly readable rounded UI typeface.

Product tables, ingredient lists and nutrition facts prioritize
legibility over personality.

## 3.6 Component Shape

Preferred direction:

-   moderate rounded corners;
-   soft borders;
-   restrained shadows;
-   generous whitespace;
-   card usage only where grouping is meaningful.

Avoid turning every piece of information into a floating card.

## 3.7 Photography

Product imagery:

-   neutral;
-   clean;
-   accurate packaging;
-   avoid misleading compositing.

Lifestyle imagery:

-   natural pets;
-   warm domestic environments;
-   food preparation/ingredients when educationally relevant.

Illustrations and photography should have clearly different roles.

## 3.8 Reference Brand Assets

The current project assets establish the visual reference for the first
implementation:

```text
maple-bowls.png  brand board, palette and usage examples
home-logo.png    homepage hero illustration
favicon.png      dog/cat/maple-bowl mark
maplebowls.png   homepage visual reference
```

The visual language is warm, illustrated and family-friendly, with the
dog and cat sharing a food bowl as the central brand motif. Use product
and nutrition UI to add credibility and structure around this playful
identity; do not make every page look like an illustration poster.

The supplied logo artwork and brand assets use the singular “Maple Bowl”
wordmark, which is the approved brand name for this project.

------------------------------------------------------------------------

# 4. Information Architecture

## 4.1 Primary Sitemap

``` text
Home

Nutrition Guide
├── Nutrition Basics
├── Ingredients Explained
├── Feeding
└── Food Safety

Pet Food
├── Dog Food
├── Cat Food
├── Food Types
└── Product Detail

Brands
├── All Brands
└── Brand Detail

Product Reviews
├── All Reviews
└── Review Detail

Recipes
Videos
Tools

About
├── About Maple Bowl
├── How We Research
└── Editorial Principles

Search
```

Recipes, Videos and Tools are visible brand directions in the current
reference design. They may launch as lightweight landing pages or
"Coming soon" modules, but should not imply functionality that does not
yet exist.

## 4.2 Header

Desktop working structure:

``` text
[Maple Bowl Logo]

Nutrition Guide
Product Reviews
Brands
Recipes
Videos
Tools

                         Search
                         [🐶 Dog ▾]
```

The pet preference control replaces the need for an account/profile
affordance in V1.

Mobile:

``` text
[Logo]          [Search] [Pet] [Menu]
```

## 4.3 URL Strategy

Suggested semantic structure (locale is required on every public page):

``` text
/{locale}
/{locale}/nutrition-guide
/{locale}/nutrition-guide/{slug}
/{locale}/ingredients
/{locale}/ingredients/{slug}

/{locale}/food
/{locale}/food/dog
/{locale}/food/cat
/{locale}/food/{product-slug}

/{locale}/brands
/{locale}/brands/{brand-slug}

/{locale}/reviews
/{locale}/reviews/{slug}
/{locale}/recipes
/{locale}/videos
/{locale}/tools
/{locale}/about
/{locale}/search
```

Multilingual routing is enabled from the beginning:

``` text
/en/...
/fr/...
/zh/...
```

Language implementation should be decided before publishing substantial
indexed content.

## 4.4 Internal Linking

The site should deliberately connect entities.

``` text
Brand
  ↕
Product
  ↔ Ingredient
  ↔ Nutrition Topic
  ↔ Guide
```

Example:

``` text
ACANA Pacifica
→ fish-based protein
→ Protein guide
→ Omega-3 guide
→ ingredient pages
→ similar products
→ ACANA brand page
```

Internal linking is a product feature, not merely an SEO technique.

------------------------------------------------------------------------

# 5. First-Visit Personalization

## 5.1 Goal

Give users immediate lightweight personalization without identity or
account creation.

## 5.2 First Visit

Present a simple welcome experience.

Working copy:

``` text
Welcome to Maple Bowl

Who should we focus on?

[ Maple 🐶
  Dogs ]

[ Milo 🐱
  Cats ]

[ I have both ]

Skip for now

You can change this anytime.
```

## 5.3 Preference Model

``` ts
type PetPreference = "dog" | "cat" | "both" | "unset";
```

Suggested first-party functional cookie:

``` text
maple_paws_pet=dog
```

Long-lived preference, e.g. approximately one year.

## 5.4 Behavior

Preference may affect:

-   homepage ordering;
-   recommended guides;
-   featured products;
-   default species filter;
-   search ranking;
-   default tabs.

Preference must not:

-   hide accessible content;
-   change permissions;
-   require authentication;
-   create separate user identities;
-   make canonical content dependent on the cookie.

## 5.5 Changing Preference

Always provide an obvious header control.

Example:

``` text
Show me content for

✓ Dogs
  Cats
  Both
```

## 5.6 Skip Behavior

If preference is unset:

-   show balanced dog/cat content;
-   do not repeatedly interrupt the user;
-   allow selection later from the header.

------------------------------------------------------------------------

# 6. Content Architecture

## 6.1 Content Families

### Knowledge

-   Nutrition Topic
-   Ingredient
-   Feeding Guide
-   Food Safety Guide

### Catalog

-   Brand
-   Product Line
-   Product

### Editorial

-   Food Guide
-   Comparison
-   Article
-   Brand Story

### Future Interactive

-   Calculator
-   Food Comparison Tool
-   Build a Bowl

## 6.2 Facts vs Editorial

Every product page should conceptually distinguish:

### Product Facts

Data derived from packaging/manufacturer/reference material.

### Maple Bowl Notes

Explanatory editorial context.

### Sources

Where relevant information came from and when it was checked.

Avoid presenting interpretation as manufacturer fact.

## 6.3 Content Quality

Important pages should answer a clear user question.

Examples:

-   What is crude protein?
-   What does chicken meal mean?
-   Is this product for puppies?
-   Where is this product made?
-   How does wet food differ from dry food?

Prefer durable explanations over keyword-driven filler.

## 6.4 Medical Boundary

Maple Bowl provides educational pet-food information, not veterinary
diagnosis.

Health-condition-specific feeding content should encourage appropriate
professional veterinary guidance.

------------------------------------------------------------------------

# 7. Core Data Model

This is conceptual. Database implementation comes later.

## 7.1 Species

``` text
DOG
CAT
```

## 7.2 Brand

Suggested fields:

``` text
id
slug
name
short_description
long_description
country
province_region
founded_year?
manufacturer?
website?
logo
hero_image?
is_canadian_brand
editorial_notes
source_metadata
status
```

## 7.3 Product Line

``` text
id
brand_id
slug
name
description
species[]
```

## 7.4 Product

``` text
id
brand_id
product_line_id?
slug
name
species
food_type
life_stages[]
short_description
manufacturer_description?
country_of_manufacture?
image
ingredient_text
nutrition_facts
calorie_content?
package_sizes?
source_metadata
last_verified_at
status
```

## 7.5 Food Type

Initial controlled vocabulary:

``` text
dry
wet
raw
freeze_dried
air_dried
dehydrated
fresh
treat
topper
other
```

Do not expose every enum as a navigation category automatically.

## 7.6 Ingredient

``` text
id
slug
name
aliases[]
category
description
nutrition_role?
common_uses
editorial_notes
sources
```

## 7.7 Nutrition Facts

Need to accommodate incomplete manufacturer data.

Possible representation:

``` text
protein_min
fat_min
fiber_max
moisture_max
ash?
calcium?
phosphorus?
omega_3?
omega_6?
taurine?
other[]
```

Never assume all products publish the same fields.

## 7.8 Nutrition Topic

``` text
id
slug
title
summary
species_scope
content
sources
related_ingredients[]
related_products[]
```

## 7.9 Article / Guide

``` text
id
slug
title
description
content_type
species_scope
author
published_at
updated_at
hero_image
related_products[]
related_brands[]
related_ingredients[]
related_topics[]
sources
```

## 7.10 Localized Content Model

Core entities should exist once.

Example:

```text
Ingredient
  id: ingredient_123

Localized content
  en
    name: Chicken Meal
    description: ...
  fr
    name: Farine de poulet
    description: ...
  zh
    name: 鸡肉粉
    description: ...
```

Do not duplicate the underlying Brand, Product or Ingredient entity for each language.

Suggested conceptual localized fields:

```text
entity_id
locale
name
slug?
short_description
long_description
editorial_notes
seo_title
seo_description
```

Where localized slugs are used, routing must still resolve all language versions to the same canonical entity identity.

## 7.11 Market-Specific Product Data

Some product information belongs to a market rather than a language.

Conceptual model:

```text
product_id
market
market_product_name?
availability?
package_sizes?
importer_distributor?
market_notes?
formula_version?
source_metadata
```

Initial market code examples:

```text
CA
CN
```

Do not overbuild this in V1, but preserve a clean extension point.

## 7.12 Source Metadata

Because product information changes:

``` text
source_url
source_name
accessed_at
notes?
```

V1 does not need a complex provenance system, but the model should allow
verification dates.

------------------------------------------------------------------------

# 8. Core Page Templates

## 8.1 Homepage

### Purpose

Explain the product immediately and route users toward relevant content.

### Proposed structure

``` text
Header

Hero
├── Value proposition
├── Dog CTA
├── Cat CTA
└── Maple & Milo visual

Start Here
├── Nutrition Basics
├── Ingredients Explained
├── Dog Food
└── Cat Food

Recommended for You
└── preference-aware content

Learn About Pet Food
├── Protein
├── Fat
├── Labels
└── Food Types

Explore Canadian Brands
└── selected brands

Featured Articles
└── editorial content

Maple & Milo
└── educational/media introduction

Newsletter
└── optional email subscription module

About Maple Bowl

Footer
```

Avoid an endless generic blog-feed homepage.

## 8.2 Nutrition Guide Landing

Purpose: provide a map of pet-food knowledge.

Sections:

``` text
Nutrition Basics
Ingredients
Feeding
Food Labels
Food Safety
Popular Questions
Dog-specific
Cat-specific
```

Preference may reorder species-specific modules.

## 8.3 Nutrition Topic Page

Example: Protein.

``` text
Breadcrumb
Title + concise answer
Key Takeaways
Main explanation
Dog / Cat differences
Common food sources
Related ingredients
Related products
Related guides
Sources
Last reviewed
```

## 8.4 Ingredient Page

Example: Chicken Meal.

``` text
Ingredient name
Aliases
Short answer
What it is
Why it is used
Nutrition role
Things worth knowing
Dog / Cat relevance
Products containing it
Related ingredients/topics
Sources
```

Avoid simplistic "good/bad ingredient" scoring.

## 8.5 Brands Directory

Filters may include:

``` text
Dog
Cat
Country
Food Type
```

Initial emphasis can visually feature Canadian brands.

Brand cards should contain only useful scanning information.

## 8.6 Brand Page

``` text
Brand identity
Overview
Origin / manufacturing context
What the brand makes
Product lines
Products
Relevant guides
Maple Bowl notes
Sources / last checked
```

Avoid turning the page into promotional copy.

## 8.7 Pet Food Directory

``` text
Title
Dog / Cat tabs
Filters
Sort
Product results
Educational helper links
```

Possible filters:

``` text
species
food type
life stage
brand
```

Add nutritional filters only after data consistency is validated.

## 8.8 Product Page

This is one of the most important V1 templates.

``` text
Breadcrumb

Product Hero
├── image
├── brand
├── product name
├── species
├── food type
├── life stage
└── short summary

Quick Facts

Guaranteed / Nutritional Analysis

Ingredients

How to Read This Product
└── links into knowledge base

Maple Bowl Notes

Suitable Context
└── descriptive, not medical prescription

Related Nutrition Topics

Similar / Related Products

Brand

Sources
Last verified
```

Do not introduce a universal numeric rating in V1.

## 8.9 Guide / Article

``` text
Title
Summary
Hero image
Metadata
Key takeaways
Article body
Contextual product/ingredient links
Sources
Related reading
```

## 8.10 Search

Search across:

-   products;
-   brands;
-   ingredients;
-   nutrition topics;
-   guides.

Preference can boost dog/cat results but should not exclude the other
species.

## 8.11 About / Methodology

Trust-building content:

``` text
Why Maple Bowl exists
How information is researched
How product information is sourced
Editorial independence
Corrections / updates
Commercial relationship disclosure
```

------------------------------------------------------------------------

# 9. UI Component System

## 9.1 Foundation

Define tokens for:

``` text
colors
font families
font sizes
line heights
spacing
container widths
border radius
border colors
shadows
breakpoints
motion
```

## 9.2 Core Components

V1 component inventory:

``` text
Header
Mobile Navigation
Footer
Pet Preference Selector
Language Selector
Search Trigger
Search Input
Breadcrumb
Button
Link
Badge
Species Badge
Food Type Badge
Card
Brand Card
Product Card
Article Card
Ingredient Link
Nutrition Fact
Nutrition Facts Table
Source List
Callout
Maple/Milo Callout
Tabs
Filter Bar
Pagination / Load More
Empty State
```

## 9.3 Product Card

Minimum:

``` text
Product image
Brand
Product name
Species
Food type
```

Optional fields should be added only when they improve comparison.

## 9.4 Nutrition Presentation

Nutrition facts should feel closer to structured reference data than
marketing graphics.

Use:

-   clear labels;
-   aligned values;
-   units;
-   qualifiers such as min/max;
-   explanatory links.

## 9.5 Responsive Behavior

Mobile is first-class.

Particular attention:

-   long product names;
-   nutrition tables;
-   ingredient lists;
-   filters;
-   brand/product grids;
-   language switching;
-   preference switching.

------------------------------------------------------------------------

# 10. Content & Editorial Standards

## 10.1 Tone

Maple Bowl speaks like a knowledgeable, friendly guide.

Prefer:

> Chicken meal is a concentrated rendered animal-protein ingredient...

Avoid:

> This shocking ingredient could be harming your dog!

## 10.2 Claims

Avoid unsupported:

-   health claims;
-   disease prevention claims;
-   absolute "best food" statements;
-   ingredient demonization;
-   manufacturer-quality assumptions.

## 10.3 Product Profiles

Prefer:

``` text
What it is
What stands out
Nutrition profile
Ingredient profile
Things worth knowing
Who may want to investigate it further
```

over:

``` text
Pros
Cons
8.7/10
```

## 10.4 Commercial Content

Future sponsored/affiliate relationships must be visibly disclosed.

Commercial relationships must not silently change factual descriptions.

------------------------------------------------------------------------

# 11. Trilingual Architecture

## 11.1 V1 Languages

Maple Bowl is trilingual from the first version:

```text
English              en
French               fr
Simplified Chinese   zh
```

This is a foundation-level product requirement.

## 11.2 Why These Three Languages

The language strategy serves more than end-user translation.

### English

Primary bridge language for:

- Canadian consumers;
- manufacturers;
- international audiences;
- industry partners.

### French

Important for:

- Québec consumers;
- Québec manufacturers;
- local retailers and partners;
- a credible Canadian brand presence.

### Simplified Chinese

Important for:

- Chinese pet owners;
- potential import/distribution relationships;
- Canadian brands seeking Chinese-market communication;
- future Canada–China product discovery.

## 11.3 Architecture Principle

> **Multilingual is architecture, not a feature.**

The following must be locale-aware from V1:

- routes;
- navigation;
- page templates;
- metadata;
- content model;
- search;
- filters;
- cookies/preferences;
- sitemaps;
- canonical/alternate links;
- editorial workflow;
- component testing.

## 11.4 Locale Resolution

Current language should primarily be determined by URL:

```text
/en/...
/fr/...
/zh/...
```

A locale cookie may remember preference:

```text
maple_paws_locale=en|fr|zh
```

A sensible first-visit strategy:

1. honor an explicitly chosen URL locale;
2. otherwise use remembered locale;
3. otherwise consider browser language;
4. otherwise fall back to the default locale.

Never make search-engine-visible canonical content depend only on a cookie.

## 11.5 Publishing Model

The platform is **trilingual-capable from Day 1, progressively translated**.

Valid state:

```text
Article A
├── EN ✓
├── FR ✓
└── ZH ✓

Article B
├── EN ✓
├── FR -
└── ZH ✓
```

Do not block a valuable article solely because every translation is unfinished.

However, prioritize complete EN/FR/ZH coverage for:

- homepage;
- navigation;
- About;
- methodology;
- editorial principles;
- privacy/cookie information;
- primary directory UI;
- foundational nutrition guides;
- important brand/product summaries.

## 11.6 Structured Data vs Editorial Content

Language-neutral structured facts should be stored once:

```text
protein: 38%
fat: 18%
species: DOG
food_type: DRY
country: CA
```

Localized content should vary by locale:

```text
name
description
summary
editorial_notes
SEO metadata
article body
```

Market data should vary by market, not locale.

## 11.7 Translation Workflow

A future editorial status model may support:

```text
draft
ready_for_translation
translated
reviewed
published
needs_update
```

Translation quality matters more than automatic completeness.

AI-assisted translation may be used operationally, but published nutrition and product content should have a review workflow.

## 11.8 Search

Search should support multilingual aliases.

Example concept:

```text
Chicken Meal
Farine de poulet
鸡肉粉
```

All may resolve to the same Ingredient entity.

Brand names generally remain canonical, while common localized names/aliases can also be indexed.

## 11.9 UI Design Requirement

Never design components using English-only assumptions.

Test:

- headers;
- buttons;
- tabs;
- filters;
- cards;
- breadcrumbs;
- empty states;
- mobile menus;
- tables;

in all three languages before declaring a component stable.

# 12. Search & Discovery

## 12.1 Search Intent

A user may search:

``` text
ACANA
chicken meal
high protein dog food
kitten food
omega-3
wet food
```

Search should understand multiple entity types and multilingual aliases.

Results should remain within the current interface language where localized content exists, while still resolving shared underlying entities.

## 12.2 Discovery

Users should also discover information without search through:

-   related topics;
-   product relationships;
-   brand relationships;
-   ingredient relationships;
-   curated guides.

------------------------------------------------------------------------

# 13. SEO Foundation

V1 should establish:

-   semantic URLs;
-   canonical URLs;
-   metadata;
-   Open Graph;
-   structured headings;
-   sitemap;
-   robots configuration;
-   article/product breadcrumbs;
-   appropriate structured data where valid;
-   internal links;
-   multilingual hreflang when languages are actually published.

Do not create thin programmatic pages solely to capture keywords.

------------------------------------------------------------------------

# 14. Privacy & Cookies

## 14.1 V1 Data Philosophy

Collect as little personal information as possible.

No account or identity required.

## 14.2 Functional Preference

The pet preference cookie stores:

``` text
dog | cat | both | unset
```

It is used for interface/content personalization.

Document this behavior in the privacy/cookie information.

## 14.3 Analytics

If analytics is introduced, choose a privacy-conscious implementation
and document the data collected.

------------------------------------------------------------------------

# 15. Technical Architecture --- Initial Direction

This section intentionally avoids locking implementation too early.

## 15.1 Logical Layers

``` text
UI
↓
Content / Query Layer
↓
Structured Catalog + Editorial Content
↓
Persistence
```

## 15.2 Suggested Content Split

Likely direction:

### Structured database

-   brands;
-   products;
-   product lines;
-   nutrition facts;
-   product ↔ ingredient relationships.

### Content files / CMS

-   nutrition guides;
-   editorial guides;
-   methodology;
-   long-form ingredient explanation if appropriate.

The exact MDX/CMS/database boundary should be validated with real
content.

## 15.3 Internationalization Layer

Internationalization is part of the core architecture.

The implementation should provide:

```text
locale-aware routing
translation dictionaries for UI copy
localized content lookup
localized SEO metadata
locale-aware search indexing
fallback rules
hreflang generation
language switcher behavior
```

The domain model should remain language-neutral where possible.

## 15.4 Rendering

Prioritize:

-   fast public pages;
-   indexable content;
-   stable URLs;
-   good caching;
-   minimal client-side JavaScript for reading pages.

Personalization should enhance rather than undermine cacheability/SEO.

------------------------------------------------------------------------

# 16. V1 Validation Plan

Before populating the catalog at scale, implement a vertical slice.

Suggested test dataset:

``` text
3 brands
3–5 products per brand
5 ingredients
3 nutrition topics
3 guides
```

Use real product data.

Validate:

1.  Can a brand be represented naturally?
2.  Can different product types fit the model?
3.  Can incomplete nutrition data be represented?
4.  Can ingredient relationships be maintained?
5.  Can a nutrition article naturally link to catalog data?
6.  Does dog/cat personalization improve discovery?
7.  Does the product page remain readable on mobile?

Only then expand to dozens/hundreds of products.

------------------------------------------------------------------------

# 17. Development Phases

## Phase 0 --- Foundation

Finalize enough of:

-   product principles;
-   information architecture;
-   visual tokens;
-   data model;
-   page templates.

## Phase 1 --- Shell

Build:

-   routing;
-   header/footer;
-   responsive layout;
-   preference onboarding;
-   core components.

## Phase 2 --- Vertical Slice

Build complete flows using a small real dataset:

``` text
Home
→ Brand
→ Product
→ Ingredient
→ Nutrition Guide
```

## Phase 3 --- Content System

Establish:

-   editorial workflow;
-   product-data workflow;
-   source tracking;
-   image handling.

## Phase 4 --- Discovery

Add:

-   directories;
-   filters;
-   search;
-   related content.

## Phase 5 --- Launch Content

Expand the validated dataset/content.

## Phase 6 --- Polish

Accessibility, performance, SEO, copy, mobile QA and launch.

------------------------------------------------------------------------

# 18. Future Expansion

These directions are anticipated but should not distort V1.

## 18.1 Tools

``` text
Calorie Calculator
Feeding Calculator
Food Comparison
Build a Bowl
```

## 18.2 Deeper Personalization

Potential future pet profile:

``` text
species
age
weight
breed
activity
life stage
dietary requirements
```

This should be a separate opt-in product feature, not silently inferred
from the V1 preference cookie.

## 18.3 Media

Maple & Milo can support:

-   short educational videos;
-   animation;
-   explainers;
-   product/brand stories.

## 18.4 Recipes

Potential future section:

-   treats;
-   toppers;
-   homemade food education;
-   recipe tools.

Requires substantially stronger nutrition/safety methodology before
becoming a major feature.

## 18.5 International Expansion

Possible organization:

``` text
Canada
United States
New Zealand
Europe
China
...
```

## 18.6 Business

Potential models:

-   brand partnerships;
-   sponsored educational content;
-   affiliate links;
-   market-entry promotion;
-   distribution relationships;
-   premium tools;
-   structured data/API.

Commercial design should preserve editorial trust.

## 18.7 App

A future app becomes more compelling if Maple Bowl develops:

-   saved pet profiles;
-   feeding calculations;
-   product comparison;
-   nutrition planning;
-   saved foods/history.

Do not build an app merely to duplicate the website.

------------------------------------------------------------------------

# 19. Open Design Questions

These are intentionally unresolved.

### Brand

-   Is “Better Food. Happier Pets.” the permanent descriptor, or should a
    secondary Canadian descriptor be retained for specific markets?

### Content

-   How deep should ingredient pages go scientifically?
-   Should product pages contain any recommendation language?
-   How should sources and update history be displayed?

### Data

-   Product vs formula vs SKU/package modeling?
-   How should regional formula differences be represented?
-   How should reformulations/version history work?

### Internationalization

-   English-first or bilingual-at-launch?
-   How much Chinese localization belongs directly on product pages?

### UI

-   Exact typography?
-   Final design tokens sampled from brand artwork?
-   Illustration density on educational pages?

### Technical

-   MDX vs CMS?
-   Database choice?
-   Search implementation?
-   Image pipeline?

These questions should be resolved through the vertical-slice
implementation rather than speculative design alone.

------------------------------------------------------------------------

# 20. V1 Definition of Success

The first version is successful if a new visitor can:

1.  understand what Maple Bowl is within seconds;
2.  select Dog, Cat or Both without creating an account;
3.  learn a pet-nutrition concept;
4.  discover a relevant Canadian brand;
5.  inspect a product's nutrition and ingredients;
6.  move naturally between product data and educational explanations;
7.  trust where the information came from;
8.  use the site comfortably on mobile.

The deeper success criterion is architectural:

> **Adding the 100th product and the 50th educational article should
> feel like adding content---not redesigning the website.**
