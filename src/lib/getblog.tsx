// /lib/getrides.tsx
import { client } from "@/lib/api"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"

export async function fetchBlog() {

    const params = new DrupalJsonApiParams()
        .addFields("node--blog", ['title', 'body', 'field_tags','created'])
        .addSort("created", "DESC")
        .addInclude('field_tags')
        
 	 const nodes = await client.getResourceCollection("node--blog", {params: params.getQueryObject() })
	 return nodes
}


export async function fetchTags() {
  const data = await client.getResourceCollection("taxonomy_term--tags")
  return data
}
