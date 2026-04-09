import Head from 'next/head'
import { useRouter } from 'next/router'

import type * as types from '@/lib/types'
import * as config from '@/lib/config'
import { getSocialImageUrl } from '@/lib/get-social-image-url'
import { useI18n } from '@/lib/i18n'

export function PageHead({
  site,
  title,
  description,
  pageId,
  image,
  url,
  isBlogPost
}: types.PageProps & {
  title?: string
  description?: string
  image?: string
  url?: string
  isBlogPost?: boolean
}) {
  const router = useRouter()
  const { t } = useI18n()
  const rssFeedUrl = `${config.host}/feed`

  title = title ?? site?.name
  description = description ?? site?.description

  const socialImageUrl = getSocialImageUrl(pageId) || image
  const localizedSiteTitle = t.site.title
  const localizedSiteDescription = t.site.description
  const isGalleryRoute = router.asPath?.startsWith('/gallery')

  if (pageId === config.rootNotionPageId) {
    title = localizedSiteTitle
    description = localizedSiteDescription
  } else if (pageId === config.pageUrlOverrides.about) {
    title = `${t.meta.aboutTitle} | ${localizedSiteTitle}`
    description = t.meta.aboutDescription
  } else if (pageId === config.pageUrlOverrides.archive) {
    const routeTitle = isGalleryRoute ? t.meta.galleryTitle : t.meta.archiveTitle
    const routeDescription = isGalleryRoute
      ? t.meta.galleryDescription
      : t.meta.archiveDescription

    title = `${routeTitle} | ${localizedSiteTitle}`
    description = routeDescription
  } else if (pageId === config.pageUrlOverrides.recents) {
    title = `${t.meta.recentsTitle} | ${localizedSiteTitle}`
    description = t.meta.recentsDescription
  } else {
    if (title === config.name) {
      title = localizedSiteTitle
    }

    if (description === config.description) {
      description = localizedSiteDescription
    }
  }

  return (
    <Head>
      <meta charSet='utf-8' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover'
      />

      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='black' />

      <meta
        name='theme-color'
        media='(prefers-color-scheme: light)'
        content='#fefffe'
        key='theme-color-light'
      />
      <meta
        name='theme-color'
        media='(prefers-color-scheme: dark)'
        content='#2d3439'
        key='theme-color-dark'
      />

      <meta name='robots' content='index,follow' />
      <meta property='og:type' content='website' />

      {site && (
        <>
          <meta property='og:site_name' content={site.name} />
          <meta property='twitter:domain' content={site.domain} />
        </>
      )}

      {config.twitter && (
        <meta name='twitter:creator' content={`@${config.twitter}`} />
      )}

      {description && (
        <>
          <meta name='description' content={description} />
          <meta property='og:description' content={description} />
          <meta name='twitter:description' content={description} />
        </>
      )}

      {socialImageUrl ? (
        <>
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:image' content={socialImageUrl} />
          <meta property='og:image' content={socialImageUrl} />
        </>
      ) : (
        <meta name='twitter:card' content='summary' />
      )}

      {url && (
        <>
          <link rel='canonical' href={url} />
          <meta property='og:url' content={url} />
          <meta property='twitter:url' content={url} />
        </>
      )}

      <link
        rel='alternate'
        type='application/rss+xml'
        href={rssFeedUrl}
        title={site?.name}
      />

      <meta property='og:title' content={title} />
      <meta name='twitter:title' content={title} />
      <title>{title}</title>

      {/* Better SEO for the blog posts */}
      {isBlogPost && (
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': url ? `${url}#BlogPosting` : undefined,
            mainEntityOfPage: url,
            url,
            headline: title,
            name: title,
            description,
            author: {
              '@type': 'Person',
              name: config.author
            },
            image: socialImageUrl
          })}
        </script>
      )}
    </Head>
  )
}
