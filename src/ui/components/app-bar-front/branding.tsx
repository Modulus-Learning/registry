import cx from 'classnames'
// import Image from 'next/image'
import type React from 'react'
// import { LangLink } from '~/i18n/components/lang-link'
import type { Locale } from '~/i18n/i18n-config'
import logoBlack from '~/images/logo/modulus-logo-black.svg'
import logoWhite from '~/images/logo/modulus-logo-white.svg'
import { useTheme } from '~/ui/theme/theme-provider/provider'

export function Branding({
  lng,
  hasScrolled,
  pathName,
}: {
  lng: Locale
  hasScrolled: boolean
  pathName: string
}): React.JSX.Element {
  const { theme } = useTheme()
  const brandingBackground =
    hasScrolled || pathName.length > 3 ? 'bg-transparent' : 'bg-transparent'

  return (
    <div
      className={cx(
        'branding flex items-center pl-2 sm:pl-6 pr-2 sm:pr-12 transition-colors duration-300',
        brandingBackground
      )}
    >
      <div className="w-[150px] sm:w-[150px]">
        {theme === 'dark' ? (
          <img src={logoWhite} width={150} alt="Modulus" />
        ) : (
          <img src={logoBlack} width={150} alt="Modulus" />
        )}
      </div>
    </div>
  )
}
