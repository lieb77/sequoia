/* /components/Tour */
import Image from 'next/image'
import Link from 'next/link'
import { Slideshow } from '@/component/Slideshow'
import type { TourDataShort, TourData } from "@/component/tour/Tours"


export function Tour({tour}: {tour: TourData} ){
  return(
    <div key={tour.id} className="flex flex-row warpme">
      <div className="basis-1/4 m-4 warpme">
        <h2>{tour.title}</h2>
        <p>Start date: {tour.date}</p>
        <p>Number of days: {tour.days}</p>
        <p>Total miles: {tour.miles}</p>
        <p>Description: {tour.descr}</p>
        <div dangerouslySetInnerHTML={{ __html: tour.body }} />
         {tour.map &&
          <Image src={tour.map} alt="Tour map" width={500} height={400}/>
        }
      </div>
      <div className="m-4 basis-1/2 ">
        <Slideshow images={tour.photos} interval={5000} />
      </div>
      <div className="m-4 basis-1/4">
        {tour.rides.map(ride =>
          <div key={ride.id} className="warpme">
            <h3>{ride.title}</h3>
            <p>Date: {ride.date}</p>
            <p>Miles: {ride.miles}</p>
            <div dangerouslySetInnerHTML={{ __html: ride.body }} />
          </div>
        )}
      </div>
    </div>
  )
}

export function TourIndex({tours} : {tours: TourDataShort[] }){
  return(
    <div className="grid grid-cols-4 gap-2">
      {tours.map(tour =>
        <div key={tour.id} className="warpme">
          <Link href={`/tour?id=${tour.id}`}>
            <p>{tour.title}</p>
            <p>{tour.date}</p>
            <p>{tour.descr}</p>
          </Link>
        </div>
      )}
    </div>
  )
}

