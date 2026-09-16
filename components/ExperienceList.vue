<script setup lang="ts">
import type { ExperienceCollectionItem } from '@nuxt/content'

defineProps<{
  items: ExperienceCollectionItem[]
  educationLabel?: string
}>()
</script>

<template>
  <div class="experience-list">
    <article
      v-for="item in items"
      :key="item.id"
      class="experience-list__item"
      :aria-label="item.kind === 'education' ? educationLabel : undefined"
    >
      <p class="experience-list__period">{{ item.period }}</p>
      <div class="experience-list__details">
        <h3>{{ item.title }}</h3>
        <p class="experience-list__organization">{{ item.organization }}</p>
        <div class="experience-list__description">
          <MDC :value="item.summary" tag="p" unwrap="p" />
          <ul v-if="item.highlights.length">
            <li v-for="highlight in item.highlights" :key="highlight">
              <MDC :value="highlight" tag="span" unwrap="p" />
            </li>
          </ul>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.experience-list h3,
.experience-list p {
  margin-top: 0;
}

.experience-list__item {
  display: grid;
  grid-template-columns: 9rem 1fr;
  gap: var(--space-8);
  padding: var(--space-8) 0;
  border-top: 1px solid var(--c-border-subtle);
}

.experience-list__item:first-child {
  border-top: 0;
  padding-top: var(--space-2);
}

.experience-list__period,
.experience-list__organization {
  color: var(--nyx-c-text-3);
  font-family: var(--font-technical);
  font-size: var(--text-technical);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.experience-list__period {
  margin-bottom: 0;
}

.experience-list h3 {
  margin-bottom: var(--space-2);
  font-size: 1.25rem;
}

.experience-list__organization {
  margin-bottom: var(--space-6);
  color: var(--c-primary);
}

.experience-list__description :deep(p) {
  color: var(--c-text-muted);
}

.experience-list ul {
  margin: var(--space-4) 0 0;
  padding-left: 1.25rem;
  list-style-type: '–  ';
  color: var(--c-text-muted);
}

.experience-list li::marker {
  color: var(--c-primary);
  font-weight: 600;
}

.experience-list li + li {
  margin-top: var(--space-2);
}

.experience-list :deep(a) {
  color: var(--c-text);
  text-underline-offset: 0.2em;
}

.experience-list :deep(a:hover) {
  color: var(--c-primary);
}

@media (max-width: 42em) {
  .experience-list__item {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }
}

@media print {
  .experience-list__item {
    grid-template-columns: 34mm minmax(0, 0.5fr) minmax(0, 2.15fr);
    align-items: baseline;
    gap: 2mm 4mm;
    padding: 3mm 0;
    border-color: #ddd;
    break-inside: avoid;
  }

  .experience-list__item:first-child {
    padding-top: 0;
  }

  .experience-list__period {
    color: oklch(45% 0.01 270);
    white-space: nowrap;
  }

  .experience-list__details {
    display: contents;
  }

  .experience-list__details h3 {
    grid-column: 3;
    grid-row: 1;
    margin-bottom: 0;
  }

  .experience-list__organization {
    grid-column: 2;
    grid-row: 1;
    margin-bottom: 0;
  }

  .experience-list__description {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  .experience-list ul {
    margin-top: 2mm;
  }

  .experience-list li::marker {
    color: oklch(45% 0.1 235);
  }

  .experience-list li + li {
    margin-top: 1mm;
  }

  .experience-list h3 {
    font-size: 11pt;
  }

  .experience-list p,
  .experience-list li,
  .experience-list :deep(a) {
    font-size: 9pt;
  }
}
</style>
