/* components/RideTable */

import styles from './ride.module.css';

function TableRow({ ride }: JSX.Element ) {
  return (
    <tr key={ride.id}>
    	<td>{ride.date}</td>
    	<td className="ride-column">{ride.title}</td>
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
				<th className="ride-col-right" colSpan="3">Total</th>
				<td>{total}</td>
			</tr>
		</tfoot>
	);
}

export function RideTable({ rides }: JSX.Element ){
	return(
		<table className="ride-table warpme">
			<thead>
				<tr><th>Date</th><th className="ride-column">Route</th><th>Bike</th><th>Miles</th></tr>
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
