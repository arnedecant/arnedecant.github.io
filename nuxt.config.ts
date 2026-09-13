import siteContent from './data/site.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      title: siteContent.seo.title,
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=3', sizes: '16x16 32x32 48x48' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=3', sizes: 'any' },
      ],
      meta: [
        { name: 'description', content: siteContent.seo.description },
      ],
    },
  },
  css: [
    '@/assets/styles/main.scss',
  ],

  fonts: {
    families: [
      { name: 'Playfair Display', provider: 'google' },
      { name: 'Inter', provider: 'google' },
      { name: 'JetBrains Mono', provider: 'google' },
    ],
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    }
  },

  vite: {
    optimizeDeps: {
      // Pre-bundle the Markdown parser's CommonJS dependencies for the browser.
      include: [
        '@nuxt/content > unified > extend',
        '@nuxt/content > @nuxtjs/mdc > remark-parse > mdast-util-from-markdown > micromark > debug',
      ],
    },
    resolve: {
      alias: {
        '@': new URL('./', import.meta.url).pathname,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "sass:math";`,
        },
      },
    },
  },

  content: {
    // SQLite connectors don't work in serverless environments like Netlify
    // Using default in-memory storage instead
  },

  studio: {
    // route: '/studio',
    github: {
      provider: 'github',
      owner: 'arnedecant',
      repo: 'arnedecant.github.io',
      branch: 'main',
    },
  },

  nitro: {
    prerender: {
      routes: ['/', '/404'],
      crawlLinks: true,
      ignore: ['/404.html', '/studio', '/studio/**', '/_studio', '/_studio/**', '/_nuxt_studio', '/_nuxt_studio/**']
    },
    hooks: {
      'prerender:generate'(route) {
        // Replace Nuxt's empty SPA fallback with the rendered error page.
        if (route.route === '/404') route.fileName = '/404.html'
      },
    },
    rollupConfig: {
      // No need to externalize better-sqlite3 since we're not using it on Netlify
    },
    // Prevent Nitro from replacing these env vars during build
    // They will be accessed at runtime from process.env
    replace: {
      // Keep these as process.env references instead of inlining values
      'process.env.STUDIO_GITHUB_CLIENT_ID': 'process.env.STUDIO_GITHUB_CLIENT_ID',
      'process.env.STUDIO_GITHUB_CLIENT_SECRET': 'process.env.STUDIO_GITHUB_CLIENT_SECRET',
    },
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-studio'
  ],
})
