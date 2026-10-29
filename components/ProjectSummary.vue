<script setup lang="ts">

import type { ProjectsCollectionItem } from '@nuxt/content'
import { clamp, generateRandomString } from 'nyx-kit/utils'

const props = defineProps<{
  project: Pick<ProjectsCollectionItem, 'path' | 'title' | 'summary' | 'github' | 'link' | 'thumbnail' | 'logo' | 'abbreviation' | 'tech'>
}>()
const destination = computed(() => props.project.path)
const { ui: { projectDetails: labels } } = useAppConfig()

const $deco = useTemplateRef<HTMLDivElement>('deco')
const pointer = ref({ x: 0, y: 0 })
const decoString = ref('')

function onMouseMove (event: MouseEvent) {
  if (!destination.value || !$deco.value || !window.matchMedia('(hover: hover)').matches) return
  const rect = $deco.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  pointer.value = { 
    x: Math.round(clamp(x, 0, rect.width)), 
    y: Math.round(clamp(y, 0, rect.height)) 
  }
  decoString.value = generateRandomString(2000)
}

function onClick (event: MouseEvent) {
  if (event.target instanceof Element && event.target.closest('a, button, input, select, textarea')) return
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  if (window.getSelection()?.toString()) return
  if (!destination.value) return
  navigateTo(destination.value)
}

</script>

<template>
  <article
    class="project-summary"
    :class="{ 'project-summary--linked': destination }"
    @mousemove="onMouseMove"
    @click="onClick"
  >
    <figure :style="{ '--x': `${pointer.x}px`, '--y': `${pointer.y}px` }">
      <img
        v-if="props.project.thumbnail?.src"
        class="thumbnail"
        :src="props.project.thumbnail?.src"
        :alt="props.project.thumbnail?.alt"
      >
      <div ref="deco" class="deco" aria-hidden="true">{{ decoString }}</div>
      <figcaption>
        <img
          v-if="props.project.logo?.src"
          class="logo"
          :src="props.project.logo.src"
          :alt="props.project.logo.alt ?? props.project.title"
        >
        <span v-else-if="props.project.abbreviation" class="abbreviation">{{ props.project.abbreviation }}</span>
        <template v-else>{{ props.project.title }}</template>
      </figcaption>
    </figure>
    <h3><NuxtLink :to="destination">{{ props.project.title }}</NuxtLink></h3>
    <p>
      {{ props.project.summary }}
    </p>
    <ul class="links">
      <li v-if="props.project.github">
        <NuxtLink :to="props.project.github" target="_blank" rel="noopener noreferrer" :aria-label="`${props.project.title} ${labels.githubSuffix} ${labels.newTabSuffix}`">
          <Icon name="line-md:github-loop" aria-hidden="true" />
        </NuxtLink>
      </li>
      <li v-if="props.project.link">
        <NuxtLink :to="props.project.link" target="_blank" rel="noopener noreferrer" :aria-label="`${labels.websitePrefix} ${props.project.title} ${labels.newTabSuffix}`">
          <Icon name="line-md:link" aria-hidden="true" />
        </NuxtLink>
      </li>
      <li class="details-link">
        <NuxtLink :to="destination" :aria-label="`${labels.explorePrefix} ${props.project.title}`">
          <span class="details-link__label">{{ labels.exploreLabel }}</span>
          <Icon name="line-md:arrow-right" aria-hidden="true" />
        </NuxtLink>
      </li>
    </ul>
    <ul v-if="props.project.tech?.length" class="tech">
      <li v-for="tech in props.project.tech" :key="tech">{{ tech }}</li>
    </ul>
  </article>
</template>

<style scoped lang="scss">

.project-summary {
  display: flex;
  flex-direction: column;
  border-radius: var(--nyx-radius-lg);
  padding: 1rem;
  background: var(--c-background);
  border: 1px solid var(--nyx-c-text-4);
  transition: 0.3s ease;
  transition-property: scale, box-shadow;
}

.project-summary--linked {
  cursor: pointer;
}

h3 {
  font-size: 1.25em;
  margin-top: 1.5rem;
  font-weight: 300;

  a {
    color: inherit;
    text-decoration: none;
  }
}

p {
  font-weight: 300;
  margin: 1rem 0;
  line-height: 1.5;
}

figure {
  --x: 0px; 
  --y: 0px;

  aspect-ratio: 1;
  width: 100%;
  object-fit: cover;
  border: 0;

  border-radius: var(--nyx-radius-xl);
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient-aurora-radial);
    mix-blend-mode: darken;
  }

  figcaption {
    --border-width: 2px;
    z-index: 1;
    font-size: 1.25em;
    line-height: 1.25;
    text-align: center;
    width: 50%;
    padding: 1rem;
    aspect-ratio: 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: var(--c-background);
    color: var(--nyx-c-text-1);

    .logo {
      display: block;
      width: 50%;
      height: 50%;
      object-fit: contain;
    }

    .abbreviation {
      color: var(--c-primary);
      font-family: var(--font-technical);
      font-size: 3rem;
      font-weight: 700;
      line-height: 1;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1; // NOTE: remove if I want the text to be blended as well
      width: calc(100% + (var(--border-width) * 2));
      height: calc(100% + (var(--border-width) * 2));
      left: calc(var(--border-width) * -1);
      top: calc(var(--border-width) * -1);
      background: var(--gradient-aurora-linear);
      border-radius: 50%;
      mix-blend-mode: darken;
      filter: blur(0rem);
      transition: filter 0.3s ease;
      animation: rotate 3s linear infinite;
      animation-play-state: paused;
    }
  }
}

.tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
  font-weight: 300;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--nyx-c-text-4);
    border-radius: 0.5rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
}

.links {
  display: flex;
  gap: 0.5rem;
  margin: auto 0 1rem;
  padding: 0;
  list-style: none;
  align-items: center;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.75rem;
    min-height: 2.75rem;
    color: var(--nyx-c-default);

    &:hover {
      color: var(--nyx-c-default-light);
    }
  }

  .iconify {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.details-link {
  margin-left: auto;

  a {
    gap: 0.5rem;
    color: var(--c-primary);
  }
}

.details-link__label {
  font-size: 0.8rem;
}

.deco {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 0;
	height: 100%;
	width: 100%;
	font-family: var(--nyx-font-family-mono);
	font-size: 0.85rem;
	word-wrap: break-word;
	line-height: 1.15;
	color: #fff;
	opacity: 0;
  transition: opacity 0.5s ease;
	mask-image: radial-gradient(300px circle at var(--x) var(--y), black 20%, rgba(0,0,0,0.25), transparent);
}

@media (hover: hover) {
  .project-summary--linked:hover {
    scale: 1.025;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
  }

  .project-summary--linked:hover figcaption::after {
    animation-play-state: running;
    filter: blur(1rem);
  }

  .project-summary--linked figure:hover .deco {
    opacity: 1;
  }
}

@media (hover: none) {
  .project-summary--linked figcaption::after {
    animation-play-state: running;
    filter: blur(1rem);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-summary,
  .deco,
  figure figcaption::after {
    transition: none;
    animation: none;
  }

  .project-summary--linked:hover {
    scale: 1;
  }
}
</style>
