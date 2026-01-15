// /lib/getrides.tsx
import { client } from "@/lib/api"
import type { JsonBike  } from "@/class/Bikes"
import type { JsonService } from "@/class/Service"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"

export const bikeNames = ['Grando', 'Ravn', 'Soma Saga']

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
    	    
	const nodes = await client.getResourceCollection("node--bicycle", {params: params.getQueryObject() })
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

  	const nodes = await client.getCollection<DrupalNode[]>(
    	"node--bicycle",
    	{params: params.getQueryObject() }
  )
  return nodes

}


/*
 * fetch Service Log
 *
 */
export async function fetchServiceLog(bike: string): Promise<JsonService> {
  const response = await client.getCollection("node--service", {
    queryString: "sort=-created&include=field_bike" +
      "&filter[condition][path]=field_bike.title" +
      "&filter[condition][operator]=%3D" +
      "&filter[condition][value]=" + bike
  })
  return(response.data)
}
