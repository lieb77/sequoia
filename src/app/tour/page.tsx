
/* /tours/page.tsx
 *
 */
import { Layout } from '@/component/Layout'
import { Rides } from '@/component/ride/Rides'
import { Photos } from '@/class/Photos'
import { Tours } from '@/component/tour/Tours'
import { Tour } from '@/component/tour/Tour'
import { fetchTour, fetchRidesByTour, fetchPhotosForTour } from '@/component/tour/gettours'

export default async function Page(props: {
  searchParams?: Promise<{
    id?: string}>;
}) {


  const searchParams = await props.searchParams
  const id = searchParams?.id || "4ca60095-1f69-458c-a8bc-7c3f8c7561ac"

  // Fetch all the data
  const tourData  = await fetchTour(id)
  const rideData  = await fetchRidesByTour(id)
  const photoData = await fetchPhotosForTour(id)

  // Build the Rides array
  const ridesObj = new Rides(rideData)
  ridesObj.sortAsc()
  const rides = ridesObj.getRides()

  // Build the Photos array
  const photos = new Photos(photoData).getPhotos()

  // Now we can build the Tours Array
  const toursObj = new Tours(tourData, rides, photos)
  const tour = toursObj.getTour()


  return (
    <Layout>
      <main className="flex flex-col p-4">
        <Tour key={tour.id} tour={tour} />
       </main>
    </Layout>
  )
}

