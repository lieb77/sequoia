// gallery/page.tsx
import { fetchPhotos } from './getphotos'
import { PhotoCard } from './photocard'
import { base } from '@/lib/api'

export default async function Page() {

	const photos = await fetchPhotos()

	return (
	 <div className="p-8 min-w-full">
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
			{photos.map((photo) => (
				<PhotoCard 
					key={photo.id} 
					data={{
						id: photo.id,
						title: photo.name || photo.title,
						lat: photo.field_latitude,
						lng: photo.field_longitude,
						uri: base + photo?.field_media_image?.uri?.url, 
						loc: photo.field_location,
						tak: photo.field_taken
					}}
				/>
			))}
		</div>
	  </div>
	)
}
