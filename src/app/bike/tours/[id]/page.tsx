
/* /tours/page.tsx
 *
 */
import { Layout } from '@/components/Layout'
import { Rides } from '../rides/ride'
import { Photos } from '@/features/photos'
import { Tour } from '../_components/tour'
import { Tours } from '../_lib/Tours'

export default async function TourPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params || "4ca60095-1f69-458c-a8bc-7c3f8c7561ac"
	
	  // Fetch all the data
	  const tourClass = new Tours(id)    
	  const tour      = await tourClass.getTour()

	  return (
		<Layout>
		  <main className="flex flex-col p-4">
			<Tour tour={tour} />
		   </main>
		</Layout>
	  )
}

