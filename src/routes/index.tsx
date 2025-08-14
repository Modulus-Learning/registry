import { Card, Container, Section } from '@infonomic/uikit/react'
import { createFileRoute } from '@tanstack/react-router'
import { AppBarFront } from '~/ui/components/app-bar-front'
import type { Registrant } from '~/utils/registrants'

const GITHUB_RAW_URL =
  'https://raw.githubusercontent.com/Modulus-Learning/registry-data/refs/heads/main/db.json'

export const Route = createFileRoute('/')({
  loader: async (): Promise<{ installations: Registrant[] }> => {
    const res = await fetch(GITHUB_RAW_URL)
    const data = await res.json()
    return data
  },
  staleTime: 60000, // Cache the loaded data for 60 seconds
  component: Home,
})

function Home() {
  const { installations } = Route.useLoaderData()
  return (
    <div className="layout-container flex min-h-screen flex-col">
      <AppBarFront lng="en" />
      <main id="main-content" className="flex flex-1 flex-col">
        <Section>
          <Container>
            <div className="p-2 prose">
              <h1 className="my-2">Modulus Installations</h1>
              <p>Loaded {installations.length} installations.</p>
            </div>
            <div className="grid grid-cols-auto-fit-320 gap-6">
              {installations.map((registrant) => (
                <Card key={registrant.id} hover={false}>
                  <Card.Header>
                    <Card.Title>{registrant['site-name']}</Card.Title>
                    <Card.Description>{registrant.organization}</Card.Description>
                  </Card.Header>
                  <Card.Content className="wrap-anywhere">
                    Visit:{' '}
                    <a
                      className="hover:underline"
                      href={registrant['site-url']}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {registrant['site-url']}
                    </a>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      </main>
    </div>
  )
}
