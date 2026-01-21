/* component/RideLayout */

import styles from '../styles/ridelist.module.css';

export function RideList({ rides }: JSX.Element){
	return(
	  <div className={styles.rideContainer}>
	    {rides.map(ride =>
        <div key={ride.id} className={styles.rideItem}>
          <h2>
            <a href={ride.link}>
              {ride.title}
            </a>
          </h2>
          <p>Date: {ride.date}</p>
          <p>Miles: {ride.miles}</p>
          <p>Bike: {ride.bike}</p>
          <p>Buddies: {ride.buddies}</p>
          <div className={styles.rideBody}>
          	<div dangerouslySetInnerHTML={{ __html: ride.body}} />
          </div>
        </div>
      )}
		</div>
	)
}

