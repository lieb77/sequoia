
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import styles from '../styles/bikenav.module.css';


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
		<div className={styles.bikeNav}>
			{bikes.map(bike =>
				<button key={bike} onClick={() =>  goToBike(bike)}
					className={styles.bikeNavButton} >
					{bike}
				</button>
			)}
		</div>
	)
}

