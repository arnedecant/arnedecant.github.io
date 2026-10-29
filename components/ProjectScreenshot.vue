<script setup lang="ts">
defineProps<{
  image: { src: string, alt: string, caption: string, width: number, height: number }
  priority?: boolean
}>()
const { ui: { projectDetails: labels } } = useAppConfig()
</script>

<template>
  <figure class="project-screenshot" :class="{ 'project-screenshot--portrait': image.height > image.width }">
    <a :href="image.src" target="_blank" rel="noopener noreferrer" :aria-label="`${labels.openImagePrefix} ${image.alt} ${labels.newTabSuffix}`">
      <img
        :src="image.src"
        :alt="image.alt"
        :width="image.width"
        :height="image.height"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : 'auto'"
        decoding="async"
      >
    </a>
    <figcaption>{{ image.caption }}</figcaption>
  </figure>
</template>

<style scoped lang="scss">
.project-screenshot {
  margin: 0;

  &--portrait {
    width: min(100%, 28rem);
    margin-inline: auto;
  }

  a {
    display: block;
    overflow: hidden;
    border: 1px solid var(--c-border);
    border-radius: var(--radius-lg);
    background: var(--c-surface-lowest);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  figcaption {
    max-width: 75ch;
    margin-top: 1rem;
    color: var(--c-text-muted);
    font-size: 0.875rem;
    line-height: 1.6;
  }
}
</style>
