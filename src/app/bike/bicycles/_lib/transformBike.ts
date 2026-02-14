// src/lib/data/transfromBike.ts
import { JsonBike, Bike } from "./types"
import { fixUrls } from "@/lib/utils"

export function transformBike(bike: JsonBike): Bike {

	const urls: string[] = []
	if(Array.isArray(bike.field_bicycle_picture))
		bike.field_bicycle_picture.forEach(pic =>
		urls.push( pic?.field_media_image?.image_style_uri?.['1024_wide'])
	)
	
	const html = fixUrls(bike.body.processed)
	
	return {
		id: bike.id,
		title: bike.title,	
		make: bike.field_make,
		model:  bike.field_model,
		from: bike.field_purchased_from,
		year: bike.field_year,
		html: html,
		urls: urls,
	}
}
	
	
	