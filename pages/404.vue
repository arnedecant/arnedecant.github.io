<script setup lang="ts">
definePageMeta({ layout: false })

// Prerender this route as GitHub Pages' standalone 404.html fallback.
if (import.meta.server && !import.meta.prerender) {
  setResponseStatus(404)
}
</script>

<template>
  <SiteError />
</template>
