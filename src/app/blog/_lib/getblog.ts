// /lib/getblog.tsx
import { client } from "@/lib/api/drupalClient"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { fixUrls, formatDate, date2MonthYear } from "@/lib/utils"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"

export async function fetchBlogByTag(tag: string) {

    const params = new DrupalJsonApiParams()
        .addFields("node--blog", ['title', 'body', 'field_tags','created','path'])
        .addSort("created", "DESC")
        .addInclude('field_tags')
        .addPageLimit('5')
       
    if (tag && tag !== 'All') 
		params.addFilter('field_tags.name', tag)

     const response = await client.getResourceCollection<DrupalNode>("node--blog", {
     	params: params.getQueryObject(),
  		deserialize: false,
	})

	// Get the data
	const links = response.links
 	const nodes = client.deserialize(response)
 	const posts = processNodes(nodes)
 	return ({posts, links})
}

export async function fetchBlogByYear(year: string) {

	// Create unix timestamps for the created query
	const startOfYear = Math.floor(new Date(`${year}-01-01T00:00:00Z`).getTime() / 1000)
	const endOfYear = Math.floor(new Date(`${year}-12-31T23:59:59Z`).getTime() / 1000)
	
	
    const params = new DrupalJsonApiParams()
        .addFields("node--blog", ['title', 'body', 'field_tags','created', 'path'])
        .addSort("created", "DESC")
        .addInclude('field_tags')
        .addPageLimit('5')
		.addFilter("created", startOfYear.toString(), ">=")
		.addFilter("created", endOfYear.toString(), "<=")
		.getQueryObject()

     const response = await client.getResourceCollection<DrupalNode>("node--blog", {
     	params: params,
  		deserialize: false,
	})

		// Get the data
	const links = response.links
 	const nodes = client.deserialize(response)
 	const posts = processNodes(nodes)
 	return ({posts, links})
}

export async function fetchBlogById(id : string) {

	 const params = new DrupalJsonApiParams()
        .addFields("node--blog", ['title', 'body', 'field_tags','created','path'])
        .addSort("created", "DESC")
        .addInclude('field_tags')
    	.addFilter('id', id)
		.getQueryObject()
		
	const response = await client.getResourceCollection<DrupalNode>("node--blog", {
     	params: params,
  		deserialize: false,
	})

		// Get the data
	const links = response.links
 	const nodes = client.deserialize(response)
 	const posts = processNodes(nodes)
 	return ({posts, links})
}
		
		
		
function processNodes(nodes){
 	// Extract and process the data
 	const posts  = []
    nodes.forEach((post) =>
      	posts.push({
			id: post.id,
			title: post.title,
			date: formatDate(post.created),
			dmy: date2MonthYear(post.created),
			url: "https://paulleiberman.org/blog",
			body: fixUrls(post.body.processed),
			tags: post.field_tags.map((tag: any) => ({ name: tag.name, id: tag.id })),
			path: post.path.alias
      })
    )

 	// return the data
 	return(posts)
}



export async function fetchTags() {
	const data = await client.getResourceCollection<DrupalTaxonomyTerm[]>("taxonomy_term--tags")
	const tags = [{value: 'All', label: 'All'}]

	data.forEach((tag) =>
	tags.push({
  		value: tag.name,
  		label: tag.name,
  		})
  	)
 	return tags
}