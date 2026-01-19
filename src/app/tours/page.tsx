
/* /tours/page.tsx
 *
 */
import { Layout } from '@/component/Layout'
import { fetchTourIndex } from '@/component/tour/gettours'
import { TourIndex } from '@/component/tour/Tour'
import { ToursShort } from '@/component/tour/Tours'

export default async function Page() {

  const data      = await fetchTourIndex()
  const toursObj  = new ToursShort(data)
  const tourIndex = toursObj.getTourIndex()

  return (
    <Layout>
      <main className="flex flex-col p-4">
      <TourIndex tours={tourIndex} />
      </main>
    </Layout>
  );
}
