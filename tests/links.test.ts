import { describe, expect, it } from 'vitest'
import { getLinkAttributes } from '../utils/links'

const origins = {
  siteOrigin: 'https://www.arnedecant.be',
  currentOrigin: 'http://localhost:9001',
}

describe('external website links', () => {
  it.each([
    'https://www.npmjs.com/package/nyx-kit',
    'https://github.com/NyxKit/nyx-fission',
    'http://example.com/project',
    '//example.com/project',
    'HTTPS://EXAMPLE.COM/project',
  ])('opens %s in a new tab', (href) => {
    expect(getLinkAttributes(href, origins)).toEqual({
      target: '_blank',
      rel: 'noopener noreferrer',
    })
  })

  it('enforces the external-link policy over an authored same-tab target', () => {
    expect(getLinkAttributes('https://example.com', { ...origins, target: '_self' }).target).toBe('_blank')
  })

  it('retains authored rel values while adding protection without duplicates', () => {
    const result = getLinkAttributes('https://example.com', {
      ...origins,
      rel: 'nofollow  sponsored noopener nofollow',
    })

    expect(result.rel).toBe('nofollow sponsored noopener noreferrer')
  })
})

describe('internal links and native actions', () => {
  it.each([
    '/projects/nyx-fission',
    '#a-live-example',
    '/#work',
    '../resume',
    '?view=details',
    'https://www.arnedecant.be/about',
    '//www.arnedecant.be/about',
    'http://localhost:9001/about',
    'mailto:hello@example.com',
    'tel:+3212345678',
    '',
    undefined,
  ])('keeps %s in the current context by default', (href) => {
    expect(getLinkAttributes(href, origins)).toEqual({ target: undefined, rel: undefined })
  })

  it('preserves explicit internal targets and rel values', () => {
    expect(getLinkAttributes('/images/projects/nyxkit/components.webp', {
      ...origins,
      target: '_blank',
      rel: 'noopener noreferrer',
    })).toEqual({ target: '_blank', rel: 'noopener noreferrer' })
  })

  it('does not break rendering for a malformed absolute URL', () => {
    expect(getLinkAttributes('https://[', {
      ...origins,
      target: '_self',
      rel: 'nofollow',
    })).toEqual({ target: '_self', rel: 'nofollow' })
  })
})
