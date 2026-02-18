// /lib/getblog.tsx
import { client } from "@/lib/api/drupalClient"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { fixUrls, formatDate, date2MonthYear } from "@/lib/utils"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"

export async function fetchBlog(tag: string) {

    const params = new DrupalJsonApiParams()
        .addFields("node--blog", ['title', 'body', 'field_tags','created'])
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
			tags: post.field_tags[0].name,
      })
    )

 	// return the data
 	return({posts, links})
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