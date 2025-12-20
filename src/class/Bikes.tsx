/**
 * /class/Bikes.tsx
 *
 * Exports a Bikes class
 * Public methods provide access to the data
 *
 */
import { base } from "@/lib/api"

export interface Bike {
	id:    string,
	name:  string,
	make:  string,
	model: string,
	from:  string,
	year:  string,
	body:  string,
	urls:  string[]
}

export interface JsonBike {
  id: string,
	title: string,
	field_make: string,
	field_model: string,
	field_purchased_from: string,
	field_year: string,
	body:{
	  processed: string
  },
  field_bicycle_picture: [
    {thumbnail: {
      uri: {
      url: string[]
    }}}
  ]
}

export class Bikes {

	bikesArray: Bike[] = []

	// Constructor is passes raw data from JSON:API
	constructor(bikes: JsonBike[]) {

		bikes.forEach((bike: JsonBike) => {
			const urls: string[] = []
			if(Array.isArray(bike.field_bicycle_picture))
			  bike.field_bicycle_picture.forEach(pic =>
			    urls.push( base + pic.thumbnail.uri.url)
        )

			this.bikesArray.push({
				id: bike.id,
				name: bike.title,
				make: bike.field_make,
				model: bike.field_model,
				from: bike.field_purchased_from,
				year: bike.field_year,
				body: bike.body.processed,
				urls: urls,
			})
		})
	}

	// Return all rides
	public getBikes() : Bike[] {
		return this.bikesArray
	}

}
