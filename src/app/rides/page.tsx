// /rides/page.tsx
import { Layout } from '@/components/Layout'
import { currentYear } from '@/lib/utils'
import { Suspense } from 'react';
import { RideView, RideNav, Rides} from '@/features/ride'

export default async function Page(props: {
	searchParams?: Promise<{
		year?: number,
		view?: string}>;
	}) {

	const searchParams = await props.searchParams
	const year  = searchParams?.year || currentYear
	const view  = searchParams?.view || "rides"
	
	const ridesClass = new Rides(year)
	const myRides    = await ridesClass.getRides()
	const stats      = ridesClass.getYearlyStats()
	
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
