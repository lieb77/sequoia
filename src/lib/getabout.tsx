// /lib/geabout.tsx
import { client } from "@/lib/api"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"


/**
 * Get my About page
 *
 */
export async function fetchAboutPage()  {

	const params = new DrupalJsonApiParams()
		.addFields("node--page", ['body'])
	
	
	const id = "23a747ad-17cf-4f39-8f45-58911312ee8e"
  	const node = await client.getResource("node--page", id , {params: params.getQueryObject() })

  	return(node)
}

