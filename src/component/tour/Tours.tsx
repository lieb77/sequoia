// /class/Tours.tsx
import { base } from "@/lib/api"
import { fixUrls } from "@/lib/utils"


export interface TourData {
  id: string,
  title: string,
  date: string,
  days: number,
  descr: string,
  miles: number,
  map: string,
  body: string,
  rides: RideData[],
  photos: PhotoData[],
}

export interface TourDataShort {
  id: string,
  title: string,
  date: string,
  descr: string,
}


export class Tours {

  Tour: TourData[]

	// Constructor is passes raw data from JSON:API
	constructor(tour, rides, photos ) {

    this.Tour = {
      id: tour.id,
      title: tour.title,
      date: tour.field_start_date,
      days: tour.field_number_of_days,
      descr: (tour.field_short_description) ? tour.field_short_description.value : "Tour description",
      miles: tour.field_mileage,
      map: (tour.field_overview_map.field_media_image) && base + tour.field_overview_map.field_media_image.uri.url,
      body: (tour.body) && fixUrls(tour.body.processed),
      rides: rides,
      photos: photos,
    }
  }

  public  getTour() : TourData {
    return this.Tour
  }

}

export class ToursShort {

  Index: TourDataShort[] = []

  constructor(data){
    data.forEach(tour =>
      this.Index.push({
        id:    tour.id,
        title: tour.title,
        date:  tour.field_start_date,
        descr: (tour.field_short_description) ? tour.field_short_description.value : "Tour description",
      })
    )
  }

  public getTourIndex(): TourDataShort[] {
    return this.Index
  }

// end-of class
}
