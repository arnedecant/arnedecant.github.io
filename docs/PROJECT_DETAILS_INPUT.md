# Project detail pages: input and evidence

Last researched: 2026-10-29. This is the working list for future edits, not public page copy. Check off questions when answered and update the corresponding `content/projects/*.md` entry. The pages are complete and usable with the evidence currently available; the questions below would make their personal narrative stronger.

## Shared editorial questions

- [ ] Add approximate start dates or meaningful milestones for each project, if you want a timeline displayed. Dates have deliberately been omitted rather than inferred from the first commit.
- [ ] Confirm which projects were solo work and credit any collaborators or upstream inspiration you want named. Role labels describe the work rather than asserting exclusive authorship.
- [ ] Share the personal trigger behind each project and which parts you are proudest of. Current motivations describe the product problem visible in its implementation; they do not invent a personal anecdote.
- [ ] Identify any results you want included, such as real adoption, external feedback, or day-to-day use. No usage, performance, or business-impact figures have been invented.

## NyxKit

Page: `/projects/nyxkit`

Established from the repository: published Vue/TypeScript package; common visual-prop pipeline; floating UI; typed select slots; command palette; Markdown/editor separation; Storybook, Vitest, and Playwright. The portfolio, Echo, Anthos, and Fission demo use the library.

- [ ] Which component or cross-app integration is the best example of the library paying off for you?
- [ ] Is there a particular API decision or compatibility migration you want to tell in your own words?
- [ ] Are there outside users or public references worth mentioning?

