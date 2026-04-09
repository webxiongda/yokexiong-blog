import Link from 'next/link'

import * as config from '@/lib/config'
import { useI18n } from '@/lib/i18n'
import { GitHubIcon } from '@/lib/icons/github'
import { LinkedInIcon } from '@/lib/icons/linkedin'
import { TwitterIcon } from '@/lib/icons/twitter'

import styles from './styles.module.css'

const featuredLinks = [
  {
    key: 'gallery',
    href: '/gallery?v=463b3e66e79f826782b008305d6ea0f8'
  },
  {
    key: 'archive',
    href: '/archive'
  },
  {
    key: 'recents',
    href: '/recents'
  },
  {
    key: 'about',
    href: '/about'
  }
]

const socialLinks = [
  config.twitter
    ? {
        href: `https://x.com/${config.twitter}`,
        label: 'X',
        icon: <TwitterIcon />
      }
    : null,
  config.github
    ? {
        href: `https://github.com/${config.github}`,
        label: 'GitHub',
        icon: <GitHubIcon />
      }
    : null,
  config.linkedin
    ? {
        href: `https://www.linkedin.com/in/${config.linkedin}`,
        label: 'LinkedIn',
        icon: <LinkedInIcon />
      }
    : null
].filter(Boolean)

export function HomeLinks() {
  const { t } = useI18n()

  return (
    <section className={styles.homeLinks}>
      <div className={styles.homeLinksInner}>
        <div className={styles.homeLinksIntro}>
          <div className={styles.homeLinksHeading}>
            <p className={styles.homeLinksEyebrow}>{t.home.eyebrow}</p>
            <h2 className={styles.homeLinksTitle}>{t.home.title}</h2>
            <p className={styles.homeLinksDescription}>{t.home.description}</p>
          </div>
        </div>

        <div className={styles.homeLinksGrid}>
          {featuredLinks.map((link) => (
            <Link href={link.href} key={link.key} className={styles.homeLinkCard}>
              <span className={styles.homeLinkEyebrow}>
                {t.home.featured[link.key as keyof typeof t.home.featured].eyebrow}
              </span>
              <h3 className={styles.homeLinkTitle}>
                {t.home.featured[link.key as keyof typeof t.home.featured].title}
              </h3>
              <p className={styles.homeLinkDescription}>
                {t.home.featured[link.key as keyof typeof t.home.featured].description}
              </p>
            </Link>
          ))}
        </div>

        {!!socialLinks.length && (
          <div className={styles.homeSocialStrip}>
            <span className={styles.homeSocialLabel}>{t.home.social}</span>
            <div className={styles.homeSocialLinks}>
              {socialLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.label}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.homeSocialLink}
                >
                  <span className={styles.homeSocialIcon}>{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
