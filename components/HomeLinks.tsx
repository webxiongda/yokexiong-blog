import Link from 'next/link'

import * as config from '@/lib/config'
import { GitHubIcon } from '@/lib/icons/github'
import { LinkedInIcon } from '@/lib/icons/linkedin'
import { TwitterIcon } from '@/lib/icons/twitter'

import styles from './styles.module.css'

const featuredLinks = [
  {
    href: '/gallery?v=463b3e66e79f826782b008305d6ea0f8',
    eyebrow: 'Visual Browse',
    title: 'Gallery',
    description: '用卡片视图浏览文章、旅行记录和推荐内容。'
  },
  {
    href: '/archive',
    eyebrow: 'All Posts',
    title: 'Archive',
    description: '查看完整归档，按时间线把所有内容一次看全。'
  },
  {
    href: '/recents',
    eyebrow: 'Latest Picks',
    title: 'Recents',
    description: '快速进入最近更新，适合第一次访问时直接开始读。'
  },
  {
    href: '/about',
    eyebrow: 'Profile',
    title: 'About',
    description: '了解我是谁、在做什么，以及这个博客会写什么。'
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
  return (
    <section className={styles.homeLinks}>
      <div className={styles.homeLinksInner}>
        <div className={styles.homeLinksIntro}>
          <div className={styles.homeLinksHeading}>
            <p className={styles.homeLinksEyebrow}>Start Here</p>
            <h2 className={styles.homeLinksTitle}>从这四个入口开始浏览</h2>
            <p className={styles.homeLinksDescription}>
              首页保留 Notion 原始内容，同时把最常用的浏览路径单独拎出来，第一次访问不会迷路。
            </p>
          </div>
        </div>

        <div className={styles.homeLinksGrid}>
          {featuredLinks.map((link) => (
            <Link href={link.href} key={link.title} className={styles.homeLinkCard}>
              <span className={styles.homeLinkEyebrow}>{link.eyebrow}</span>
              <h3 className={styles.homeLinkTitle}>{link.title}</h3>
              <p className={styles.homeLinkDescription}>{link.description}</p>
            </Link>
          ))}
        </div>

        {!!socialLinks.length && (
          <div className={styles.homeSocialStrip}>
            <span className={styles.homeSocialLabel}>Elsewhere</span>
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
