// /lib/geabout.tsx
import { client } from "@/lib/api/drupalClient"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { DrupalNode } from "next-drupal"
import { fixUrls } from "@/lib/utils"

/**
 * Get my About page
 *
 */
export async function getBikePage()  {

	const params = new DrupalJsonApiParams()
		.addFields("node--page", ['body'])


	const id = "1032985a-4b81-41a0-9084-cdd69dad3eae"
  	const node = await client.getResource<DrupalNode>("node--page", id , {params: params.getQueryObject() })

	const html = fixUrls(node.body.processed)


  	return(html)
}

