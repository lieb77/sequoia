// /lib/getrides.tsx
import { client } from "@/lib/api"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { DrupalTaxonomyTerm, DrupalMedia } from "next-drupal"

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


  const entities = await client.getResourceCollection<DrupalMedia[]>("media--image", {params: params.getQueryObject() })

  return(entities)
}

export async function fetchPhotosByTag(tag: string)  {

	const params = new DrupalJsonApiParams()
		.addFields('media--image', ['name','field_media_image', 'field_category' ])
		.addSort('created')
		.addFilter('field_category.name', tag)
		.addInclude('field_media_image', 'field_category')

  	const entities = await client.getResourceCollection<DrupalMedia[]>("media--image",{params: params.getQueryObject() })

 	return(entities)
}

export async function fetchPhotosByEvent(event: string)  {

	const params = new DrupalJsonApiParams()
		.addFields('media--image', ['name','field_media_image', 'field_event' ])
		.addSort('created')
		.addFilter('field_event.name', event)
		.addInclude('field_media_image', 'field_event')

  	const entities = await client.getResourceCollection<DrupalMedia[]>("media--image",{params: params.getQueryObject() })

 	return(entities)
}


export async function fetchFamilyEvents() {
  	const data = await client.getResourceCollection<DrupalTaxonomyTerm[]>("taxonomy_term--event")
  	return(data)

}
