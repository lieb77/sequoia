// /pictures/page.tsx
import { Suspense } from 'react'
import { Slideshow } from '@/components/Slideshow'
import { fetchPhotosByTag, fetchFamilyEvents, fetchPhotosByEvent } from './_lib/getphotos'
import { PhotoData, Photos } from './_lib/Photos'
import { Event, Events } from './_lib/Events'
import { CatSelect } from './_components/CatSelect'
import { EventSelect } from './_components/EventSelect'
import { redirect } from 'next/navigation'

interface PhotosPageProps {
    searchParams?: {
        category?: string
        event?: string
    }
}

const categories = [
    { value: 'Bicycle', label: 'Bicycle' },
    { value: 'Music', label: 'Music' },
    { value: 'Instrument', label: 'Instrument' },
    { value: 'Ride', label: 'Ride' },
    { value: 'Family', label: 'Family' }
]

export default async function photosPage(props: PhotosPageProps) {
    const { searchParams } = props
    const category = searchParams?.category || 'Bicycle'
    const event = searchParams?.event || 'All'

    let events: Event[] = []
    let photos: PhotoData[] = []

    if (category === 'Family') {
        const eventsData = await fetchFamilyEvents()
        events = new Events(eventsData).getEvents()
    } else if (event !== 'All') {
        const params = new URLSearchParams(searchParams as Record<string, string>)
        params.delete('event')
        const newUrl = `/photos/slideshow/?category=${category}`
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

/* AI AUDIT NOTES:
Changelog:
1.  **Interface Definition:** Created a dedicated `PhotosPageProps` interface for the `props` argument in the `photosPage` function. This improves type safety and readability.
2.  **Destructuring Props:** Destructured the `searchParams` from the `props` object for cleaner code.
3.  **Simplified Redirect URL:**  Constructed the redirect URL using template literals for better readability and maintainability.  Also removed hardcoded domain.
4.  **Type Assertion for URLSearchParams:** Added a type assertion `as Record<string, string>` to `searchParams` when creating `URLSearchParams`. This resolves a potential type issue and ensures compatibility with the `URLSearchParams` constructor.
5.  **Removed Unnecessary Promise:** Removed `Promise<>` from `searchParams` type definition. Next.js already resolves the search params.
*/
