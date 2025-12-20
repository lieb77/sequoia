// /rides/page.tsx
import { Layout } from '@/component/Layout'
import { RideView } from '@/component/RideView'
import { RideNav} from '@/component/RideNav'
import { currentYear } from '@/lib/utils'
import { fetchRidesByYear } from '@/lib/getrides'
import { Rides } from '@/class/Rides'
import { Suspense } from 'react';

export default async function Page(props: {
  searchParams?: Promise<{
    year?: number,
    view?: string}>;
}) {

  const searchParams = await props.searchParams
  const year  = searchParams?.year || currentYear
  const view  = searchParams?.view || "rides"
  const data  = await fetchRidesByYear(year)
  const rides = new Rides(data)

  if(year == currentYear)
    rides.sortDesc()
  else
    rides.sortAsc()

  const myRides = rides.getRides()
  const stats   = rides.getStats()

  return (
   	<Layout>
      <h1>Rides {year}</h1>
      <RideNav />
      <Suspense>
        <RideView view={view} stats={stats} rides={myRides}/>
      </Suspense>
    </Layout>
  )
}
