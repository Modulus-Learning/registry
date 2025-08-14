// https://formatjs.io/docs/core-concepts/icu-syntax
import { IntlMessageFormat } from 'intl-messageformat'
import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import type { Translations } from '~/i18n/server/index'
import type { Locale } from '../i18n-config'

type TranslationsContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  translations: Translations | null
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined)

const translationLoaders: Record<Locale, () => Promise<Translations>> = {
  en: () => import('../translations/en.json').then((m) => m.default),
  es: () => import('../translations/es.json').then((m) => m.default),
}

export const TranslationsProvider = ({
  children,
  defaultLocale,
}: {
  children: React.ReactNode
  defaultLocale: Locale
}) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const [translations, setTranslations] = useState<Translations | null>(null)

  useEffect(() => {
    let isMounted = true
    translationLoaders[locale]().then((loaded) => {
      if (isMounted) setTranslations(loaded)
    })
    return () => {
      isMounted = false
    }
  }, [locale])

  return (
    <TranslationsContext.Provider value={{ locale, setLocale, translations }}>
      {children}
    </TranslationsContext.Provider>
  )
}

export const useTranslations = <T extends keyof Translations>(
  namespace: T
): {
  t: (key: keyof Translations[T], values?: Record<string, any>) => string
} => {
  const ctx = useContext(TranslationsContext)
  if (!ctx || !ctx.translations) {
    // Optionally, you could return a fallback t function here
    throw new Error('Translations not loaded or useTranslations used outside provider')
  }

  const { translations } = ctx

  // NOTE that source translations in this case are all translations
  // for a given language - hence const message = translations[namespace][key] ?? key
  // and unlike the server version of t - in ~/i18n/server/use-translations
  return {
    t: (key: keyof Translations[T], values?: Record<string, any>) => {
      const message = translations[namespace][key] ?? key

      if (typeof message === 'string') {
        const formatter = new IntlMessageFormat(message)
        return formatter.format(values)
      }

      return message
    },
  }
}
