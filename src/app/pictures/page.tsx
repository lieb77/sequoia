// /pictures/page.tsx
import { Layout } from '@/component/Layout'
import { fetchPhotosByTag, fetchFamilyEvents, fetchPhotosByEvent } from "@/lib/getphotos"
import { PhotoData, Photos } from '@/class/Photos'
import { Event, Events } from '@/class/Events'
import { Slideshow } from '@/component/Slideshow'
import { CatSelect } from '@/component/CatSelect'
import { EventSelect } from '@/component/EventSelect'
import { Suspense } from 'react';
import { redirect } from 'next/navigation'

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
    const newUrl = "https://bsky.paullieberman.net/pictures?category=" + category
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
<<<<<<< HEAD
        <Slideshow images={photos} interval={6000} />
=======
        <Slideshow images={photos} interval={3000} />
>>>>>>> 57026cc0dbfd60a63ec08e4e76f8c8056d2c7dd2
      </Suspense>
    </Layout>

  )

}
