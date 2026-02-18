// /rides/page.tsx
import { currentYear } from '@/lib/constants'
import { RideView, RideNav } from '../_components'
import { Rides } from '../_lib/Rides'


export default async function RidesPage({ params, searchParams }: Props) {
	const { year } = await params; // year is an array or undefined
	const { view } = await searchParams;

	// If the user is at /bike/rides, 'year' is undefined.
	// We provide the default here.
	const selectedYear = year?.[0] || currentYear
	const selectedView = view || "rides"

	const ridesClass = new Rides(selectedYear)
	const myRides    = await ridesClass.getRides()
	const stats      = ridesClass.getYearlyStats()
	
	return (
		<div className="place-items-center">
			<RideNav />
			<RideView view={selectedView} stats={stats} rides={myRides}/>
		</div>
	)
}
