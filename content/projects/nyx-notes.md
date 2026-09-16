---
title: "Nyx Notes"
slug: "nyx-notes"
github: "https://github.com/NyxKit/nyx-notes"
summary: "A self-hosted notes application in active development, with plain Markdown files as its source of truth. Combines a Rust backend, Vue interface, CLI, and Tauri shell, with REST and typed SSE for live updates."
category: "Self-hosted Markdown notes product"
role: "Product engineer"
status: "Personal project in active development"
era: "Recent work"
tech:
  - Rust
  - Vue 3
  - Tauri
  - REST
  - SSE
featured: true
resumeFeatured: true
order: 4
logo:
  src: "/images/nyx-notes-logo.svg"
  alt: "Nyx Notes lavender N note logo"
---

Nyx Notes keeps notes as plain Markdown files, with a Rust workspace providing filesystem storage, an Axum server, authentication, a CLI, and a Tauri shell. The Vue application uses Nyx Kit and NyxEditor, with REST and typed SSE subscriptions for live note and vault data.

Comments live in JSON sidecars anchored to selected text. Optional end-to-end encryption and AI are future directions, not shipped features.
