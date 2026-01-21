
/* /tours/page.tsx
 *
 */
import { Layout } from '@/components/Layout'
import { Rides } from '@/features/ride'
import { Photos } from '@/features/photos'
import { Tours, Tour } from '@/features/tour'

export default async function Page(props: {
  searchParams?: Promise<{
    id?: string}>;
}) {



	  const searchParams = await props.searchParams
	  const id = searchParams?.id || "4ca60095-1f69-458c-a8bc-7c3f8c7561ac"
	
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

