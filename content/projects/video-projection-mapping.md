---
title: "Video Projection Mapping"
abbreviation: "VPM"
slug: "video-projection-mapping"
category: "Interactive WebGL experiment"
role: "Creative development"
status: "Live browser experiment"
lede: "A moving image spread across a sculptural grid of cubes, with shapes and depth that respond to the pointer."
screenshots:
  - src: "/images/projects/video-projection-mapping/heart.webp"
    alt: "Video mapped across a heart-shaped grid of cubes on a pink and violet background."
    caption: "The live Three.js experiment, with video projected across its heart-shaped cube grid."
    width: 1440
    height: 1000
  - src: "/images/projects/video-projection-mapping/interaction.webp"
    alt: "The projection grid viewed at an angle, revealing cube depth and pointer-driven elevation."
    caption: "A second view of the running scene, showing the three-dimensional construction and interaction."
    width: 1440
    height: 1000
summary: "An interactive 3D video projection mapping application built with Three.js that creates dynamic, mask-based video projections on 3D cube grids. Users can interact with different projection patterns through mouse hover effects and switch between various video-mask combinations."
tech:
  - WebGL
  - Three.js
  - TypeScript
  - GSAP
  - SCSS
featured: true
link: "https://arnedecant.github.io/video-projection-mapping"
github: "https://github.com/arnedecant/video-projection-mapping"
order: 4
logo:
  alt: VPM
---

## The idea

This experiment takes a flat video and breaks its surface into a three-dimensional object. A mask determines where cubes exist; each cube receives the part of the moving image that belongs at its position. Hovering lifts nearby cubes, making the image feel physical.

The current scene switches between heart, lungs, and home masks, with animated transitions and optional webcam input. It is a browser-based graphics experiment, not a physical projector-calibration tool.

## What it does

- **Mask-defined geometry.** Image brightness determines which cells of a configurable grid become cubes.
- **Continuous video projection.** Each cube samples a region of a shared video texture, so the grid reads as one image.
- **Local hover elevation.** The closest cube and surrounding rings move forward with diminishing strength, then return when the pointer leaves.
- **Animated shape changes.** GSAP timelines stagger cube scale and depth during transitions between masks.
- **An explorable 3D scene.** Orbit controls reveal the depth, and the renderer follows the canvas's displayed size.

## Problems I worked through

### Keeping the image continuous across gaps

Mapping the full video onto every cube would repeat the image. Dividing texture coordinates by cube count alone would also ignore the physical gaps between cubes. The implementation calculates each cube's UV rectangle from the full grid span, including the gaps, to preserve its place in the projected image.

### Hovering through holes and moving geometry

The mask leaves empty cells, and elevated cubes no longer lie on a flat surface. The interaction projects the pointer ray into the grid's local reference plane, computes a grid coordinate, then finds the nearest existing cube. Bounds checks prevent distant pointer positions from affecting the object. This keeps the interaction anchored to the grid rather than chasing whichever raised face happens to be under the cursor.

### Avoiding conflicting motion

Hover animations overwrite earlier movement on the same cube, while shape switching is gated during a transition. The renderer also resizes only when the canvas size or pixel ratio changes, with a device-pixel-ratio cap to limit rendering cost.

## How it is built

TypeScript separates the canvas application, projection model, user-media handling, and animation utilities. Three.js supplies the scene, camera, geometry, and video textures; GSAP handles transitions. Configuration defines the grid dimensions, cube spacing, elevation, and active mask/video pairs.

The [projection model](https://github.com/arnedecant/video-projection-mapping/blob/main/src/modules/webgl/classes/VideoProjection.ts) contains the UV and pointer-plane work. The [active configuration](https://github.com/arnedecant/video-projection-mapping/blob/main/src/modules/webgl/data/config.ts) is the source for the three currently enabled shapes; additional repository assets are not all exposed in the interface.
