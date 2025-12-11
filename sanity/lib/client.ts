import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'nwnpryai',
  dataset: 'production',
  apiVersion: '2024-10-10',
  useCdn: true,
})

// ✅ Add this
const builder = imageUrlBuilder(client)
 // ✅ Changed to any[] for Portable Text
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}