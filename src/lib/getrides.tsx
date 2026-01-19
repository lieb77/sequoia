// /lib/getrides.tsx
import { client } from "@/lib/api"
import type { Ride } from "@/class/Ride"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"




/**
 * fetchRidesByTour
 *
 */
export async function fetchRidesByTour(id: string) : RideData[] {

	const params = new DrupalJsonApiParams()
 		.addFields("node--ride", ['title','body','field_miles', 'field_ridedate', 'field_buddies', 'field_bike'])
    	.addFilter("field_tour.id", id )
    	.addInclude(['field_tour'])
    	
	const nodes = await client.getResourceCollection("node--ride", {params: params.getQueryObject() })
    return(nodes)
}

