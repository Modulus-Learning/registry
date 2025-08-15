/// <reference types="vite/client" />
import { createRootRoute, HeadContent, ScriptOnce, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type * as React from 'react'
import { DefaultCatchBoundary } from '~/components/default-catch-boundary'
import { NotFound } from '~/components/not-found'
import { Providers } from '~/components/providers'
import { seo } from '~/utils/seo'
import appCss from '../ui/styles/global.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'Modulus Registry',
        description:
          'Modulus Learning registry that is used to announce all known Modulus installations.',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <ScriptOnce>
          {`
          (() => {
            const classList = document.documentElement.classList;
            const style = document.documentElement.style;
            const theme = localStorage.theme
            // This site defaults to dark mode, but respects user preference if set.
            // const dark = window.matchMedia("(prefers-color-scheme: dark)");
            if (localStorage.theme == null) {
              localStorage.setItem("theme", "dark");
              classList.add("dark");
              style.colorScheme = "dark";
            } else {
              if (theme === "dark") {
                classList.remove("light");
                classList.add("dark");
                style.colorScheme = "dark";
              } else if (theme === "light") {
                classList.remove("dark");
                classList.add("light");
                style.colorScheme = "light";
              }
            }
          })();
        `}
        </ScriptOnce>
      </head>
      <body className="bg-canvas-50 dark:bg-canvas-900">
        <Providers>
          {children}
          <TanStackRouterDevtools position="bottom-right" />
        </Providers>
        <Scripts />
      </body>
    </html>
  )
}
