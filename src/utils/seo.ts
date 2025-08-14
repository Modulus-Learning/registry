export const seo = ({
  title,
  description,
  keywords,
  image,
}: {
  title: string
  description?: string
  image?: string
  keywords?: string
}) => {
  const tags = [
    { title },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'color-scheme', content: "dark light" },
    { name: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    ...(image
      ? [
        { name: 'twitter:image', content: image },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'og:image', content: image },
      ]
      : []),
  ]

  return tags
}
