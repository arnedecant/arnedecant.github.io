<script setup lang="ts">
definePageMeta({ key: route => route.path })

const route = useRoute()
const { site, seo, ui: { projectDetails: labels } } = useAppConfig()
const path = `/projects/${String(route.params.slug)}`
const { data: project } = await useAsyncData(path, () =>
  queryCollection('projects').path(path).where('featured', '=', true).first(),
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: labels.notFound })
}

const { data: projects } = await useAsyncData('featured-project-navigation', () =>
  queryCollection('projects').where('featured', '=', true).order('order', 'ASC').order('id', 'ASC')
    .select('title', 'path').all(),
)

const nextProject = computed(() => {
  const items = projects.value ?? []
  const index = items.findIndex(item => item.path === path)
  return items.length > 1 && index >= 0 ? items[(index + 1) % items.length] : undefined
})
const heroImage = computed(() => project.value?.screenshots[0])
const otherImages = computed(() => project.value?.screenshots.slice(1) ?? [])
const sections = computed(() => project.value?.body?.toc?.links ?? [])
const pageTitle = computed(() => `${project.value?.title} | ${site.name}`)

useSeoMeta({
  title: () => pageTitle.value,
  description: () => project.value?.summary,
  ogTitle: () => pageTitle.value,
  ogDescription: () => project.value?.summary,
  ogType: 'article',
  ogImage: () => heroImage.value ? `${seo.url}${heroImage.value.src}` : undefined,
  ogImageAlt: () => heroImage.value?.alt,
  twitterCard: 'summary_large_image',
})
useHead({ link: [{ rel: 'canonical', href: `${seo.url}${path}` }] })
</script>

<template>
  <main v-if="project" class="project-page">
    <article class="container">
      <NuxtLink class="project-page__back" to="/#work">
        <Icon name="line-md:arrow-left" aria-hidden="true" />
        {{ labels.backLabel }}
      </NuxtLink>

      <header class="project-page__header">
        <div class="project-page__intro">
          <p class="project-page__eyebrow">{{ project.category }}</p>
          <h1>{{ project.title }}</h1>
          <p class="project-page__lede">{{ project.lede ?? project.summary }}</p>
          <ul class="project-page__links" :aria-label="labels.linksLabel">
            <li v-if="project.link">
              <a :href="project.link" target="_blank" rel="noopener noreferrer" :aria-label="`${labels.liveLabel} ${labels.newTabSuffix}`">
                {{ labels.liveLabel }} <Icon name="line-md:external-link" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a :href="project.github" target="_blank" rel="noopener noreferrer" :aria-label="`${labels.sourceLabel} ${labels.newTabSuffix}`">
                {{ labels.sourceLabel }} <Icon name="line-md:github-loop" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
        <dl class="project-page__facts">
          <div v-if="project.role"><dt>{{ labels.roleLabel }}</dt><dd>{{ project.role }}</dd></div>
          <div v-if="project.status"><dt>{{ labels.statusLabel }}</dt><dd>{{ project.status }}</dd></div>
          <div v-if="project.tech.length"><dt>{{ labels.techLabel }}</dt><dd>{{ project.tech.join(' · ') }}</dd></div>
        </dl>
      </header>

      <ProjectScreenshot v-if="heroImage" :image="heroImage" priority />

      <div class="project-page__story">
        <nav v-if="sections.length" class="project-page__contents" :aria-label="labels.contentsAriaLabel">
          <p class="project-page__eyebrow">{{ labels.contentsLabel }}</p>
          <ul>
            <li v-for="section in sections" :key="section.id">
              <a :href="`#${section.id}`">{{ section.text }}</a>
            </li>
          </ul>
        </nav>
        <ContentRenderer class="project-page__prose" :value="project" />
      </div>

      <section v-if="otherImages.length" class="project-page__gallery" :aria-label="labels.galleryLabel">
        <ProjectScreenshot v-for="image in otherImages" :key="image.src" :image="image" />
      </section>

      <nav class="project-page__footer" :aria-label="labels.navigationLabel">
        <NuxtLink class="project-page__back" to="/#work">
          <Icon name="line-md:arrow-left" aria-hidden="true" /> {{ labels.backFooterLabel }}
        </NuxtLink>
        <NuxtLink v-if="nextProject" class="project-page__next" :to="nextProject.path">
          <span class="project-page__eyebrow">{{ labels.nextLabel }}</span>
          <span>{{ nextProject.title }} <Icon name="line-md:arrow-right" aria-hidden="true" /></span>
        </NuxtLink>
      </nav>
    </article>
  </main>
</template>

<style lang="scss">
@use '@/assets/styles/project-detail';
</style>
