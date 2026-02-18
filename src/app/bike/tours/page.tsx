// src/app/bike/tours/page.tsx

import { Tours } from './_lib/Tours'
import { TourIndex } from './_components/tour'

export default async function Page() {

 	// Fetch all the data
	  const tourClass  = new Tours()    
	  const tourIndex  = await tourClass.getTourIndex()

  	return (
      		<div className="flex flex-col">
      			<TourIndex tours={tourIndex} />
      		</div>
  	)
}
