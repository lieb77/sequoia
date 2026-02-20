// /src/app/photos/_lib/getphotos.ts

import { client } from '@/lib/api/drupalClient'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'
import { DrupalTaxonomyTerm, DrupalMedia } from 'next-drupal'
import { mediaFields } from './Photos'

// Fetch 50 photos, no filter
export async function fetchPhotos() {
    const params = new DrupalJsonApiParams()
        .addFields('media--image', mediaFields)
        .addSort('field_taken', 'DESC')
        .addInclude('field_media_image')
        .getQueryObject()

    const entities = await client.getResourceCollection<DrupalMedia[]>('media--image', {
        params: params
    })

    return entities
}

// Fetch phots by Tour ID
export async function fetchPhotosForTour(id: string) {
    const params = new DrupalJsonApiParams()
        .addFields('media--image', mediaFields)
        .addSort('created')
        .addFilter('field_tour.id', id)
        .addInclude('field_media_image')

    const entities = await client.getResourceCollection<DrupalMedia[]>('media--image', {
        params: params.getQueryObject()
    })

    return entities
}

// Fetch photos by Tag
export async function fetchPhotosByTag(tag: string) {
    const params = new DrupalJsonApiParams()
        .addFields('media--image', mediaFields)
        .addSort('created')
        .addFilter('field_category.name', tag)
        .addInclude('field_media_image', 'field_category')

    const entities = await client.getResourceCollection<DrupalMedia[]>('media--image', {
        params: params.getQueryObject()
    })

    return entities
}


// Fetch photos by Tag
export async function fetchPhotosByTagForGallery (tag: string) {
    const params = new DrupalJsonApiParams()
        .addFields('media--image', mediaFields)
        .addSort('created')
        .addFilter('field_category.name', tag)
        .addFilter("field_latitude", null, "IS NOT NULL")
        .addInclude('field_media_image', 'field_category')

    const entities = await client.getResourceCollection<DrupalMedia[]>('media--image', {
        params: params.getQueryObject()
    })

    return entities
}


// Fetch photos by family event
export async function fetchPhotosByEvent(event: string) {
    const params = new DrupalJsonApiParams()
        .addFields('media--image', mediaFields)
        .addSort('created')
        .addFilter('field_event.name', event)
        .addInclude('field_media_image', 'field_event')

    const entities = await client.getResourceCollection<DrupalMedia[]>('media--image', {
        params: params.getQueryObject()
    })

    return entities
}

export async function fetchPhotosByEventForGallery(event: string) {
    const params = new DrupalJsonApiParams()
        .addFields('media--image', mediaFields)
        .addSort('created')
        .addFilter('field_event.name', event)
       //  .addFilter("field_latitude", null, "IS NOT NULL")
        .addInclude('field_media_image', 'field_event')

    const entities = await client.getResourceCollection<DrupalMedia[]>('media--image', {
        params: params.getQueryObject()
    })

    return entities
}


// Fetch family events taxonomy terms
export async function fetchFamilyEvents() {
    const params = new DrupalJsonApiParams()
        .addFields('taxonomy_term--event', ['id', 'name'])
        .addSort('name')

    const data = await client.getResourceCollection<DrupalTaxonomyTerm[]>('taxonomy_term--event', {
        params: params.getQueryObject()
    })
    return data
}
