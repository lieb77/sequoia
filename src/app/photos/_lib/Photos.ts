// /src/app/photos/_lib//Photos.ts
import { base } from '@/lib/constants'

export const mediaFields = [
	'name',
	'field_media_image',
	'field_category',
	'field_event', 
	'field_tour',
	'field_taken', 
	'field_location', 
	'field_latitude', 
	'field_longitude' 
]


export interface PhotoData {
  id:   string,
  name: string,
  url:  string,
}

interface JsonPhoto {
  id: string,
  name: string,
  field_media_image: {
    uri: {
      url: string
    }
  }
}


export class Photos {
	rawdata: JsonPhoto[] = []
  
	constructor(data: JsonPhoto[]){
  		this.rawdata = data
  	}
  
  	public getPhotosForSlideshow() : PhotoData[] {
		const Photos: PhotoData[] = []
		this.rawdata.forEach((media: JsonPhoto) => {
			Photos.push({
				id: media.id,
				name: media.name,
				url: media.field_media_image.image_style_uri ? media.field_media_image.image_style_uri['1024x768'] : "/Touring.jpg"
			})
		})
		return Photos
	}

  	public getPhotosForGallery() : PhotoData[] {
		const Photos: PhotoData[] = []
		this.rawdata.forEach((photo: JsonPhoto) => {
			Photos.push({
				id: photo.id,
				title: photo.name || photo.title,
				lat: photo.field_latitude,
				lng: photo.field_longitude,
				uri: base + photo?.field_media_image?.uri?.url, 
				loc: photo.field_location,
				tak: photo.field_taken				
			})	
		})
		return Photos
  	}
}
