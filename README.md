# Arne Decant

Senior software engineer and web architect based in Belgium. I build complex
products, interactive tools, and reusable systems that feel clear and coherent
for the people using them.

I work mostly across frontend architecture, design systems, real-time
interfaces, and product development. My background includes live video
production, browser-based 3D experiences, component libraries, and full-
lifecycle web work.

**[Visit my portfolio](https://arnedecant.github.io)** ·
**[GitHub](https://github.com/arnedecant)** ·
**[LinkedIn](https://www.linkedin.com/in/arne-decant-970b9282/)** ·
**[Email me](mailto:hello@arnedecant.be)**

## Selected Work

- **[Nyx Kit](https://github.com/NyxKit/nyx-kit)** - A reusable Vue component
  library focused on consistent interfaces, accessible defaults, and clear
  APIs. [Explore the documentation](https://nyxkit.github.io/nyx-kit).
- **[Video Projection Mapping](https://github.com/arnedecant/video-projection-mapping)**
  : An experiment in using web technologies to project visuals onto physical
  spaces and shapes. [View the live demo](https://arnedecant.github.io/video-projection-mapping/).
- **[WebGL Webcam Audio Visualiser](https://github.com/arnedecant/audio-visualiser)**
  : A real-time graphics experiment where camera pixels and audio drive a
  particle system. [View the live demo](https://arnedecant.github.io/audio-visualiser).

## About This Repository

This repository contains my personal portfolio site: a content-driven Nuxt
application where the pages and project entries live in Markdown. It is both a
place to explore my work and a small example of how I approach frontend
architecture, content modeling, and visual detail.

The site includes the homepage, extended About page, resume, and a dedicated
detail page for each featured project at `/projects/<slug>`. Project cards, the
About list, and featured resume project titles link to these pages; demo and
source links remain available. The printed resume still includes repository URLs.

The site is built with:

- [Nuxt 4](https://nuxt.com/) and [Vue 3](https://vuejs.org/)
- TypeScript and Zod for typed, validated content
- [Nuxt Content](https://content.nuxt.com/) for the Markdown content layer
- SCSS and a custom component-based design system
- [Nuxt Studio](https://studio.nuxt.com/) for browser-based content editing

## Run Locally

CI runs on Node.js 22 with the [pnpm](https://pnpm.io/) version pinned in
`package.json`.

```bash
pnpm install
pnpm dev
```

The development server runs at `http://localhost:9001`.

Useful commands:

```bash
pnpm build    # Build for production
pnpm generate # Generate a static site
pnpm preview  # Preview the production build
pnpm lint     # Run Oxlint and ESLint without changing files
pnpm test     # Run unit tests once
pnpm typecheck # Check Nuxt/Vue TypeScript types
```

Content can be edited directly in `content/` or through Nuxt Studio when it is
enabled.

## Continuous integration

`.github/workflows/ci.yml` follows Echo's three independent jobs on pull requests,
pushes to `main`, and manual dispatch: Lint, Unit tests, and Build. It uses the
same pinned actions, Node 22, pnpm-store caching, read-only permissions, ten-minute
job timeouts, and cancellation of older runs for the same PR or branch.

Lint runs Oxlint and ESLint without auto-fixing files; ESLint still runs if
Oxlint fails after dependencies install successfully. Unit tests use Vitest in
run mode and cover the shared Markdown link policy, including internal URLs,
external targets, native email/telephone actions, and malformed URLs. The Build
job runs `pnpm typecheck` and `pnpm generate` to check the actual static deployment
artifact. No job suppresses failed checks or passes an empty test suite.

GitHub Pages deployment remains in the separate deployment workflow.

## Editing site content

- `content/pages/*.md`: page prose, headings, section labels, calls to action,
  destinations, and page metadata. About and resume presentation copy lives in
  frontmatter alongside their existing content.
- `content/projects/*.md`: project names, summaries, technology lists, images,
  image descriptions, and external links. Set `abbreviation` for the circle's
  text when a project has no logo; the full `title` remains below it. Set
  `featured: true` for the homepage and About page, and `resumeFeatured: true`
  for the resume. All three views use the same records and generated
  `ProjectsCollectionItem` type; edit a summary here to update it everywhere.
  The Markdown body is the project's case study. Optional `lede`, `role`,
  `category`, and `status` fields provide the detail-page introduction.
  `screenshots` contains `src`, `alt`, `caption`, `width`, and `height`; the first
  image leads the page and the rest appear in its gallery. Store optimized
  captures in `public/images/projects/<slug>/`. The About page embeds its list
  in Markdown through `AboutProjectList`.
- `content/expertise/*.md`: shared capability groups with a title, description,
  and skill items. The homepage shows all groups; `resumeFeatured: true` also
  includes a group's title and items in the resume, after its page-specific
  skill groups. Both queries use the generated `ExpertiseCollectionItem` type.
  Set `order` for display order on both pages.
- `content/experience/*.md`: the single source for work and education entries,
  shared by the homepage and resume through `ExperienceList`. Use `kind: work`
  for jobs or `kind: education` for education; the homepage only queries work.
  `title` holds the role or qualification, `organization` the company or school,
  and `period` the displayed dates. `summary` supports Markdown links, and
  `highlights` is an optional list. Set `order` to control the display sequence
  (lowest first); the migrated entries follow the resume's newest-first order.
- `data/site.json`: shared identity, social/contact links, navigation labels and
  destinations, accessibility labels, default metadata, and reusable component
  copy. This JSON is imported by `app.config.ts` and `nuxt.config.ts`; editing it
  does not require changing TypeScript. It is not a Nuxt Studio collection.
- `public/`: authored media assets, including any text embedded in artwork.

Page frontmatter fields are declared in `content.config.ts`. Add new fields there
when introducing new content, then bind them in the component. Keep visitor-facing
words out of Vue templates, script defaults, and CSS generated content. Structural
route IDs, icon identifiers, formatting punctuation, and technical configuration
remain in code. Documentation remains authored in Markdown.

Markdown links use `components/ProseA.global.vue` across ContentRenderer and MDC.
Links to external HTTP(S) websites open in a new tab with `noopener noreferrer`.
Relative paths, section anchors, links to the configured site URL or current
origin, and email/telephone actions retain their normal behavior. Authors do
not need to add `target="_blank"` to each external Markdown link.

Project Markdown can also embed explicitly registered Vue components. Nyx Fission
includes the live portrait with:

```md
::hero-portrait{fallback-src="/images/projects/nyx-fission/portrait.webp" fallback-alt="Portrait of Arne Decant"}
::
```

The shared project route maps `hero-portrait` to the existing `HeroPortrait`
component; it does not need a dedicated page. Its optional fallback image remains
visible until the renderer is ready, including when reduced motion is enabled or
media/WebGL is unavailable. Register additional embeds in the route's
`ContentRenderer` component map.

### Content paths and editor previews

Page content paths must match the public Vue routes because the editor uses them
for preview navigation. The pages collection sets `source.prefix: '/'`, so
`content/pages/resume.md` maps to `/resume` and `content/pages/about.md` maps to
`/about`. The homepage keeps its descriptive `home.md` filename and overrides
its path to `/` in frontmatter. Page queries use these public paths too.

Project entries use a `page` collection with
`source: { include: 'projects/*.md', prefix: '/projects' }` and a matching
`pages/projects/[slug].vue` route that queries the collection by the public path.
The content prefix sets the record's URL; the Vue page provides the route that
renders it. This keeps `/projects/<slug>` consistent in links and editor previews.
Use a filename matching `slug` so the generated path stays aligned. The detail
route only renders featured entries; unknown and unfeatured paths return 404.
Static generation discovers the six featured detail pages through real links
on the homepage, then follows their next-project navigation.

Research sources, screenshot provenance, and unanswered editorial questions live
in [the project input tracker](docs/PROJECT_DETAILS_INPUT.md). Keep that file
updated when answers or new project evidence become available.
