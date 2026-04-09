import Link from 'next/link'
import { type ExtendedRecordMap } from 'notion-types'
import {
  defaultMapImageUrl,
  formatDate,
  getBlockTitle,
  getBlockValue,
  getPageProperty
} from 'notion-utils'

import { mapImageUrl } from '@/lib/map-image-url'
import { mapPageUrl } from '@/lib/map-page-url'
import { type Site } from '@/lib/types'

import styles from './styles.module.css'

function getRecentPageIds(recordMap: ExtendedRecordMap): string[] {
  const collectionId = Object.keys(recordMap.collection_query || {})[0]
  if (!collectionId) {
    return []
  }

  const views = (recordMap.collection_query as any)[collectionId]
  const viewId = Object.keys(views || {})[0]
  if (!viewId) {
    return []
  }

  return views[viewId]?.collection_group_results?.blockIds || []
}

function getCoverUrl(block: any): string | null {
  const pageCover = block?.format?.page_cover
  if (pageCover) {
    return mapImageUrl(pageCover, block) || null
  }

  const rawCoverProperty = block?.properties?.['WRu@']?.[0]
  const attachmentUrl = rawCoverProperty?.[1]?.[0]?.[1]
  if (attachmentUrl) {
    return defaultMapImageUrl(attachmentUrl, block) || null
  }

  return null
}

function formatMetaDate(value: unknown): string | null {
  if (typeof value === 'number' || typeof value === 'string') {
    return formatDate(value, { month: 'short' })
  }

  return null
}

function formatMetaTags(value: unknown): string | null {
  if (Array.isArray(value)) {
    return value.join(' · ')
  }

  if (typeof value === 'string') {
    return value
  }

  return null
}

export function HomeRecents({
  site,
  recordMap
}: {
  site: Site
  recordMap: ExtendedRecordMap
}) {
  const pageIds = getRecentPageIds(recordMap).slice(0, 2)
  const createPageUrl = mapPageUrl(site, recordMap, new URLSearchParams())

  if (!pageIds.length) {
    return null
  }

  return (
    <section className={styles.homeRecents}>
      <div className={styles.homeRecentsInner}>
        <div className={styles.homeRecentsHeading}>
          <p className={styles.homeRecentsEyebrow}>From Notion</p>
          <div className={styles.homeRecentsTitleRow}>
            <h2 className={styles.homeRecentsTitle}>最近更新</h2>
            <Link href='/recents' className={styles.homeRecentsLink}>
              查看全部
            </Link>
          </div>
        </div>

        <div className={styles.homeRecentsGrid}>
          {pageIds.map((pageId) => {
            const block = getBlockValue(recordMap.block[pageId])
            if (!block) {
              return null
            }

            const title = getBlockTitle(block, recordMap) || 'Untitled'
            const date = formatMetaDate(
              getPageProperty('Publishing Date', block, recordMap)
            )
            const tags = formatMetaTags(getPageProperty('Tags', block, recordMap))
            const coverUrl = getCoverUrl(block)

            return (
              <Link
                key={pageId}
                href={createPageUrl(pageId)}
                className={styles.homeRecentCard}
              >
                <div className={styles.homeRecentMedia}>
                  <div className={styles.homeRecentPlaceholder}>
                    {title.charAt(0)}
                  </div>

                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt={title}
                      className={styles.homeRecentImage}
                      loading='lazy'
                      onError={(event) => {
                        event.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : null}
                </div>

                <div className={styles.homeRecentContent}>
                  <div className={styles.homeRecentMeta}>
                    {date && <span>{date}</span>}
                    {tags && <span>{tags}</span>}
                  </div>
                  <h3 className={styles.homeRecentCardTitle}>{title}</h3>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
