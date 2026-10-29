---
title: "Nyx Fission"
slug: "nyx-fission"
category: "Creative technology library"
role: "Library design & WebGL development"
status: "Published library with a live playground"
lede: "Images, video, and live camera feeds, reconstituted as an interactive field of particles."
screenshots:
  - src: "/images/projects/nyx-fission/playground.webp"
    alt: "Nyx Fission playground showing a particle field alongside source and appearance controls."
    caption: "The library's Vue playground, captured from the committed demo with its bundled media. Vue is used for the demo, not required by the library."
    width: 1440
    height: 1000
summary: "A framework-independent WebGL library that transforms images, video, and webcam feeds into interactive particle fields. Handles media sampling, rendering, resizing, and cleanup; powers my portfolio's animated portrait."
tech:
  - TypeScript
  - WebGL
  - Three.js
featured: true
resumeFeatured: true
link: "https://nyxkit.github.io/nyx-fission/"
github: "https://github.com/NyxKit/nyx-fission"
order: 2
logo:
  src: "/images/nyx-fission-logo.svg"
  alt: "Nyx Fission particle F logo"
---

## Why I built it

Nyx Fission takes an effect I wanted to reuse across creative projects and puts the difficult parts behind a small browser API. An application supplies media and a container; the library handles sampling, rendering, resizing, and cleanup.

This portfolio's animated portrait is one of its real uses. The separate playground makes it possible to explore the effect and inspect the configuration before integrating it elsewhere.

## What it does

- **Multiple media inputs.** Images, video, and explicitly requested webcam streams feed the same particle renderer.
- **Control over the visual result.** Themes, depth, and luma keying change the appearance and which parts of the source remain visible.
- **Entrance animations.** Presets can start automatically or be replayed manually, with configurable timing.
- **Pointer interaction.** Attract, repel, push, and pull effects move particles in the image plane or in depth.
- **An inspectable playground.** Controls produce copyable configuration and integration examples alongside the live result.

## A live example

This is the same animated portrait used on my homepage. Move your pointer across it to displace the particles. A still portrait appears when reduced motion is enabled or the animation cannot load.

::hero-portrait{fallback-src="/images/projects/nyx-fission/portrait.webp" fallback-alt="Arne's portrait rendered as cyan and violet particles using Nyx Fission."}
::

## Problems I worked through

### Making an effect behave like a library

A visual demo can assume it owns the page. A reusable renderer needs a lifecycle. Nyx Fission exposes readiness and lifecycle events, distinguishes loading from entrance completion, and provides explicit destruction. Cleanup includes media, listeners, and rendering resources, so an application can remove or recreate an instance deliberately.

### Keeping interaction continuous

When the pointer moves, one set of particles starts responding while another returns to rest. Per-particle timing lets displaced particles hold briefly and then return, without forcing the entire field to reset. Replaying an entrance temporarily suppresses interaction so the two effects do not fight over the same positions.

### Handling browser media constraints

Media sampling has to account for source loading, dimensions, browser permissions, and cross-origin restrictions. Relative URLs resolve against the document so nested deployments work. Webcam access remains opt-in, and destruction stops the stream. Reduced-motion preferences disable pointer effects and allow instant reveals.

## How it is built

The TypeScript library uses Three.js and custom GLSL shaders for WebGL rendering. It has no Vue runtime dependency; Vue and NyxKit belong to the playground. The public API keeps rendering details inside the library instead of requiring the consumer to manage an animation loop.

The portfolio adds its own integration policy: mount on the client, avoid animation for reduced motion, and destroy the portrait when it is hidden or offscreen. These are application decisions built on the library's lifecycle.

See the [library API and lifecycle documentation](https://github.com/NyxKit/nyx-fission/blob/main/README.md) and [renderer implementation](https://github.com/NyxKit/nyx-fission/tree/main/src) for the underlying work.