Evidence: local clean checkout `NyxKit/nyx-kit` at `1be4759`; [architecture](https://github.com/NyxKit/nyx-kit/blob/main/docs/architecture/README.md), [build](https://github.com/NyxKit/nyx-kit/blob/main/vite.config.ts), [testing](https://github.com/NyxKit/nyx-kit/blob/main/docs/testing/README.md), select/command-palette/Markdown specifications and browser fixtures.

## Nyx Fission

Page: `/projects/nyx-fission`

Established: framework-independent media-to-particle API, media lifecycle, luma keying, themes, entrance replay, pointer effects, and this portfolio's portrait integration.

- [ ] What prompted you to extract the effect into its own library? Is there a direct relationship to the audio visualiser that you want described?
- [ ] Are there uses outside this portfolio that can be linked?
- [ ] The local checkout contains uncommitted PNG-export work. Confirm when that is released before adding export as a public capability; this case study excludes it.

Evidence: committed `NyxKit/nyx-fission` at `a965c00`, [public API](https://github.com/NyxKit/nyx-fission/blob/main/README.md), renderer/interaction/entrance implementations; portfolio `components/HeroPortrait.vue`. The demo was captured from an isolated `git archive HEAD` so existing uncommitted work was not changed or presented as released.

## Echo

Page: `/projects/echo`

Established: incremental Instagram JSON imports, stable message identities/source observations, local SQLite/media library, separate IndexedDB browser viewer, search/media navigation, explicit analysis requests, persistent discussions and background jobs. Desktop artifacts are candidates, not a validated public release.

- [ ] What is the public distribution plan: source-only, packaged downloads, or a dedicated product site?
- [ ] Is there a personal motivation you are comfortable sharing publicly? No real archive content or private context has been used here.
- [ ] Which import edge case or analysis workflow best represents the work for you?
- [ ] Update the desktop release status when platform acceptance checks are complete.

Evidence: clean `NyxKit/echo` checkout at `634520e`; [README](https://github.com/NyxKit/echo/blob/main/README.md), [import engine](https://github.com/NyxKit/echo/blob/main/docs/specs/library-import-engine.md), [discussions/jobs](https://github.com/NyxKit/echo/blob/main/docs/specs/library-discussions-and-jobs.md), [release acceptance](https://github.com/NyxKit/echo/blob/main/docs/specs/library-release-acceptance.md). Screenshot provenance was verified against `scripts/check-library-browser.mjs`, which creates disposable roots and synthetic input. The running personal Echo server and real browser storage were not accessed.

## Video Projection Mapping

Page: `/projects/video-projection-mapping`

Established: mask-defined cube grids, gap-aware UVs, pointer intersection in the grid's local plane, nearest occupied-cell search, ring elevation, GSAP transitions, and responsive rendering. Only heart, lungs, and home are currently enabled; the README lists additional inactive assets.

- [ ] What inspired the experiment, and should a tutorial, artist, or other source be credited?
- [ ] Was it made for a particular event, installation, or brief, or purely as a browser experiment?
- [ ] Is there a preferred clip or camera angle for the page?

Evidence: GitHub tree `91deb4093fa1f798201e4bd127245b0668a627a0`; [projection model](https://github.com/arnedecant/video-projection-mapping/blob/main/src/modules/webgl/classes/VideoProjection.ts), [animation/interaction utilities](https://github.com/arnedecant/video-projection-mapping/blob/main/src/modules/webgl/utils/videoProjection.ts), [active configuration](https://github.com/arnedecant/video-projection-mapping/blob/main/src/modules/webgl/data/config.ts), and live demo. No local checkout was available.

Capture finding: the bundled concert MP4 uses HEVC, which failed in the capture browser. A temporary WebM transcode of that exact clip was returned to the browser for the heart screenshots. It does not change the application code and is not bundled into the portfolio. Other source videos were also intercepted during capture; neither published screenshot switches away from the heart mask. General browser video compatibility is a separate project improvement, not implemented here.

## Anthos

Page: `/projects/anthos`

Established: AtomS3 Lite firmware, node-pushed telemetry, shared TypeScript contracts, Express/Vue deployment, Docker persistence, power-aware node status, provisioning, and logs. Firmware cadence persistence/sleep guards have software regression coverage; physical-device qualification remains separate. Pump and automation code exists but this page does not claim a dependable unattended watering product.

- [ ] Which sensors and node configurations are actually running on physical plants today?
- [ ] Add your own hardware photos or a short clip of the assembled node and plant setup.
- [ ] Which power/sleep changes have been flashed and verified on hardware? The latest validation notes explicitly do not establish real sleep-cycle or long-duration results.
- [ ] How should the pump/automation work be described publicly once it is qualified?

Evidence: clean `NyxKit/anthos` at `9b4c142`; [architecture](https://github.com/NyxKit/anthos/blob/main/docs/architecture.md), [power-aware status specification](https://github.com/NyxKit/anthos/blob/main/specs/018-power-telemetry-online/spec.md), `shared/src/nodes/classes/PlantNode.ts`, firmware-hardening validation, API tests, and implemented Vue dashboard. The older root README is behind parts of the implementation, so claims were checked against source and validation notes.

## Webcam Audio Visualiser

Page: `/projects/webcam-audio-visualiser`

Established: Vue/Pinia, TresJS/Three.js, offscreen video sampling, Web Audio frequency analysis, buffer geometry, and GLSL particles. The current UI uses a bundled track and a disabled preset selector. Extra repository audio files are not a shipped track picker.

- [ ] Which soundtrack and visual theme best represent the experience for you?
- [ ] Should a short screen recording accompany the still images? Motion and sound communicate this project better than a still.
- [ ] What was the most difficult visual or performance problem in practice? The page currently describes the media/rendering decisions visible in source without claiming measured performance gains.
- [ ] Is there an intended relationship or progression from this experiment to Nyx Fission that should be made explicit?

Evidence: committed `arnedecant/audio-visualiser` at `34d43bc`, [README](https://github.com/arnedecant/audio-visualiser/blob/main/README.md), stores, particle composable, shader files, and live deployment. Existing uncommitted local UI changes were left alone; screenshots use the deployed app.

## Screenshot inventory

All shipped images are real browser screenshots, converted to WebP. No generated UI, design concepts, external inspiration images, private messages, or physical webcam capture is included. Captions identify synthetic/demo data. Full-size assets are linked directly from the detail pages.

| Project | Asset under `public/images/projects/` | Origin |
| --- | --- | --- |
| NyxKit | `nyxkit/components.webp` | Local Storybook, `Components/Basic/NyxButton`, All story. |
| NyxKit | `nyxkit/command-palette.webp` | Local Storybook command palette, AlwaysShown story, opened through its trigger. |
| Nyx Fission | `nyx-fission/playground.webp` | Committed demo, real WebGL renderer with its bundled SVG fixture. |
| Nyx Fission | `nyx-fission/portrait.webp` | This portfolio's About-page portrait, rendered with the existing public portrait video. |
| Echo | `echo/conversation-library.webp` | Existing `build/synthetic-library.png`, produced by `scripts/check-library-browser.mjs`; only synthetic conversation and provider output. |
| Video Projection Mapping | `video-projection-mapping/heart.webp`, `interaction.webp` | Live app, heart mask, original bundled concert clip transcoded temporarily for browser compatibility. Second view uses the actual orbit and pointer interaction. |
| Anthos | `anthos/dashboard.webp` | Actual local Vue app, isolated browser, all `/api/**` requests intercepted with invented nodes/readings/user/logs. Existing hardcoded prototype health figures remain demo values. No API server or device was contacted. |
| Webcam Audio Visualiser | `webcam-audio-visualiser/particles.webp`, `controls.webp` | Live app, fresh browser with a fake camera device fed by a temporary Y4M conversion of the bundled jellyfish video. No physical camera or real browser profile used. |

## Maintenance rules

- Keep personal anecdotes and measured outcomes pending until supplied or independently evidenced.
- Update public status when a candidate becomes a release; source implementation alone does not establish field reliability.
- Keep screenshots and captions together in the project's Markdown frontmatter. Replace an asset and its recorded provenance together.
- Preserve this tracker when remaining questions are answered; check the item, record the answer briefly, and update the public page.
- Nyx Notes remains unfeatured and has no detail page in this change. Its inclusion can be a future, explicit content decision.

## Implementation verification

Verified on 2026-10-29:

- Static generation succeeds and emits HTML and payloads for all six detail routes. Missing and unfeatured project routes return 404.
- Lint passes for the changed Vue and TypeScript files; TypeScript passes against Nuxt's generated app configuration.
- Chromium checks pass for every detail page at 1440, 768, 390, and 320 CSS pixels: headings, contents anchors, image loading and dimensions, metadata, and horizontal overflow.
- Generated-site checks cover card clicks, keyboard links, right-aligned arrow links, separate GitHub popups, About links, resume title links, printed repository URLs, and the complete next-project cycle.
- Browser checks find no uncaught errors or hydration warnings in the generated site.
- Home, About, and resume queries select summary fields only; their payloads exclude the full case-study bodies.
- Ten WebP screenshots total approximately 980 KiB on disk. Secondary images load lazily; the leading image has explicit dimensions and priority loading.
