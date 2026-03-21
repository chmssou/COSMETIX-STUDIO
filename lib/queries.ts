import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

const projectsQuery = groq`*[_type == "project"] | order(order asc) {
  _id,
  title,
  category,
  order,
  "videoSrc": videoSrc.asset->url,
  "btsVideo": btsVideo.asset->url,
  "thumbnail": thumbnail.asset->url,
  "images": images[].asset->url
}`

export async function getProjects() {
  return client.fetch(projectsQuery)
}

export { projectsQuery }

