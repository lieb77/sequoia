/* component/StatsLayout */

import styles from './ride.module.css';

export function StatsLayout({stats}) {
	return(
    <div className="warpme">
      Number of rides: {stats.num}<br />
      Total miles: {stats.total}<br />
      Longest ride: {stats.longest}<br />
      Average: {stats.avg}
    </div>
	)
}
