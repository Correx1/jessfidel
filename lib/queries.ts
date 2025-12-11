import { groq } from "next-sanity";

export const worksQuery = groq`
*[_type == "work"] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  date,
  duration,
  excerpt,
  "thumbnail": thumbnail.asset->url,
  "category": category->title,
  "images": images[].asset->url,
  details,
  fullDescription
}
`;
