// /src/app/photos/gallery/page.tsx

import { base } from '@/lib/constants'
import { fetchPhotosByTagForGallery, fetchFamilyEvents, fetchPhotosByEventForGallery } from '../_lib/getphotos'
import { Events } from '../_lib/Events'
import { Categories } from '../_lib/Categories'
import { Photos } from '../_lib/Photos'
import { PhotoCard } from '../_components/PhotoCard'
import { CatSelect } from '../_components/CatSelect'
import { EventSelect } from '../_components/EventSelect'

export default async function PhotoGellery(props: {
    searchParams: Promise<{ category?: string; event?: string }>
}) {
    const searchParams = await props.searchParams
    const category = searchParams.category || 'Ride'
    
    // Safety check: Only allow an 'event' filter if we are in the Family category
    const event = category === 'Family' ? (searchParams.event || 'All') : 'All'

    // 1. Parallel Data Fetching Logic
    // Fetch events if needed
    const eventsData = category === 'Family' ? await fetchFamilyEvents() : []
    const events = new Events(eventsData).getEvents()

    // 2. Determine Photo Source
    const photoData = (category === 'Family' && event !== 'All') 
        ? await fetchPhotosByEventForGallery(event) 
        : await fetchPhotosByTagForGallery(category)
    
    const photos = new Photos(photoData).getPhotosForGallery()


	return (
	    <div  className="w-full p-4" >
		<div className="flex flex-col items-center mt-4"> 
			{/* The Filter Bar: Centered and only as wide as the selects */}
			<div className="flex flex-wrap items-baseline justify-center gap-4 p-2 mb-4 bg-gray-100 rounded-lg w-fit mx-auto border border-gray-200">
				<CatSelect options={Categories} current={category} />
				
				{category === 'Family' && (
					<EventSelect options={events} current={event} />
				)}
			</div>
	    </div>
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
			{photos.map((photo) => (
				<PhotoCard 
					key={photo.id} 
					data={photo}
				/>
			))}
		</div>
	  </div>
	)
}
