// /rides/page.tsx
import { Layout } from '@/components/Layout'
import { currentYear } from '@/lib/constants'
import { RideView, RideNav } from './_components'
import { Rides } from './_lib/Rides'

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
			<h1 className="text-gray-800!">Rides {year}</h1>
			<RideNav />
				<RideView view={view} stats={stats} rides={myRides}/>
		</Layout>
	)
}
