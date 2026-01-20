// /lib/gettours.tsx
import { client } from "@/lib/api"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"


/**
 * fetchTourIndex
 *
 * Get the ID, date and name for all tours
 *
 */
export async function fetchTourIndex() {

	const params = new DrupalJsonApiParams()
		.addFields("node--tour", ['title','body', 'field_mileage', 'field_start_date', 'field_number_of_days', 'field_short_description'  ])
		.addSort('field_start_date', 'DESC')
	


  	const nodes = await client.getResourceCollection("node--tour", {params: params.getQueryObject() })

	return(nodes)
}


/**
 * fetchTour
 *
 * Get all the data for a sing;e tour, including rides and photos
 *
 */
export async function fetchTour(id: string) {

	const params = new DrupalJsonApiParams()
		.addFields("node--tour", ['title','body', 'field_start_date', 'field_mileage', 'field_number_of_days', 'field_short_description', 'field_overview_map'  ])
		.addInclude('field_overview_map.field_media_image')
		
	const node = await client.getResource("node--tour", id, {params: params.getQueryObject() })

  	return(node)
}



/**
 * fetchRidesByTour
 *
 */
export async function fetchRidesByTour(id: string) {

	const params = new DrupalJsonApiParams()
 		.addFields("node--ride", ['title','body','field_miles', 'field_ridedate', 'field_buddies', 'field_bike'])
    	.addFilter("field_tour.id", id )
    	.addInclude(['field_tour'])
    	
	const nodes = await client.getResourceCollection("node--ride", {params: params.getQueryObject() })
    return(nodes)
}


/**
 * fetchPhotos
 *
 */
export async function fetchPhotosForTour(id: string) {

        const params = new DrupalJsonApiParams()
                .addFields('media--image', ['name','field_media_image', 'field_tour' ])
                .addSort('created')
                .addFilter('field_tour.id', id)
                .addInclude('field_media_image')


  const entities = await client.getResourceCollection("media--image", {params: params.getQueryObject() })

  return(entities)
}
