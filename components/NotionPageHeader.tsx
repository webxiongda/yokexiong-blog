import type * as types from 'notion-types'
import cs from 'classnames'
import * as React from 'react'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'
import { useI18n } from '@/lib/i18n'
import { MoonIcon } from '@/lib/icons/moon'
import { SunIcon } from '@/lib/icons/sun'
import { useDarkMode } from '@/lib/use-dark-mode'

import { LanguageToggle } from './LanguageToggle'
import styles from './styles.module.css'

function ToggleThemeButton() {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const { t } = useI18n()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
      title={t.ui.themeToggle}
    >
      {hasMounted && isDarkMode ? <MoonIcon /> : <SunIcon />}
    </div>
  )
}

export function NotionPageHeader({
  block
}: {
  block: types.CollectionViewPageBlock | types.PageBlock
}) {
  const { components, mapPageUrl } = useNotionContext()
  const { t } = useI18n()

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <header className='notion-header custom-header'>
      <div className='notion-nav-header'>
        <div className={styles.navTopRow}>
          <Breadcrumbs block={block} rootOnly={true} />

          <div className={styles.navUtilities}>
            <LanguageToggle compact />

            <ToggleThemeButton />

            {isSearchEnabled && <Search block={block} title={null} />}
          </div>
        </div>

        <div
          className={cs('notion-nav-header-rhs', 'breadcrumbs', styles.navLinksRow)}
        >
          {navigationLinks
            ?.map((link, index) => {
              if (!link?.pageId && !link?.url) {
                return null
              }

              if (link.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {t.nav[link.title as keyof typeof t.nav] || link.title}
                  </components.PageLink>
                )
              } else {
                return (
                  <components.Link
                    href={link.url}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {t.nav[link.title as keyof typeof t.nav] || link.title}
                  </components.Link>
                )
              }
            })
            .filter(Boolean)}
        </div>
      </div>
    </header>
  )
}
