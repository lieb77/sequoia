// /pictures/page.tsx
import { Suspense } from 'react'
// import { ReactSlideshow } from '@/components/ReactSlideshow'
import { Slideshow } from '@/components/Slideshow'
import { fetchPhotosByTag, fetchFamilyEvents, fetchPhotosByEvent } from '../_lib/getphotos'
import { PhotoData, Photos } from '../_lib/Photos'
import { Event, Events } from '../_lib/Events'
import { CatSelect } from '../_components/CatSelect'
import { EventSelect } from '../_components/EventSelect'

export default async function photosPage(props: {
    searchParams?: Promise<{
        category?: string
        event?: string
    }>
}) {
    const searchParams = await props.searchParams
    const category = searchParams?.category || 'Bicycle'
    const event = searchParams?.event || 'All'

    const categories = [
        { value: 'Bicyle', label: 'Bicycle' },
        { value: 'Music', label: 'Music' },
        { value: 'Instrument', label: 'Instrument' },
        { value: 'Ride', label: 'Ride' },
        { value: 'Family', label: 'Family' }
    ]

    let events: Event[] = []
    let photos: PhotoData[] = []

    if (category === 'Family') {
        // Get family event data
        const eventsData = await fetchFamilyEvents()
        events = new Events(eventsData).getEvents()
    } else if (event !== 'All') {
        const params = new URLSearchParams(searchParams)
        params.delete('event')
        const newUrl = 'https://live.paullieberman.net/pictures?category=' + category
        redirect(newUrl)
    }

    if (event !== 'All') {
        const photoData = await fetchPhotosByEvent(event)
        photos = new Photos(photoData).getPhotos()
    } else {
        const photoData = await fetchPhotosByTag(category)
        photos = new Photos(photoData).getPhotos()
    }

    return (
		<Suspense>
			<CatSelect options={categories} current={category} />
			{category === 'Family' && <EventSelect options={events} current={event} />}
			<Slideshow images={photos} interval={6000} />
		</Suspense>
    )
}
