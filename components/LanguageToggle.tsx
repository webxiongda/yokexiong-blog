import cs from 'classnames'

import { useI18n } from '@/lib/i18n'

import styles from './styles.module.css'

export function LanguageToggle({
  className,
  compact = false
}: {
  className?: string
  compact?: boolean
}) {
  const { locale, setLocale } = useI18n()

  return (
    <div
      className={cs(
        styles.languageToggle,
        compact && styles.languageToggleCompact,
        className
      )}
    >
      <button
        type='button'
        onClick={() => setLocale('zh')}
        className={cs(
          styles.languageToggleButton,
          locale === 'zh' && styles.languageToggleButtonActive
        )}
      >
        中
      </button>
      <button
        type='button'
        onClick={() => setLocale('en')}
        className={cs(
          styles.languageToggleButton,
          locale === 'en' && styles.languageToggleButtonActive
        )}
      >
        EN
      </button>
    </div>
  )
}
