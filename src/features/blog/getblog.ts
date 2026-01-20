// /lib/getblog.tsx
import { client } from "@/lib/api"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { fixUrls, formatDate } from "@/lib/utils"

export async function fetchBlog() {

    const params = new DrupalJsonApiParams()
        .addFields("node--blog", ['title', 'body', 'field_tags','created'])
        .addSort("created", "DESC")
        .addInclude('field_tags')
        .addPageLimit('5')
        
     const response = await client.getResourceCollection("node--blog", {
     	params: params.getQueryObject(), 
  		deserialize: false, 
	})   
	
	// Get the data
	const links = response.links  
 	const nodes = client.deserialize(response)
 	
 	// Extract and process the data
 	const posts  = []
    nodes.forEach((post) =>
      	posts.push({
			id: post.id,
			title: post.title,
			date: formatDate(post.created),
			url: "https://paulleiberman.org/blog",
			body: fixUrls(post.body.processed),
			tags: post.field_tags[0].name,
      })
    )    
 	
 	// return the data
 	return({posts, links})
}


export async function fetchTags() {
  const data = await client.getResourceCollection("taxonomy_term--tags")
  return data
}
