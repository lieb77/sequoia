
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import './bikes.css'

export function BikeNav({bikes}) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	function goToBike(goBike) {
		const params = new URLSearchParams(searchParams);
		params.set('bike', goBike)
		replace(`${pathname}?${params.toString()}`);
	}


	return(
		<div className="bike-nav">
			{bikes.map(bike =>
				<button key={bike} onClick={() =>  goToBike(bike)}
					className="bike-nav-button" >
					{bike}
				</button>
			)}
		</div>
	)
}

