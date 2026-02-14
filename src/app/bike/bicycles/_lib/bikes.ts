// /lib/getrides.tsx
import { client } from "@/lib/api"
import { fixUrls } from "@/lib/utils"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { DrupalNode } from "next-drupal"
import type {Bike, JsonBike, Service, JsonService } from "./types"



export class Bikes {

	bikeName: string = "Grando"

	constructor(bike) {
		this.bikeName = bike
	}

	// Return bike data
	public async getBike(){
		
		const node = await this.fetchBike()
	
		// Get image urls
		const urls: string[] = []
		if(Array.isArray(node.field_bicycle_picture))
			node.field_bicycle_picture.forEach(pic =>
				urls.push( pic?.field_media_image?.image_style_uri?.['1024_wide'])
			)		
		const html = fixUrls(node.body.processed)
	
		const bike: Bike = {
			id: node.id,
			name: node.title,
			make: node.field_make,
			model: node.field_model,
			year: node.field_year,
			from: node.field_purchased_from,
			html: html,
			urls: urls,
		} 
		
		return bike
	}

	/*
	 * fetchBikes
	 *
	 * Returns all bikes
	 *
	 */
	 private async fetchBikes(): Promise<JsonBike[]> {
	
		const params = new DrupalJsonApiParams()
			.addFields("node--bicycle", ['title','body','field_make', 'field_model','field_purchased_from','field_year', 'field_bicycle_picture'])
			.addFilter("field_bike_activre", 1)
			.addInclude(['field_bicycle_picture.field_media_image'])
	
		const nodes = await client.getResourceCollection<DrupalNode[]>("node--bicycle", {params: params.getQueryObject() })
		return nodes
	
	}
	
	/*
	 * fetchBikes
	 *
	 * Returns one bike by name
	 *
	 */
	 private async fetchBike(): Promise<JsonBike> {
	
		const params = new DrupalJsonApiParams()
			.addFields("node--bicycle", ['title','body','field_make', 'field_model','field_purchased_from','field_year', 'field_bicycle_picture'])
			.addFilter("title", this.bikeName)
			.addInclude(['field_bicycle_picture.field_media_image'])
	
		const nodes = await client.getResourceCollection<DrupalNode[]>(
			"node--bicycle",
			{params: params.getQueryObject() }
		)
		return nodes[0]
	
	}
		
}
