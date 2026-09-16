<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'

defineProps<{
  items: ProjectsCollectionItem[]
}>()
</script>

<template>
  <div class="resume-projects">
    <article v-for="project in items" :key="project.id" class="resume-projects__item">
      <div class="resume-projects__heading">
        <h3>
          <a class="resume-projects__title" :href="project.link || project.github" target="_blank" rel="noreferrer">
            {{ project.title }}
            <Icon class="resume-projects__link-icon" name="line-md:link" aria-hidden="true" />
          </a>
          <span class="resume-projects__repository">(<a :href="project.github" target="_blank" rel="noreferrer">{{ project.github }}</a>)</span>
        </h3>
        <p v-if="project.tech.length" class="resume-projects__tech">{{ project.tech.join(' / ') }}</p>
      </div>
      <p v-if="project.summary" class="resume-projects__summary">{{ project.summary }}</p>
    </article>
  </div>
</template>

<style scoped lang="scss">
.resume-projects {
  display: grid;
  gap: var(--space-6);
}

.resume-projects__item {
  break-inside: avoid;
}

.resume-projects__heading {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-1) var(--space-4);
  margin-bottom: var(--space-2);
}

.resume-projects__heading h3,
.resume-projects__heading p,
.resume-projects__summary {
  margin: 0;
}

.resume-projects__heading h3 {
  font-size: 1rem;
}

.resume-projects__heading a {
  color: var(--c-text);
  font-size: inherit;
}

.resume-projects__heading a:hover {
  color: var(--c-primary);
}

.resume-projects__title {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.resume-projects__link-icon {
  flex-shrink: 0;
  font-size: 0.875em;
}

.resume-projects__tech {
  color: var(--c-text-muted);
  font-size: var(--text-technical);
}

.resume-projects__summary {
  color: var(--c-text-muted);
  line-height: 1.6;
}

.resume-projects__repository {
  display: none;
  max-width: 100%;
  margin-left: var(--space-2);
  color: var(--c-text-muted);
  font-family: var(--font-body);
  font-size: var(--text-technical);
  font-weight: 400;
  overflow-wrap: anywhere;
}

.resume-projects__repository a {
  color: inherit;
  font-size: inherit;
}

@media print {
  .resume-projects {
    gap: 3mm;
  }

  .resume-projects__heading {
    gap: 1mm 4mm;
    margin-bottom: 1mm;
  }

  .resume-projects__tech {
    font-size: 8pt;
  }

  .resume-projects__title {
    display: inline;
  }

  .resume-projects__link-icon {
    display: none;
  }

  .resume-projects__repository {
    display: inline-block;
    font-size: 7.5pt;
    line-height: 1.4;
  }
}
</style>
