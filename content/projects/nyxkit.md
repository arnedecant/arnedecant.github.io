---
title: "NyxKit"
slug: "nyxkit"
category: "Vue component library & design system"
role: "Creator & maintainer"
status: "Published on npm, actively maintained"
lede: "A shared visual language, with the interaction details worked out once and carried across my applications."
screenshots:
  - src: "/images/projects/nyxkit/components.webp"
    alt: "NyxKit Storybook showing the button component's themes, shapes, and variants."
    caption: "The real Storybook documentation, where component variants can be explored in isolation."
    width: 1440
    height: 1000
  - src: "/images/projects/nyxkit/command-palette.webp"
    alt: "NyxKit's command palette with grouped search results and keyboard navigation hints."
    caption: "The command palette's interactive Storybook example. Search, selection, and keyboard behavior share one component API."
    width: 1200
    height: 760
summary: "A reusable Vue 3 component library and design system used across my applications and experiments, combining TypeScript component APIs, SCSS styling, and shared application patterns."
tech:
  - Vue 3
  - TypeScript
  - SCSS
featured: true
resumeFeatured: true
link: "https://nyxkit.github.io/nyx-kit"
github: "https://github.com/nyxkit/nyx-kit"
order: 1
logo:
  src: "/images/nyx-kit-logo.svg"
  alt: "Nyx Kit purple ribbon monogram logo"
---

## Why I built it

Building several Vue applications kept bringing me back to the same work: form controls, floating menus, keyboard navigation, theme decisions, and the small details that make an interface feel consistent. NyxKit gives that work a shared home.

It is both a component library and a set of application building blocks. Echo, Anthos, Nyx Fission's playground, and this portfolio use it, so new components are shaped by concrete product needs.

## What it does

- **A consistent component model.** Themes, sizes, variants, shapes, and visual effects use shared TypeScript enums and a common prop pipeline. Global defaults can be overridden by individual components.
- **More than basic controls.** Searchable selects, tables, trees, accordions, command palettes, a Markdown viewer, and a rich-text editor sit alongside buttons and inputs.
- **Reusable interaction behavior.** Floating elements share positioning logic. Components provide keyboard behavior and focus handling rather than leaving every application to rebuild them.
- **A visual development surface.** Storybook makes component variants and interactive examples directly inspectable, while Vitest and Playwright cover behavior.

## Problems I worked through

### Floating UI that survives real layouts

A dropdown can look correct in a simple example and still be clipped by a scrolling container. NyxKit teleports floating content outside those containers and calculates its position relative to the trigger, including flipping when space runs out. The command palette uses a stable top anchor so its search field does not move as the result list changes.

### Rich content without unnecessary coupling

The editor and the read-only Markdown viewer solve different problems. The viewer imports no editor modules; separate build chunks keep its parser and shared types from being pulled into the editor's dependency group. Markdown rendering also treats raw HTML as text and supports typed citation slots, letting applications connect a citation to their own source navigation.

### APIs that remain useful outside the demo

Custom option content in a select still needs a predictable text label for searching and selection. Typed slots let applications add richer rows without taking over the component's keyboard or selection behavior. Browser fixtures exercise the interactions that unit tests cannot fully represent, including overlays, focus recovery, and narrow layouts.

## How it is built

Vue 3 and TypeScript provide the components and public contracts. SCSS and CSS custom properties provide shared styling and themes. A central composable resolves visual props, and the Vite library build exposes components, composables, directives, utilities, and types through package entry points.

The library is published as [nyx-kit](https://www.npmjs.com/package/nyx-kit). Its [architecture notes](https://github.com/NyxKit/nyx-kit/blob/main/docs/architecture/README.md), [component specifications](https://github.com/NyxKit/nyx-kit/tree/main/docs/specs/components), and [browser testing guide](https://github.com/NyxKit/nyx-kit/blob/main/docs/testing/README.md) document the implementation and its contracts.
