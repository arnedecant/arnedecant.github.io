import { NyxKit } from 'nyx-kit'
import { NyxColourMode, NyxSize, NyxTheme, NyxVariant } from 'nyx-kit/types'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(NyxKit, {
    colourMode: { mode: NyxColourMode.Dark },
    defaults: {
      all: {
        theme: NyxTheme.Primary,
        size: NyxSize.Medium,
        variant: NyxVariant.Soft,
      },
      button: {
        theme: NyxTheme.Primary,
        size: NyxSize.Medium,
        variant: NyxVariant.Soft,
      },
    },
  })
})
