<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'

defineProps<{
  items: Pick<ProjectsCollectionItem, 'id' | 'path' | 'title' | 'github' | 'link' | 'summary'>[]
  demoLabel: string
}>()
</script>

<template>
  <ul class="about-project-list">
    <li v-for="project in items" :key="project.id">
      <NuxtLink :to="project.path">{{ project.title }}</NuxtLink>
      <template v-if="project.link">
        (<a :href="project.link" target="_blank" rel="noreferrer">{{ demoLabel }}</a>)
      </template>
      <span v-if="project.summary" class="about-project-list__summary">{{ project.summary }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.about-project-list__summary {
  display: block;
  margin-top: var(--space-1);
}
</style>
