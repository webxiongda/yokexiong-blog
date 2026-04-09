import * as React from 'react'

export type Locale = 'zh' | 'en'

const LOCALE_STORAGE_KEY = 'yokexiong-blog-locale'

const translations = {
  zh: {
    site: {
      title: 'Yoke Xiong 的小站',
      description:
        '写旅行、推荐、生活记录，也慢慢存下一些值得反复回看的内容。'
    },
    nav: {
      About: '关于我',
      Gallery: '画廊',
      Archive: '归档',
      Recents: '最近'
    },
    home: {
      eyebrow: 'Welcome',
      title: '第一次来，可以先随便逛逛',
      description:
        '这里写旅行、推荐、一些生活里的小记录，也会慢慢放进更多想长期保存的内容。你可以按自己的节奏挑一个入口进去看。',
      social: '也可以在这些地方找到我',
      featured: {
        gallery: {
          eyebrow: '翻着看',
          title: '画廊',
          description:
            '如果你想轻松一点，就从这里开始。像翻相册一样看看最近写下的内容。'
        },
        archive: {
          eyebrow: '慢慢读',
          title: '归档',
          description:
            '这里是完整归档，适合按时间线慢慢翻，也适合专门找某一篇旧文章。'
        },
        recents: {
          eyebrow: '先看新的',
          title: '最近',
          description:
            '最近更新都会先落在这里。如果你只是路过，先看这个会比较快进入状态。'
        },
        about: {
          eyebrow: '认识一下',
          title: '关于我',
          description:
            '想知道我是谁、平时在关注什么，或者这个博客为什么会存在，可以从这里开始。'
        }
      },
      recentsEyebrow: 'Latest Notes',
      recentsTitle: '最近写了这些',
      recentsLink: '去看更多'
    },
    ui: {
      themeToggle: '切换深色模式'
    },
    meta: {
      aboutTitle: '关于我',
      aboutDescription: '关于 Yoke Xiong、正在做的事，以及这个博客想慢慢写下来的内容。',
      archiveTitle: '归档',
      archiveDescription: '按时间线整理过往文章、旅行记录和推荐内容。',
      recentsTitle: '最近',
      recentsDescription: '最近更新的文章和记录，适合第一次进入时快速浏览。',
      galleryTitle: '画廊',
      galleryDescription: '用更轻盈的卡片视图浏览最近写下的内容。'
    }
  },
  en: {
    site: {
      title: 'Yoke Xiong',
      description:
        'A personal space for travel notes, recommendations, small life updates, and ideas worth keeping.'
    },
    nav: {
      About: 'About',
      Gallery: 'Gallery',
      Archive: 'Archive',
      Recents: 'Recents'
    },
    home: {
      eyebrow: 'Welcome',
      title: 'If this is your first visit, start anywhere you like',
      description:
        'This is where I keep travel notes, recommendations, everyday fragments, and things I want to revisit over time. Pick any entry point and follow your curiosity.',
      social: 'You can also find me here',
      featured: {
        gallery: {
          eyebrow: 'Browse visually',
          title: 'Gallery',
          description:
            'Start here if you want something lighter. It feels a bit like flipping through a visual notebook.'
        },
        archive: {
          eyebrow: 'Read slowly',
          title: 'Archive',
          description:
            'The full archive lives here, useful for browsing the timeline or digging up an older post.'
        },
        recents: {
          eyebrow: 'Start with new',
          title: 'Recents',
          description:
            'This is where the newest updates land first. If you are just passing by, it is the quickest way in.'
        },
        about: {
          eyebrow: 'Say hello',
          title: 'About',
          description:
            'A short introduction to who I am, what I care about, and why this blog exists in the first place.'
        }
      },
      recentsEyebrow: 'Latest Notes',
      recentsTitle: 'Recently added',
      recentsLink: 'See more'
    },
    ui: {
      themeToggle: 'Toggle dark mode'
    },
    meta: {
      aboutTitle: 'About',
      aboutDescription:
        'Who Yoke Xiong is, what he is working on, and the kind of writing this blog keeps over time.',
      archiveTitle: 'Archive',
      archiveDescription:
        'A timeline of posts, travel notes, and recommendations collected in one place.',
      recentsTitle: 'Recents',
      recentsDescription:
        'The most recent updates and notes, ideal for a quick first look.',
      galleryTitle: 'Gallery',
      galleryDescription:
        'A lighter, more visual way to browse recent writing and notes.'
    }
  }
} as const

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (typeof translations)[Locale]
}

const I18nContext = React.createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>('zh')

  React.useEffect(() => {
    const savedLocale = window.localStorage.getItem(
      LOCALE_STORAGE_KEY
    ) as Locale | null

    if (savedLocale === 'zh' || savedLocale === 'en') {
      setLocaleState(savedLocale)
      return
    }

    const browserLocale = window.navigator.language.toLowerCase()
    setLocaleState(browserLocale.startsWith('zh') ? 'zh' : 'en')
  }, [])

  React.useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  }, [locale])

  const setLocale = React.useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
  }, [])

  const value = React.useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale]
    }),
    [locale, setLocale]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = React.useContext(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }

  return context
}
