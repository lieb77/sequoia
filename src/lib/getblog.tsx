// /lib/getrides.tsx
import { client } from "@/lib/api"

export async function fetchBlog() {

  // Get first 50
  const response = await client.getCollection("node--blog", {
  queryString: "sort=-created&include=field_tags"})

	return response.data
}


export async function fetchTags() {
  const response = await client.getCollection("taxonomy_term--tags")
  return response.data
}
