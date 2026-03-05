import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'se9a0276', // Find this in sanity.config.ts
  dataset: 'production', // Or your dataset name
  apiVersion: '2024-03-05', // Use current date (YYYY-MM-DD) to query the latest API version
  useCdn: true, // `false` if you want to ensure fresh data
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => {
  return builder.image(source)
}
