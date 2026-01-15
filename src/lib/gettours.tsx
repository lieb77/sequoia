// /lib/getrides.tsx
import { client } from "@/lib/api"

/**
 * fetchTourIndex
 *
 * Get the ID, date and name for all tours
 *
 */
export async function fetchTourIndex() {

  const response = await client.getCollection("node--tour", {
    queryString: "sort=-field_start_date" })

  return(response.data)
}


/**
 * fetchTour
 *
 * Get all the data for a sing;e tour, including rides and photos
 *
 */
export async function fetchTour(id: string) {

  const response = await client.getResource("node--tour", id, {
    queryString: "include=field_overview_map.field_media_image"
  })

  return(response.data)
}


