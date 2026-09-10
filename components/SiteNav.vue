<script setup lang="ts">
const isOpen = ref(false)
const config = useAppConfig()
const route = useRoute()
const router = useRouter()
const links = config.navigation.links
const homeLabel = computed(() => links.find(link => link.to === '/')?.label ?? '')
const activeSection = ref(homeLabel.value)
let observedRoute: string | undefined
const defaultScrollBehavior = router.options.scrollBehavior

// Updating the URL while scrolling must not scroll back to the section's start.
const scrollBehavior: typeof defaultScrollBehavior = (to, from, savedPosition) => {
  if (!savedPosition && to.fullPath === observedRoute) {
    observedRoute = undefined
    return false
  }
  return defaultScrollBehavior?.(to, from, savedPosition)
}

let sectionObserver: IntersectionObserver | undefined

function closeMenu() {
  isOpen.value = false
}

function stopSectionObserver() {
  sectionObserver?.disconnect()
  sectionObserver = undefined
}

function startSectionObserver() {
  if (!import.meta.client || route.path !== '/') return

  activeSection.value = homeLabel.value

  const sections = [
    { id: '', label: homeLabel.value, element: document.querySelector('.home-hero') },
    ...links
    .filter(link => link.to.includes('#'))
    .map(link => ({ id: link.to.split('#')[1] ?? '', label: link.label, element: document.getElementById(link.to.split('#')[1] ?? '') })),
  ]
    .filter(section => section.element)

  sectionObserver = new IntersectionObserver((entries) => {
    const visibleSection = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]

    if (!visibleSection) return

    const section = sections.find(item => item.element === visibleSection.target)
    if (!section || activeSection.value === section.label) return

    activeSection.value = section.label
    const hash = section.id ? `#${section.id}` : ''
    if (router.currentRoute.value.path !== '/' || router.currentRoute.value.hash === hash) return
    const destination = { path: '/', query: router.currentRoute.value.query, hash }
    observedRoute = router.resolve(destination).fullPath
    void router.replace(destination)
  }, {
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0,
  })

  sections.forEach(section => sectionObserver?.observe(section.element!))
}

watch(() => route.path, async () => {
  stopSectionObserver()
  await nextTick()
  startSectionObserver()
})

onMounted(() => {
  router.options.scrollBehavior = scrollBehavior
  startSectionObserver()
})
onBeforeUnmount(() => {
  stopSectionObserver()
  router.options.scrollBehavior = defaultScrollBehavior
})
</script>

<template>
  <header class="site-nav" :class="{ 'site-nav--open': isOpen }">
    <div class="site-nav__inner">
      <NuxtLink to="/" class="site-nav__brand" :aria-label="config.navigation.brandLabel" @click="closeMenu">
        <span class="site-nav__mark">{{ config.site.mark }}</span>
        <span>{{ config.site.name }}</span>
      </NuxtLink>

      <button
        class="site-nav__toggle"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="site-navigation"
        :aria-label="isOpen ? config.navigation.closeLabel : config.navigation.openLabel"
        @click="isOpen = !isOpen"
      >
        <span />
        <span />
      </button>

      <nav id="site-navigation" class="site-nav__links" :data-section="`${config.navigation.currentPrefix}${activeSection}`" :aria-label="config.navigation.ariaLabel">
        <div class="site-nav__menu-brand" aria-hidden="true">
          <span class="site-nav__mark">{{ config.site.mark }}</span>
          <span>{{ config.site.name }}</span>
        </div>
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" @click="closeMenu">
          {{ link.label }}
        </NuxtLink>
        <NuxtLink v-if="config.resume" class="site-nav__resume" :to="config.resume.to">
          {{ config.resume.label }}
        </NuxtLink>
        <SocialLinks compact class="site-nav__socials" />
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.site-nav {
  position: sticky;
  z-index: 10;
  top: 0;
  border-bottom: 1px solid var(--c-border-subtle);
  background: color-mix(in srgb, var(--c-background) 84%, transparent);
  backdrop-filter: blur(12px);
}

.site-nav__inner {
  display: flex;
  width: min(100% - (var(--page-gutter) * 2), var(--content-width));
  min-height: 4.5rem;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
}

.site-nav__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--c-text);
  font-family: var(--font-technical);
  font-size: var(--text-technical);
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.site-nav__mark {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 1px solid var(--c-primary-signal);
  color: var(--c-primary);
  font-size: 0.625rem;
}

.site-nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.site-nav__menu-brand {
  display: none;
}

.site-nav__socials {
  display: none;
}

.site-nav__links a {
  color: var(--c-text-muted);
  font-family: var(--font-technical);
  font-size: var(--text-label);
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
}

.site-nav__links a:hover {
  color: var(--c-primary);
}

.site-nav__links .site-nav__resume {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--c-primary-signal);
  color: var(--c-primary);
}

.site-nav__toggle {
  display: none;
  width: 2.75rem;
  height: 2.75rem;
  padding: var(--space-3);
  background: transparent;
  color: var(--c-text);
}

.site-nav__toggle span {
  display: block;
  height: 1px;
  margin: 0.375rem 0;
  background: currentColor;
  transition: transform 0.25s ease, margin 0.25s ease;
}

