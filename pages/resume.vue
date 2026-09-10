<script setup lang="ts">
import { NyxButton } from 'nyx-kit/components'
import { NyxSize, NyxTheme, NyxVariant } from 'nyx-kit/types'

const { data: resume } = await useAsyncData(() => queryCollection('pages').path('/pages/resume').first())

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

        <section v-if="resume?.resumeExperience?.length || resume?.resumeEducation?.length" class="resume-section" aria-labelledby="resume-experience-title">
          <div class="resume-section__heading">
            <p class="resume-section__label">{{ resume?.resumeBackgroundLabel }}</p>
            <h2 id="resume-experience-title">{{ resume?.resumeBackgroundTitle }}</h2>
          </div>
          <div class="resume-experience">
            <article v-for="item in resume?.resumeExperience" :key="`${item.company}-${item.period}`" class="resume-experience__item">
              <p class="resume-experience__period">{{ item.period }}</p>
              <div>
                <h3>{{ item.role }}</h3>
                <p class="resume-experience__company">{{ item.company }}</p>
                <p>{{ item.summary }}</p>
                <ul v-if="item.highlights.length">
                  <li v-for="highlight in item.highlights" :key="highlight">{{ highlight }}</li>
                </ul>
              </div>
            </article>
            <article v-for="item in resume?.resumeEducation" :key="item" class="resume-experience__item resume-experience__item--education">
              <p class="resume-experience__period">{{ resume?.resumeEducationLabel }}</p>
              <div>
                <h3>{{ item }}</h3>
                <p>{{ resume?.resumeEducationDescription }}</p>
              </div>
            </article>
          </div>
        </section>

        <section v-if="resume?.resumeSkills?.length" class="resume-section" aria-labelledby="resume-skills-title">
          <p class="resume-section__label">{{ resume?.resumeSkillsLabel }}</p>
          <h2 id="resume-skills-title">{{ resume?.resumeSkillsTitle }}</h2>
          <div class="resume-skills">
            <div v-for="group in resume.resumeSkills" :key="group.title" class="resume-skills__group">
              <h3>{{ group.title }}</h3>
              <p>{{ group.items.join(' / ') }}</p>
            </div>
          </div>
        </section>

        <section v-if="resume?.resumeProjects?.length" class="resume-section" aria-labelledby="resume-projects-title">
          <p class="resume-section__label">{{ resume?.resumeProjectsLabel }}</p>
          <h2 id="resume-projects-title">{{ resume?.resumeProjectsTitle }}</h2>
          <ul class="resume-projects">
            <li v-for="item in resume.resumeProjects" :key="item.label">
              <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </section>

        <footer class="resume-sheet__contact">
          <div>
            <p class="resume-section__label">{{ resume?.contactLabel }}</p>
            <h2>{{ resume?.contactTitle }}</h2>
          </div>
          <div class="resume-contact-links">
            <a :href="`mailto:${resume?.resumeEmail ?? config.site.email}`">{{ resume?.resumeEmail ?? config.site.email }}</a>
            <a v-for="item in resume?.resumeLinks" :key="item.label" :href="item.to" target="_blank" rel="noreferrer">{{ item.label }}</a>
          </div>
        </footer>
      </article>
    </div>
  </main>
</template>
