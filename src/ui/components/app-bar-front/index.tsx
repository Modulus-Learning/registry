'use client'

import { useRouterState } from '@tanstack/react-router'
import cx from 'classnames'
import { forwardRef, useEffect, useState } from 'react'
// import { useTranslations } from '~/i18n/client/translation-provider'
// import { LanguageMenu } from '~/i18n/components/language-menu'
import type { Locale } from '~/i18n/i18n-config'
// import { ProgressBar } from '@/context/progress-bar-provider'
import { useTranslations } from '~/i18n/server'
import { ThemeSwitch } from '~/ui/theme/theme-provider/switch'
import { Branding } from './branding'

interface AppBarProps {
  className?: string
  lng: Locale
}
export type Ref = HTMLDivElement

export const AppBarFront = forwardRef<Ref, AppBarProps>(function AppBar(
  { className, lng, ...other },
  ref
) {
  const t = useTranslations('en', 'auth')
  const location = useRouterState({ select: (s) => s.location })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  const handleToggleMobileMenu = (event: React.MouseEvent<HTMLButtonElement> | null): void => {
    if (event != null) event.stopPropagation()
    // e.preventDefault()
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleMobileMenuClose = (): void => {
    setMobileMenuOpen(false)
  }

  const handleWindowClick = (): void => {
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    window.addEventListener('click', handleWindowClick)
    return () => {
      window.removeEventListener('click', handleWindowClick)
    }
  })

  const handleScroll = (): void => {
    // TODO - refine for correct locale detection
    // For now home / and anything with a two character path / locale will
    // work.
    if (location.pathname.length <= 3) {
      const position = window.scrollY
      if (position > 100) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const appBarBackground =
    hasScrolled || location.pathname.length > 3 ? 'bg-white dark:bg-primary-900' : 'bg-transparent'

  const appBarTextColor =
    hasScrolled || location.pathname.length > 3
      ? 'text-black fill-black dark:text-white dark:fill-white'
      : 'text-black fill-black dark:text-white dark:fill-white'

  const hamburgerColor =
    hasScrolled || location.pathname.length > 3
      ? 'bg-black before:bg-black after:bg-black dark:bg-white dark:before:bg-white dark:after:bg-white'
      : 'bg-white before:bg-white after:bg-white'

  const hamburgerColorMobileMenuOpen = 'bg-white before:bg-white after:bg-white'

  return (
    <header
      id="header"
      className={cx(
        'sticky top-0 z-30 w-full transition-colors duration-300',
        appBarBackground,
        className
      )}
      ref={ref}
      {...other}
    >
      {/* <ProgressBar className="fixed h-1 shadow-lg z-50 shadow-primary-600/20 bg-primary-900 dark:bg-white top-0" /> */}
      <div
        id="app-bar"
        className={cx(
          'app-bar sticky top-0 flex min-h-[60px] w-full items-center gap-2 pl-0 pr-[12px]',
          'sm:gap-2 sm:pl-0 sm:pr-[18px]',
          'transition-all duration-500 ease-out'
        )}
      >
        <div className="lg:flex-initial mr-auto">
          <Branding lng={lng} hasScrolled={hasScrolled} pathName={location.pathname} />
        </div>
        {/* <LanguageMenu lng={lng} color={appBarTextColor} /> */}
        <ThemeSwitch className="mr-3" />
        {/* {session != null ? <UserMenu lng={lng} /> : <SignIn lng={lng} />} */}
      </div>
    </header>
  )
})