.site-nav--open .site-nav__toggle span:first-child {
  margin: 0;
  transform: translateY(0.5px) rotate(45deg);
}

.site-nav--open .site-nav__toggle span:last-child {
  margin: 0;
  transform: translateY(-0.5px) rotate(-45deg);
}

@media (max-width: 52em) {
  .site-nav--open {
    background: var(--c-background);
  }

  .site-nav__toggle {
    display: block;
    position: relative;
    z-index: 2;
  }

  .site-nav__links {
    position: fixed;
    z-index: 1;
    inset: 0;
    height: 100dvh;
    display: grid;
    visibility: hidden;
    align-content: center;
    gap: var(--space-6);
    padding: 7.5rem var(--page-gutter) 3rem;
    overflow-y: auto;
    opacity: 0;
    pointer-events: none;
    clip-path: inset(0 0 100% 0);
    background:
      radial-gradient(circle at 85% 20%, color-mix(in srgb, var(--c-primary) 14%, transparent), transparent 28rem),
      linear-gradient(145deg, var(--c-background), var(--c-surface-lowest));
    transition: clip-path 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, visibility 0.65s;
  }

  .site-nav__links::before {
    position: absolute;
    top: 7.5rem;
    right: var(--page-gutter);
    color: var(--c-primary);
    content: attr(data-section);
    font-family: var(--font-technical);
    font-size: var(--text-label);
    letter-spacing: 0.15em;
  }

  .site-nav__links::after {
    position: absolute;
    right: var(--page-gutter);
    bottom: 2rem;
    left: var(--page-gutter);
    height: 1px;
    background: var(--c-border-subtle);
    content: '';
  }

  .site-nav--open .site-nav__links {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
    clip-path: inset(0);
  }

  .site-nav__links a {
    position: relative;
    width: fit-content;
    color: var(--c-text);
    font-family: var(--font-display);
    font-size: clamp(2.75rem, 11vw, 6rem);
    font-weight: 300;
    letter-spacing: -0.04em;
    line-height: 0.9;
    text-transform: none;
    opacity: 0;
    transform: translateY(1.25rem);
    transition: color 0.2s ease, opacity 0.45s ease, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .site-nav--open .site-nav__links a {
    opacity: 1;
    transform: translateY(0);
  }

  .site-nav--open .site-nav__links a:nth-of-type(1) { transition-delay: 0.08s; }
  .site-nav--open .site-nav__links a:nth-of-type(2) { transition-delay: 0.13s; }
  .site-nav--open .site-nav__links a:nth-of-type(3) { transition-delay: 0.18s; }
  .site-nav--open .site-nav__links a:nth-of-type(4) { transition-delay: 0.23s; }
  .site-nav--open .site-nav__links a:nth-of-type(5) { transition-delay: 0.28s; }
  .site-nav--open .site-nav__links a:nth-of-type(6) { transition-delay: 0.33s; }

  .site-nav__menu-brand {
    position: absolute;
    top: 2rem;
    left: var(--page-gutter);
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    color: var(--c-text);
    font-family: var(--font-technical);
    font-size: var(--text-technical);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .site-nav__menu-brand .site-nav__mark {
    flex: 0 0 auto;
  }

  .site-nav--open .site-nav__links::before {
    animation: nav-label-in 0.5s 0.25s both cubic-bezier(0.16, 1, 0.3, 1);
  }

  .site-nav--open .site-nav__links::after {
    animation: nav-rule-in 0.7s 0.35s both cubic-bezier(0.16, 1, 0.3, 1);
  }

  .site-nav__links a::before {
    position: absolute;
    top: 50%;
    left: -1.25rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--c-primary);
    content: '';
    opacity: 0;
    transform: translate(-100%, -50%) scale(0.5);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .site-nav__links a:hover,
  .site-nav__links a:focus-visible {
    color: var(--c-primary);
  }

  .site-nav__links a:hover::before,
  .site-nav__links a:focus-visible::before {
    opacity: 1;
    transform: translate(-100%, -50%) scale(1);
  }

  .site-nav__links .site-nav__resume {
    margin-top: var(--space-4);
    padding: var(--space-3) var(--space-4);
    border-color: var(--c-primary-signal);
    font-family: var(--font-technical);
    font-size: var(--text-technical);
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
  }

  .site-nav__socials {
    position: absolute;
    right: var(--page-gutter);
    bottom: 3.5rem;
    left: var(--page-gutter);
    display: flex;
    gap: var(--space-2);
    justify-content: flex-end;
  }

  .site-nav__socials :deep(a) {
    width: 2.5rem;
    height: 2.5rem;
    justify-content: center;
    color: var(--c-text-muted);
  }

  .site-nav__socials :deep(.iconify) {
    font-size: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-nav__toggle span,
  .site-nav__links,
  .site-nav__links a {
    transition: none;
    animation: none !important;
  }
}

@keyframes nav-label-in {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes nav-rule-in {
  from { transform: scaleX(0); transform-origin: right; }
  to { transform: scaleX(1); transform-origin: right; }
}
</style>
