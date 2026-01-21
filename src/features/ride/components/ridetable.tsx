/* components/RideTable */

import styles from '../styles/ridelist.module.css';


function TableRow({ ride }: JSX.Element ) {
  return (
    <tr key={ride.id}>
    	<td>{ride.date}</td>
    	<td className={styles.rideColumn}>{ride.title}</td>
    	<td>{ride.bike}</td>
    	<td>{ride.miles}</td>
    </tr>
  );
}

function TableFoot({ rides }: JSX.Element ){
	let total = 0
	rides.map(ride =>
		{ total += ride.miles }
	)
	return (
		<tfoot>
			<tr>
				<th className={styles.rideColRight} colSpan="3">Total</th>
				<td>{total}</td>
			</tr>
		</tfoot>
	);
}

export function RideTable({ rides }: JSX.Element ){
	return(
		<table className={styles.rideTable warpme}>
			<thead>
				<tr><th>Date</th><th className={styles.rideColumn}>Route</th><th>Bike</th><th>Miles</th></tr>
			</thead>
			<tbody>
				{rides.map(ride =>
					<TableRow key={ride.id} ride={ride} />
				)}
			</tbody>
			<TableFoot rides={rides} />
		</table>
	);
}
