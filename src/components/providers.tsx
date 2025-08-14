'use client'

import type { ReactNode } from 'react'
import { TranslationsProvider } from '~/i18n/client/translation-provider'
import { ThemeProvider } from '~/ui/theme/theme-provider/provider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TranslationsProvider defaultLocale="en">
      <ThemeProvider>{children}</ThemeProvider>
    </TranslationsProvider>
  )
}
