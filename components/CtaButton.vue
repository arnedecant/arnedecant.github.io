<script setup lang="ts">
import { NyxButton } from 'nyx-kit/components'
import { NyxSize, NyxTheme, NyxVariant } from 'nyx-kit/types'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  to: string
  variant?: 'primary' | 'critical'
}>()
</script>

<template>
  <span class="cta-button-wrapper">
    <NuxtLink v-slot="{ href, navigate }" custom :to="props.to">
      <NyxButton
        v-bind="$attrs"
        :href="href"
        target="_self"
        :theme="props.variant === 'critical' ? NyxTheme.Warning : NyxTheme.Primary"
        :variant="props.variant === 'critical' ? NyxVariant.Filled : NyxVariant.Outline"
        :size="NyxSize.Large"
        class="cta-button"
        @click.capture="navigate"
      >
        <slot />
      </NyxButton>
    </NuxtLink>
  </span>
</template>

<style scoped lang="scss">
.cta-button-wrapper {
  // Give SSR scope attributes a DOM root without introducing a layout box.
  display: contents;
}

.cta-button {
  font-family: var(--font-technical);
  font-size: var(--text-technical);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
