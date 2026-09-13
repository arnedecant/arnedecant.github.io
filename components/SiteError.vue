<script setup lang="ts">
const props = withDefaults(defineProps<{ statusCode?: number }>(), { statusCode: 404 })
const config = useAppConfig()
const copy = computed(() => props.statusCode === 404 ? config.ui.error.notFound : config.ui.error.unexpected)

useHead(() => ({
  title: `${props.statusCode} | ${copy.value.title} | ${config.site.name}`,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
}))
</script>

<template>
  <div class="site-error">
    <HeroParticleField />
    <header class="site-error__header">
      <a href="/" :aria-label="config.navigation.brandLabel">{{ config.site.name }}</a>
    </header>
    <main class="site-error__main">
      <h1 class="site-error__code">{{ statusCode }}</h1>
      <div class="site-error__message">
        <p>{{ copy.title }}</p>
        <a class="site-error__home" href="/">{{ config.ui.error.homeLabel }} <span aria-hidden="true">↗</span></a>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.site-error {
  position: relative;
  isolation: isolate;
  min-height: 100svh;
}

.site-error__header {
  position: relative;
  z-index: 1;
  display: flex;
  width: min(100% - (var(--page-gutter) * 2), var(--content-width));
  margin: 0 auto;
  min-height: 4.5rem;
  align-items: center;
  border-bottom: 1px solid var(--c-border-subtle);
  font-family: var(--font-technical);
  font-size: var(--text-technical);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.site-error__header a {
  color: var(--c-text);
  text-decoration: none;
}

.site-error__main {
  z-index: 1;
  display: flex;
  min-height: calc(100svh - 4.5rem);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
  padding: var(--space-12) var(--page-gutter) var(--space-16);
  text-align: center;
}

.site-error__code {
  color: var(--c-text);
  font-family: var(--font-body);
  font-size: clamp(8rem, min(32vw, 50svh), 28rem);
  font-weight: 500;
  letter-spacing: -0.07em;
  line-height: 0.85;
  padding-right: 0.07em;
}

.site-error__message {
  max-width: 32rem;
}

.site-error__message p {
  color: var(--c-text-muted);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
}

.site-error__home {
  display: inline-flex;
  min-height: 2.75rem;
  margin-top: var(--space-8);
  align-items: center;
  gap: var(--space-4);
}

</style>
