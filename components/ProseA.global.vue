<script setup lang="ts">
const props = defineProps<{
  href?: string
  target?: string
  rel?: string
}>()

const { seo } = useAppConfig()
const currentOrigin = useRequestURL().origin
const siteOrigin = new URL(seo.url).origin

const isExternalWebsite = computed(() => {
  if (!props.href || !/^(https?:)?\/\//i.test(props.href)) return false

  try {
    const destination = new URL(props.href, siteOrigin)
    return destination.origin !== siteOrigin && destination.origin !== currentOrigin
  } catch {
    return false
  }
})

const linkTarget = computed(() => isExternalWebsite.value ? '_blank' : props.target)
const linkRel = computed(() => isExternalWebsite.value
  ? [...new Set([...(props.rel?.split(/\s+/).filter(Boolean) ?? []), 'noopener', 'noreferrer'])].join(' ')
  : props.rel)
</script>

<template>
  <NuxtLink :to="props.href" :target="linkTarget" :rel="linkRel">
    <slot />
  </NuxtLink>
</template>
