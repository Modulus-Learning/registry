import { createMiddleware, json } from '@tanstack/react-start'
import { createServerFileRoute, getRequestHeaders } from '@tanstack/react-start/server'

import type { Registrant } from '~/utils/registrants'

const registryLoggerMiddleware = createMiddleware({ type: 'request' }).server(
  async ({ next, request }) => {
    console.info('In: /registry')
    console.info('Request Headers:', getRequestHeaders())
    const result = await next()
    result.response.headers.set('x-registry', 'true')
    console.info('Out: /registry')
    return result
  },
)

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/Modulus-Learning/registry-data/refs/heads/main/db.json';

export const ServerRoute = createServerFileRoute('/api/registry')
  .middleware([registryLoggerMiddleware])
  .methods({
    GET: async ({ request }) => {
      console.info('GET /api/registry @', request.url)
      console.info('Fetching registry... @', request.url)
      const res = await fetch(GITHUB_RAW_URL)
      if (!res.ok) {
        throw new Error('Failed to fetch registry data')
      }

      const data = (await res.json()) as { installations: Registrant[] }

      return json(data)
    },
  })
