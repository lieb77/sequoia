// /lib/getrides.tsx
import { client } from "@/lib/api"
import type { JsonBike  } from "./bikes"
import type { JsonService } from "./service"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { DrupalNode } from "next-drupal"


/*
 * fetchBikes
 *
 * Returns all bikes
 *
 */
export async function fetchBikes(): Promise<JsonBike[]> {

 	const params = new DrupalJsonApiParams()
 		.addFields("node--bicycle", ['title','body','field_make', 'field_model','field_purchased_from','field_year', 'field_bicycle_picture'])
    	.addFilter("field_bike_activre", 1)
    	.addInclude(['field_bicycle_picture.field_media_image'])

	const nodes = await client.getResourceCollection<DrupalNode[]>("node--bicycle", {params: params.getQueryObject() })
	return nodes

}

/*
 * fetchBikes
 *
 * Returns one bike by name
 *
 */
 export async function fetchBike(bike: string): Promise<JsonBike> {

  	const params = new DrupalJsonApiParams()
 		.addFields("node--bicycle", ['title','body','field_make', 'field_model','field_purchased_from','field_year', 'field_bicycle_picture'])
    	.addFilter("title", bike)
    	.addInclude(['field_bicycle_picture.field_media_image'])

  	const nodes = await client.getResourceCollection<DrupalNode[]>(
    	"node--bicycle",
    	{params: params.getQueryObject() }
  	)
  	return nodes[0]

}


/*
 * fetch Service Log
 *
 */
export async function fetchServiceLog(bike: string): Promise<JsonService> {

	const params = new DrupalJsonApiParams()
 		.addFields("node--service", ['title', 'body', 'field_bike', 'field_milage1', 'field_date1'])
 		.addSort('created', 'DESC')
		.addInclude('field_bike')
		.addFilter('field_bike.title', bike)


  	const nodes = await client.getResourceCollection<DrupalNode[]>("node--service", {params: params.getQueryObject() })
	return nodes
}
