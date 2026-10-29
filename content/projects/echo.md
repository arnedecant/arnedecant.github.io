---
title: "Echo"
slug: "echo"
lede: "A way to read, search, and revisit exported conversations, without turning a personal archive into a hosted service."
screenshots:
  - src: "/images/projects/echo/conversation-library.webp"
    alt: "Echo showing a synthetic conversation beside an analysis discussion and follow-up composer."
    caption: "The local-library interface captured by Echo's browser acceptance script. All names, messages, and analysis shown are synthetic test data."
    width: 1280
    height: 720
github: "https://github.com/NyxKit/echo"
summary: "A local conversation library for browsing Instagram exports, with incremental imports and optional, user-initiated ChatGPT analysis. Built with Vue and TypeScript, backed by SQLite and managed local media."
category: "Local conversation library"
role: "Product engineer"
status: "Personal project in active development"
era: "Recent work"
tech:
  - Vue 3
  - TypeScript
  - SCSS
  - Node.js
  - SQLite
featured: true
resumeFeatured: true
order: 3
logo:
  src: "/images/echo-logo.svg"
  alt: "Echo purple overlapping speech bubbles logo"
---

## Why I built it

An exported conversation is useful data, but it is not a pleasant reading experience. History can span several files and imports, attachments live elsewhere in the export, and finding the context around an old message takes work.

Echo turns Instagram JSON exports into a local, read-only conversation library. The goal is to make that history readable and searchable while preserving the original exports.

## What it does

- **Incremental imports.** ZIP files or extracted folders can add history to the installed library without replacing older conversations. Uncertain matches are surfaced for review.
- **Conversation and media browsing.** Message search, participant information, shared assets, and a keyboard-accessible lightbox help navigate the archive. Media can link back to its source message.
- **Optional conversation analysis.** A separate discussion pane supports explicit, user-initiated ChatGPT requests. Selected messages and time windows define the context, and citations connect answers back to archived messages.
- **Persistent local work.** Discussions and drafts save to SQLite. Accepted background jobs can continue after the browser tab closes, and partial responses survive a restart without automatically resending them.

## Problems I worked through

### Combining overlapping history without losing provenance

Repeated exports can overlap or disagree. Importing everything as new messages creates duplicates; treating the latest export as authoritative loses older observations. Echo preserves stable message identities and source observations, reports identical imports as unchanged, and asks for review when ownership or history matches are uncertain.

### Keeping an answer tied to its source

The archive can grow while an analysis discussion is already in progress. A discussion needs a stable record of the context that was actually sent, rather than silently changing what an earlier answer refers to. Echo retains immutable source context for accepted answers and keeps source navigation available through citations.

### Making local storage understandable

There are two distinct storage models. The installed edition uses a loopback Node.js server, SQLite, and managed media files. The independent browser viewer caches an archive in IndexedDB. Their persistence and deletion behavior are different, so the interface explains where content is saved and provides explicit controls to remove the managed copy while leaving source exports untouched.

## How it is built

Vue, TypeScript, Pinia, and SCSS form the interface, using NyxKit components. The installed library adds a local Node.js server and SQLite. Import and background-job processing belong to that server so they can outlive a browser session.

Core browsing is local. Analysis sends the selected context only through an explicit action. Remote GIFs and user-requested link previews have their own network behavior; local-first does not mean every feature is offline.

Echo remains in active development. Desktop packages are release candidates, with platform validation still outstanding. See the [import design](https://github.com/NyxKit/echo/blob/main/docs/specs/library-import-engine.md), [discussion and job design](https://github.com/NyxKit/echo/blob/main/docs/specs/library-discussions-and-jobs.md), and [release acceptance record](https://github.com/NyxKit/echo/blob/main/docs/specs/library-release-acceptance.md).
