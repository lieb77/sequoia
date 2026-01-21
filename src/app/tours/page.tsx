
/* /tours/page.tsx
 *
 */
import { Layout } from '@/components/Layout'
import { Tours, TourIndex } from '@/features/tour'

export default async function Page() {


 	// Fetch all the data
	  const tourClass  = new Tours()    
	  const tourIndex  = await tourClass.getTourIndex()

  	return (
    	<Layout>
      		<main className="flex flex-col p-4">
      			<TourIndex tours={tourIndex} />
      		</main>
    	</Layout>
  	);
}
