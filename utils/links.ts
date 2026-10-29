interface LinkOptions {
  siteOrigin: string
  currentOrigin: string
  target?: string
  rel?: string
}

export function getLinkAttributes(href: string | undefined, options: LinkOptions) {
  const { siteOrigin, currentOrigin, target, rel } = options
  let isExternalWebsite = false

  if (href && /^(https?:)?\/\//i.test(href)) {
    try {
      const destination = new URL(href, siteOrigin)
      isExternalWebsite = destination.origin !== siteOrigin && destination.origin !== currentOrigin
    } catch {
      // Invalid URLs retain the author's attributes without breaking rendering.
    }
  }

  return {
    target: isExternalWebsite ? '_blank' : target,
    rel: isExternalWebsite
      ? [...new Set([...(rel?.split(/\s+/).filter(Boolean) ?? []), 'noopener', 'noreferrer'])].join(' ')
      : rel,
  }
}
