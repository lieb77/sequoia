// /lib/getrides.tsx
import { client } from "@/lib/api"
import type { Ride } from "@/class/Ride"


export async function fetchRidesByYear(year): Promise<Ride[]> {

  // Get first 50
  const response = await client.getCollection("node--ride", {
  queryString: "sort=-created&include=field_bike" +
	"&filter[datefilter][condition][path]=field_ridedate" +
	"&filter[datefilter][condition][operator]=STARTS_WITH" +
	"&filter[datefilter][condition][value]=" + year
})

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

export async function fetchAllRides(): Promise<Ride[]> {

  // Get first 50
  const response = await client.getCollection("node--ride", {
  queryString: "sort=-created&include=field_bike"})

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


/**
 * fetchRides
 *
 */
export async function fetchRidesByTour(id: string) : RideData[] {

  const response = await client.getCollection("node--ride", {
    queryString: "sort=created&include=field_tour" +
      "&filter[condition][path]=field_tour.id" +
      "&filter[condition][operator]=%3D" +
      "&filter[condition][value]=" + id
  })

  return(response.data)
}

