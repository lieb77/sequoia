// /lib/getrides.tsx
import { client } from "@/lib/api"

/**
 * fetchPhotos
 *
 */
export async function fetchPhotosForTour(id: string) {
  const response = await client.getCollection("media--image", {
    queryString: "sort=created&include=field_media_image" +
      "&filter[condition][path]=field_tour.id" +
      "&filter[condition][operator]=%3D" +
      "&filter[condition][value]=" + id
  })

  return(response.data)
}

export async function fetchPhotosByTag(tag: string)  {
  const response = await client.getCollection("media--image", {
    queryString: "sort=created&include=field_media_image,field_category" +
      "&filter[condition][path]=field_category.name" +
      "&filter[condition][operator]=%3D" +
      "&filter[condition][value]=" + tag
  })

  return(response.data)
}

export async function fetchPhotosByEvent(event: string)  {
  const response = await client.getCollection("media--image", {
    queryString: "sort=created&include=field_media_image,field_event" +
      "&filter[condition][path]=field_event.name" +
      "&filter[condition][operator]=%3D" +
      "&filter[condition][value]=" + event
  })

  return(response.data)
}


export async function fetchFamilyEvents() {
  const response = await client.getCollection("taxonomy_term--event")

  return(response.data)

}
