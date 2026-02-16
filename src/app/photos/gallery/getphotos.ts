// /
import { client } from "@/lib/api"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { DrupalTaxonomyTerm, DrupalMedia } from "next-drupal"

/**
 * fetchPhotos
 *
 */
export async function fetchPhotos() {

	const params = new DrupalJsonApiParams()
		.addFields('media--image', ['name','field_media_image', 'field_taken', 'field_location', 'field_latitude', 'field_longitude' ])
		.addSort('field_taken', "DESC")
		.addInclude('field_media_image')
        .getQueryObject()

  const entities = await client.getResourceCollection<DrupalMedia[]>("media--image", {params: params })

  return(entities)
}


