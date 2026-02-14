/* components/ServiceLog */

import { Service } from "../service"

import styles from '../styles/servicelog.module.css';

export async function ServiceLog({ slog }){
	
	return(
		<div className={styles.serviceLog}>
            <h2>Service Log</h2>	
			{slog.map(service =>
				<div key={service.id} className={styles.bikeService}>
					<div>
						<h3 className={styles.serviceTitle}>{ service.title }</h3>
						<p>Date: {service.date}</p>
						<p>Miles: {service.miles}</p>
					</div>
					<div className={styles.serviceBody}>
						<div dangerouslySetInnerHTML={{ __html: service.body }} />
					</div>
				</div>	
			)}
		</div>
	)
}

