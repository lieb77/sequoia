
/* /tours/page.tsx
 *
 */
import { Layout } from '@/component/Layout'
import { fetchTourIndex } from '@/lib/gettours'
import { TourIndex } from '@/component/Tour'
import { ToursShort } from '@/class/Tours'

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
