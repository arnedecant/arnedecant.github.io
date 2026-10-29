---
title: "Anthos"
slug: "anthos"
lede: "Connecting physical plant sensors to a home-hosted dashboard, with the firmware, data pipeline, and interface designed together."
screenshots:
  - src: "/images/projects/anthos/dashboard.webp"
    alt: "Anthos dashboard with three demonstration plant nodes, sensor readings, and node health information."
    caption: "The implemented Vue dashboard with synthetic API responses. Plant names, readings, logs, and health figures are demonstration data, not measurements from a live installation."
    width: 1600
    height: 1000
github: "https://github.com/NyxKit/anthos"
summary: "A local-first plant monitoring and care platform connecting M5Stack nodes, a TypeScript ingestion server, and a Vue dashboard."
category: "Local-first plant monitoring platform"
role: "Product engineer"
status: "Personal project in active development"
era: "Recent work"
tech:
  - M5Stack AtomS3 Lite
  - TypeScript
  - Express
  - Vue 3
  - Tauri
featured: true
order: 5
logo:
  src: "/images/anthos-logo.svg"
  alt: "Anthos purple circuit leaf logo"
---

## Why I built it

Anthos explores the whole path from a physical sensor to an understandable interface. A plant-monitoring product has to deal with more than a dashboard: sensors can be missing, Wi-Fi can drop, devices sleep to save power, and a home server needs to survive restarts.

The project brings those concerns together in a local-first system built around M5Stack AtomS3 Lite nodes and a home-hosted server.

## What it does

- **Node-pushed telemetry.** Devices send readings and health information when they have data, rather than requiring the server to poll each device.
- **A shared view of each node.** The dashboard brings together available light, environmental, and moisture readings with connectivity, power-profile, and device information.
- **Device provisioning and management.** The codebase includes Bluetooth provisioning, logical node registration, display names, and power-profile controls.
- **Local hosting.** A TypeScript API serves the built Vue frontend from the same deployment. Docker and persistent storage make a NAS or another always-on host a practical target.
- **Diagnostics.** Historical logs and a live log stream help connect what happened on a device to what the server observed.

## Problems I worked through

### A sleeping device is not necessarily offline

A health check based on a short fixed timeout incorrectly marks low-power nodes as disconnected. Anthos derives the quiet window from the active power profile and allows three expected telemetry intervals before reporting a problem. A profile change starts a new window, and fresh telemetry brings the node back online.

Firmware work also persists cadence settings and guards sleep transitions. This makes power management a contract shared by the device, server, and dashboard rather than a frontend-only indicator.

### Treating missing sensors as a normal condition

Physical hardware is less predictable than a mock API. The firmware must continue operating when a sensor is absent, and the interface must distinguish unavailable readings from meaningful values. Hardware research also matters: the analog soil-moisture unit cannot simply be treated like an I²C environmental sensor on a shared hub.

### Keeping the home deployment manageable

An all-in-one server reduces the number of services a home installation has to operate. Node push fits intermittent connectivity, while shared TypeScript contracts keep the API and dashboard aligned. Persistent data belongs outside the container so a restart or image upgrade does not erase it.

## Where it stands

Anthos is an active personal project. Monitoring, device management, and power behavior are the focus of this case study. Pump commands and automation code exist, but a dependable, unattended auto-watering product is not claimed here. Physical deployment results and long-term reliability still need a separate account.

See the [system architecture](https://github.com/NyxKit/anthos/blob/main/docs/architecture.md), [power-aware online detection](https://github.com/NyxKit/anthos/blob/main/specs/018-power-telemetry-online/spec.md), and [shared node status implementation](https://github.com/NyxKit/anthos/blob/main/shared/src/nodes/classes/PlantNode.ts).
