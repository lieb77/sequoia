/**
 *
 */
import Image from "next/image"
import { sanitizeHTML } from "@/lib/utils"

import styles from './bike.module.css';

export async function Bike({bike}) {

	return(
		<div className={styles.bikeWrapper}>
			<div className={styles.bikeDisplay}>
				<h2 className={styles.bikeTitle}>{bike.name}</h2>
				<p>{bike.make} &nbsp; {bike.model}</p>
				<p>{bike.from} &nbsp; {bike.year}</p>
				<div classname={styles.bikeHtml}>
					<div dangerouslySetInnerHTML={{ __html: sanitizeHTML(bike.html) }} />
				</div>
			</div>
					
			<div className={styles.bikePhotos}>
				{bike.urls.map(url =>
					<Image key={url} src={url} alt='Bike' width={600} height={600} className="my-2"/>
				)}
			</div> 
		</div>			
	)
}
