/* components/RideYear */
import { RideTable } from "~/components/RideTable"
import { StatsYear } from "~/components/StatsYear"
import { getLongMonthNames } from "~/lib/utils"

export function Year({ rides, stats}: JSX.Element) {

	const months  = getLongMonthNames()

	const mons = [1,2,3,4,5,6,7,8,9,10,11,12]
	return(
		<div className="m-2 p-2 bg-gray-100 place-items-left warpme">
			<StatsYear stats={stats} />
			<div>
				{mons.map((mon) => (
					<div key={mon}>
						<h2 className="bigger">{months[mon -1]}</h2>
							{rides[mon] ? (
								<RideTable key={mon} rides={rides[mon]} id={mon} />
							) : (
								<p>No rides data for {months[mon -1]}</p>
							)}
					</div>
				))}

			</div>
		</div>
	)
}
