// /pictures/page.tsx
import { Layout } from "@/components/Layout"
import { Suspense } from 'react';
import { ReactSlideshow } from '@/components/ReactSlideshow'
import { 
		fetchPhotosByTag, 
		fetchFamilyEvents, 
		fetchPhotosByEvent, 
		PhotoData, 
		Photos, 
		CatSelect, 
		EventSelect,
		Event,
		Events 
	} from "@/features/photos"


export const dynamic = 'force-dynamic'

export default async function Pictures(props: {
  searchParams?: Promise<{
    category?: string,
    event?: string}>
}) {

  const searchParams = await props.searchParams
  const category     = searchParams?.category || "Bicycle"
  const event        = searchParams?.event    || "All"

  const categories=[
    { value: "Bicyle",     label: "Bicycle"},
    { value: "Music",      label: "Music"},
    { value: "Instrument", label: "Instrument"},
    { value: "Ride",       label: "Ride"},
    { value: "Family",     label: "Family"}
   ]

  let events: Event[] = []
  let photos: PhotoData[]  = []

  if (category === "Family") {
    // Get family event data
    const eventsData = await fetchFamilyEvents()
    events = new Events(eventsData).getEvents()
  }
  else if (event !== "All"){
    const params = new URLSearchParams(searchParams);
    params.delete('event');
    const newUrl = "https://live.paullieberman.net/pictures?category=" + category
    redirect(newUrl);
  }

  if (event !== "All") {
    const photoData = await fetchPhotosByEvent(event)
    photos = new Photos(photoData).getPhotos()
  }
  else {
    const photoData = await fetchPhotosByTag(category)
    photos = new Photos(photoData).getPhotos()
  }

  return (
	   <Layout>
		  <Suspense>
			<CatSelect options={categories} current={category}/>
			{category === "Family" &&
			  <EventSelect options={events} current={event}/>
			}
			<ReactSlideshow images={photos} interval={6000} />
		  </Suspense>
		</Layout>
	 )  
}
