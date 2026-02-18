// app/photos/slideshow/page.tsx
import { Suspense } from 'react'
import { Slideshow } from '@/components/Slideshow'
import { fetchPhotosByTag, fetchFamilyEvents, fetchPhotosByEvent } from '../_lib/getphotos'
import { Photos } from '../_lib/Photos'
import { Events } from '../_lib/Events'
import { CatSelect } from '../_components/CatSelect'
import { EventSelect } from '../_components/EventSelect'

// Define categories outside to avoid re-allocation
const CATEGORIES = [
    { value: 'Bicycle', label: 'Bicycle' },
    { value: 'Music', label: 'Music' },
    { value: 'Instrument', label: 'Instrument' },
    { value: 'Ride', label: 'Ride' },
    { value: 'Family', label: 'Family' }
]

export default async function PhotosPage(props: {
    searchParams: Promise<{ category?: string; event?: string }>
}) {
    const searchParams = await props.searchParams
    const category = searchParams.category || 'Bicycle'
    
    // Safety check: Only allow an 'event' filter if we are in the Family category
    const event = category === 'Family' ? (searchParams.event || 'All') : 'All'

    // 1. Parallel Data Fetching Logic
    // Fetch events if needed
    const eventsData = category === 'Family' ? await fetchFamilyEvents() : []
    const events = new Events(eventsData).getEvents()

    // 2. Determine Photo Source
    const photoData = (category === 'Family' && event !== 'All') 
        ? await fetchPhotosByEvent(event) 
        : await fetchPhotosByTag(category)
    
    const photos = new Photos(photoData).getPhotos()


	return (
		<div className="w-full flex flex-col items-center mt-4"> 
			{/* The Filter Bar: Centered and only as wide as the selects */}
			<div className="flex flex-wrap items-baseline justify-center gap-4 p-2 mb-4 bg-gray-100 rounded-lg w-fit mx-auto border border-gray-200">
				<CatSelect options={CATEGORIES} current={category} />
				
				{category === 'Family' && (
					<EventSelect options={events} current={event} />
				)}
			</div>
	
			{/* The Slideshow: Stays full width/correct size */}
			<Suspense fallback={null}>
				<div className="w-full"> 
					<Slideshow images={photos} interval={6000} />
				</div>
			</Suspense>
		</div>
	)
}
