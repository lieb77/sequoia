
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
