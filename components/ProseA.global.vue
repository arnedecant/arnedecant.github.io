<script setup lang="ts">
import { getLinkAttributes } from '@/utils/links'

const props = defineProps<{
  href?: string
  target?: string
  rel?: string
}>()

const { seo } = useAppConfig()
const currentOrigin = useRequestURL().origin
const siteOrigin = new URL(seo.url).origin

const linkAttributes = computed(() => getLinkAttributes(props.href, {
  siteOrigin,
  currentOrigin,
  target: props.target,
  rel: props.rel,
}))
</script>

<template>
  <NuxtLink :to="props.href" :target="linkAttributes.target" :rel="linkAttributes.rel">
    <slot />
  </NuxtLink>
</template>
