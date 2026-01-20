/**
 *
 */
import { fixUrls } from "@/lib/utils"
import { fetchBike } from "./getbikes"
import { ServiceLog } from  "./servicelog"
import Image from "next/image"

export const bikeNames = ['Grando', 'Ravn', 'Soma Saga']

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

export async function Bikes({thisBike}) {

	// Fetch the data for this bike
	const bike = await fetchBike(thisBike)

	const urls: string[] = []
	if(Array.isArray(bike.field_bicycle_picture))
		bike.field_bicycle_picture.forEach(pic =>
		urls.push( pic?.field_media_image?.image_style_uri?.['1024_wide'])
	)
	
	const html = fixUrls(bike.body.processed)
	
	return(
		<div key={bike.id} className="bikediv warpme">
			<div className="bike-display">
				<div>
					<h2 className="big">{ bike.title }</h2>
					<p>{ bike.field_make } &nbsp; { bike.field_model }</p>
					<p>{ bike.field_purchased_from } &nbsp; { bike.field_year }</p>
					<div className="embedded-html" dangerouslySetInnerHTML={{ __html: html }} />
				</div>
						
				<div>
					{urls.map(url =>
						<Image key={url} src={url} alt='Bike' width={600} height={600} className="my-2"/>
					)}
				</div> 
			</div>
			<ServiceLog bike={bike.title} />
		</div>
	)
}
