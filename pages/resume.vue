<script setup lang="ts">
import type { ExpertiseCollectionItem } from '@nuxt/content'
import { NyxButton } from 'nyx-kit/components'
import { NyxSize, NyxTheme, NyxVariant } from 'nyx-kit/types'

const { data: resume } = await useAsyncData(() => queryCollection('pages').path('/resume').first())

const { data: experience } = await useAsyncData('resume-experience', () =>
  queryCollection('experience').order('order', 'ASC').order('id', 'ASC').all(),
)

const { data: projects } = await useAsyncData('resume-projects', () =>
  queryCollection('projects').where('resumeFeatured', '=', true).order('order', 'ASC').order('id', 'ASC').all(),
)

const { data: expertise } = await useAsyncData('resume-expertise', () =>
  queryCollection('expertise').where('resumeFeatured', '=', true).order('order', 'ASC').order('id', 'ASC').all(),
)

const skills = computed<Pick<ExpertiseCollectionItem, 'title' | 'items'>[]>(() => [
  ...(resume.value?.resumeSkills ?? []),
  ...(expertise.value ?? []),
])

const config = useAppConfig()

useSeoMeta({
  title: () => resume.value?.title ?? config.seo.title,
  description: () => resume.value?.description ?? config.seo.description,
})

function printResume() {
  if (import.meta.client) window.print()
}
</script>

<template>
  <main class="resume-page">
    <div class="resume-page__shell">
      <header class="resume-page__intro">
        <div>
          <p class="resume-page__eyebrow">{{ resume?.eyebrow }}</p>
          <h1>{{ config.site.name }}</h1>
          <p class="resume-page__title">{{ resume?.resumeTitle ?? config.site.role }}</p>
          <p class="resume-page__location">{{ resume?.resumeLocation ?? config.site.location }}</p>
        </div>
        <NyxButton
          class="resume-page__print"
          type="button"
          :theme="NyxTheme.Primary"
          :variant="NyxVariant.Outline"
          :size="NyxSize.Large"
          @click="printResume"
        >
          {{ resume?.resumePrintLabel }}
        </NyxButton>
      </header>

      <article class="resume-sheet">
        <section v-if="resume?.resumeSummary" class="resume-section resume-summary" aria-labelledby="resume-summary-title">
          <p class="resume-section__label">{{ resume?.resumeProfileLabel }}</p>
          <h2 id="resume-summary-title">{{ resume?.resumeProfileTitle }}</h2>
          <p>{{ resume.resumeSummary }}</p>
        </section>

        <section v-if="experience?.length" class="resume-section" aria-labelledby="resume-experience-title">
          <div class="resume-section__heading">
            <p class="resume-section__label">{{ resume?.resumeBackgroundLabel }}</p>
            <h2 id="resume-experience-title">{{ resume?.resumeBackgroundTitle }}</h2>
          </div>
          <ExperienceList :items="experience ?? []" :education-label="resume?.resumeEducationLabel" />
        </section>

        <div class="resume-second-page">
          <section v-if="skills.length" class="resume-section" aria-labelledby="resume-skills-title">
            <p class="resume-section__label">{{ resume?.resumeSkillsLabel }}</p>
            <h2 id="resume-skills-title">{{ resume?.resumeSkillsTitle }}</h2>
            <div class="resume-skills">
              <div v-for="group in skills" :key="group.title" class="resume-skills__group">
                <h3>{{ group.title }}</h3>
                <p>{{ group.items.join(' / ') }}</p>
              </div>
            </div>
          </section>

          <section v-if="projects?.length" class="resume-section" aria-labelledby="resume-projects-title">
            <p class="resume-section__label">{{ resume?.resumeProjectsLabel }}</p>
            <h2 id="resume-projects-title">{{ resume?.resumeProjectsTitle }}</h2>
            <ResumeProjectList :items="projects ?? []" />
          </section>

          <section v-if="resume?.resumeCustomers?.length" class="resume-section" aria-labelledby="resume-customers-title">
            <p class="resume-section__label">{{ resume?.resumeCustomersLabel }}</p>
            <h2 id="resume-customers-title">{{ resume?.resumeCustomersTitle }}</h2>
            <dl class="resume-customers">
              <div v-for="item in resume.resumeCustomers" :key="item.product" class="resume-customers__group">
                <dt>{{ item.product }}</dt>
                <dd>{{ item.customers.join(', ') }}</dd>
              </div>
            </dl>
          </section>

          <footer class="resume-sheet__contact">
            <div>
              <p class="resume-section__label">{{ resume?.contactLabel }}</p>
              <h2>{{ resume?.contactTitle }}</h2>
            </div>
            <div class="resume-contact-links">
              <a :href="`mailto:${resume?.resumeEmail ?? config.site.email}`">{{ resume?.resumeEmail ?? config.site.email }}</a>
              <a v-for="item in resume?.resumeLinks" :key="item.label" :href="item.to" target="_blank" rel="noreferrer">
                <span class="resume-contact-links__label">{{ item.label }}</span>
                <span class="resume-contact-links__url">{{ item.to }}</span>
              </a>
            </div>
          </footer>
        </div>
      </article>
    </div>
  </main>
</template>
