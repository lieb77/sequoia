// /class/Tours.tsx
import { base, client } from "@/lib/api"
import { fixUrls } from "@/lib/utils"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { DrupalNode, DrupalMedia } from "next-drupal"
import { Rides } from "@/features/ride"
import { Photos, fetchPhotosForTour } from "@/features/photos"

import type { TourData } from "../types"

export class Tours {

	tourId: string = "4ca60095-1f69-458c-a8bc-7c3f8c7561ac"

	// Constructor is passes raw data from JSON:API
	constructor(tourId?: string) {
		this.tourId = tourId
	}

	// Get all the data for one tour
	public  async getTour() : TourData {

		// Get the tour data
		const tour  = await this.fetchTour()
		
		// Get the ride data
		const rideClass = new Rides
		const rides     = await rideClass.getRidesForTour(this.tourId)
		 
		// Get the photos
		const photoData = await fetchPhotosForTour(this.tourId)
    	const photos    = new Photos(photoData).getPhotos()

		const Tour = {
			id: tour.id,
			title: tour.title,
			date: tour.field_start_date,
			days: tour.field_number_of_days,
			descr: (tour.field_short_description) ? tour.field_short_description.value : "Tour description",
			miles: tour.field_mileage,
			map: (tour?.field_overview_map?.field_media_image) && base + tour.field_overview_map.field_media_image.uri.url,
			body: (tour.body) && fixUrls(tour.body.processed),
			rides: rides,
			photos: photos,
		}
		return Tour
	}

	public async getTourIndex() {
	
		const index = []
		const data = await this.fetchTourIndex()
	
    	data.forEach(tour =>
      		index.push({
				id:    tour.id,
				title: tour.title,
				date:  tour.field_start_date,
				descr: (tour.field_short_description) ? tour.field_short_description.value : "Tour description",
			})
    	)
    	
    	return index
	}


	
	
	
	
	// Get the ID, date and name for all tours
	private async fetchTourIndex() {
	
		const params = new DrupalJsonApiParams()
			.addFields("node--tour", ['title','body', 'field_mileage', 'field_start_date', 'field_number_of_days', 'field_short_description'  ])
			.addSort('field_start_date', 'DESC')
	
		const nodes = await client.getResourceCollection<DrupalNode[]>("node--tour", {params: params.getQueryObject() })
	
		return(nodes)
	}
	

	/**
	 * fetchTour
	 *
	 * Get all the data for a sing;e tour, including rides and photos
	 *
	 */
	private async fetchTour() {
	
		const params = new DrupalJsonApiParams()
			.addFields("node--tour", ['title','body', 'field_start_date', 'field_mileage', 'field_number_of_days', 'field_short_description', 'field_overview_map'  ])
			.addInclude('field_overview_map.field_media_image')
	
		const node = await client.getResource<DrupalNode>("node--tour", this.tourId, {params: params.getQueryObject() })
	
		return(node)
	}



	
	
	/**
	 * fetchPhotos
	 *
	 */
	private async fetchPhotosForTour(id: string) {
	
			const params = new DrupalJsonApiParams()
					.addFields('media--image', ['name','field_media_image', 'field_tour' ])
					.addSort('created')
					.addFilter('field_tour.id', this.tourId)
					.addInclude('field_media_image')
	
	
	  const entities = await client.getResourceCollection("media--image", {params: params.getQueryObject() })
	
	  return(entities)
	}
  

}

