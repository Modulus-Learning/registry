export const i18nConfig = {
  locales: ['en', 'es'],
  defaultLocale: 'en',
  cookieName: 'lng',
} as const

export type Locale = (typeof i18nConfig)['locales'][number]
