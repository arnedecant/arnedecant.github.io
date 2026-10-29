---
title: "Webcam Audio Visualiser"
abbreviation: "WAV"
slug: "webcam-audio-visualiser"
category: "Audio-reactive particle experiment"
role: "Creative development & shader programming"
status: "Live browser experiment"
lede: "Camera pixels become a particle surface, while the frequency content of a soundtrack changes how that surface moves."
screenshots:
  - src: "/images/projects/webcam-audio-visualiser/particles.webp"
    alt: "The Audio Visualiser rendering a colorful particle surface with playback and appearance controls."
    caption: "The running browser experiment with a bundled sample video supplied through a simulated camera. No physical webcam or personal camera feed was used."
    width: 1440
    height: 1000
  - src: "/images/projects/webcam-audio-visualiser/controls.webp"
    alt: "Audio Visualiser with its configuration controls open beside the particle scene."
    caption: "The application's real controls and particle output. The capture uses the same simulated camera source."
    width: 1440
    height: 1000
summary: "An interactive 3D audio-visual experience that transforms your webcam feed into a dynamic particle matrix. The application maps video pixels onto particles arranged on a 3D plane and animates them in real-time based on audio frequency analysis, creating a mesmerizing visual representation of music."
tech:
  - Vue
  - WebGL
  - Three.js
  - Web Audio
  - TypeScript
  - SCSS
featured: true
link: "https://arnedecant.github.io/audio-visualiser"
github: "https://github.com/arnedecant/audio-visualiser"
order: 6
logo:
  alt: "WAV"
---

## The idea

This project combines two live signals: the colors in a video frame and the frequencies in an audio track. Instead of displaying the frame as a flat texture, it turns the pixels into a particle matrix and uses the music to change their positions and scale.

It is an exploration of browser media, graphics, and interaction, built as a Vue application with a Three.js scene through TresJS.

## What it does

- **Video-driven particles.** Camera frames are sampled through an offscreen canvas and converted into geometry and color data.
- **Audio-reactive movement.** A Web Audio analyser separates bass, mid, and treble energy, which feeds the particle transformations.
- **Shader-based rendering.** Custom GLSL vertex and fragment shaders render the point geometry, with transparent additive blending.
- **Media and appearance controls.** The interface coordinates playback, camera use, and the available visual settings through shared application state.

## Problems I worked through

### Coordinating browser permissions and playback

A browser does not treat a camera request, audio playback, and a graphics loop as one operation. The application introduces the experience before starting playback, uses an explicit user interaction to unlock audio, and tracks camera permission state separately. Camera tracks can be stopped when the stream is no longer needed.

### Turning media into one visual signal

The audio analyser produces frequency data while the camera supplies frames at its own cadence. The particle update combines the current frame with bass, mid, and treble values. Geometry is created from the sampled image, then its position buffer is updated during rendering. Audio energy also changes point size, so the soundtrack affects both the shape and texture of the result.

### Making a camera image feel natural

A camera preview is usually expected to behave like a mirror. The frame-sampling path flips webcam input horizontally, while keeping the video path separate. Frame dimensions are checked before sampling so the renderer can wait for usable media rather than building particles from an empty frame.

## How it is built

Vue and Pinia separate audio analysis, user media, configuration, and rendering state. TresJS connects the Vue application to Three.js; the particle plane uses buffer geometry and a custom shader material. The audio path uses Three.js's `AudioAnalyser` over the Web Audio API.

The current interface plays a bundled track. Extra audio assets and presets in the repository are implementation resources, not a shipped track picker or preset browser. The [project README](https://github.com/arnedecant/audio-visualiser/blob/main/README.md), [particle renderer](https://github.com/arnedecant/audio-visualiser/blob/main/src/components/ParticlesPlane.vue), and [media store](https://github.com/arnedecant/audio-visualiser/blob/main/src/stores/usermedia.ts) describe that scope.

