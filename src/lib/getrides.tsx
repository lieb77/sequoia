// /lib/getrides.tsx
import { client } from "@/lib/api"
import type { Ride } from "@/class/Ride"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"



export async function fetchRidesByYear(year): Promise<Ride[]> {

	const params = new DrupalJsonApiParams()
 		.addFields("node--ride", ['title','body','field_miles', 'field_ridedate', 'field_buddies', 'field_bike'])
    	.addFilter("field_ridedate",year, 'STARTS_WITH' )
    	.addInclude(['field_bike'])
    	
	// Get first 50
	const nodes = await client.getResourceCollection("node--ride", {params: params.getQueryObject() })
  
	return nodes
}

/*
 
	// Array to accumulate all the data
	const allRides: Ride[] = []

	// Save the first batch of 50
	nodes.forEach(ride => allRides.push(ride))

	// Get the links for the next batch of 50
	let links = response.links

  while (links.next) {
    try {
      const res2 = await fetch(links.next.href);

      if (!res2.ok) {
        throw new Error(`HTTP error! status: ${res2.status}`);
      }

      const json: ApiResponse = await res2.json();

      if (json.data) {
        json.data.forEach((ride) => {
          allRides.push(ride);
        });
      }

      if (json.links) {
        links = json.links;
      } else {
        break;
      }
    } catch (error) {
      console.error('Error fetching rides:', error);
      break; // Stop fetching on error
    }
  }

  return allRides;
}

*/

export async function fetchAllRides(): Promise<Ride[]> {

	const params = new DrupalJsonApiParams()
 		.addFields("node--ride", ['title','body','field_miles', 'field_ridedate', 'field_buddies', 'field_bike'])
    	.addSort('created', 'DESC')
    	.addInclude(['field_bike'])

  	
  	const nodes = await client.getResourceCollection("node--ride", {params: params.getQueryObject() })
  
	return nodes
}
/*
	// Array to ccumulate all the data
	const allRides: Ride[] = []

	// Save the first batch of 50
	response.data.forEach(ride => allRides.push(ride))

	// Get the links for the next batch of 50
	let links = response.links

  while (links.next) {
    try {
      const res2 = await fetch(links.next.href);

      if (!res2.ok) {
        throw new Error(`HTTP error! status: ${res2.status}`);
      }

      const json: ApiResponse = await res2.json();

      if (json.data) {
        json.data.forEach((ride) => {
          allRides.push(ride);
        });
      }

      if (json.links) {
        links = json.links;
      } else {
        break;
      }
    } catch (error) {
      console.error('Error fetching rides:', error);
      break; // Stop fetching on error
    }
  }

  return allRides;
}
*/

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

