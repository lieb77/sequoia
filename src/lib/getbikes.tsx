// /lib/getrides.tsx
import { client } from "@/lib/api"
import type { JsonBike  } from "@/class/Bikes"
import type { JsonService } from "@/class/Service"

export const bikeNames = ['Grando', 'Ravn', 'Soma Saga']

/*
 * fetchBikes
 *
 * Returns all bikes
 *
 */
export async function fetchBikes(): Promise<JsonBike[]> {

 const response = await client.getCollection("node--bicycle", {
  queryString: "include=field_bicycle_picture.thumbnail&sort=-field_year",
})

  return(response.data)
}

/*
 * fetchBikes
 *
 * Returns one bike by name
 *
 */
export async function fetchBike(bike: string): Promise<JsonBike> {
  const response = await client.getCollection("node--bicycle", {
    queryString: "include=field_bicycle_picture.thumbnail" +
      "&filter[condition][path]=title" +
      "&filter[condition][operator]=%3D" +
      "&filter[condition][value]=" + bike
  })

  return(response.data)
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
