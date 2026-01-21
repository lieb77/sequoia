
import styles from '../styles/yearly.module.css';


export function YearlyReport({ data }) {
  // Use our helper function
  const { tableRows, stats, uniqueBikes } = data;

  return (
    <div className={styles.statsContainer}>
      <header className={styles.summaryGrid}>
       	<table className={styles.summaryTable}>
			<tbody>
          		<tr>
          			<th>Total miles</th>
          			<td>{stats.totalMiles}</td>
          		</tr>
          		<tr>
          			<th>Number of rides</th>
          			<td>{stats.rideCount}</td>
          		</tr>
          		<tr>
          			<th>Average miles</th>
          			<td>{stats.average}</td>
          		</tr>
          		<tr>
          			<th>Longest ride</th>
          			<td>{stats.longest}</td>
          		</tr>
          	</tbody>
      	</table>
      </header>

      <table className={styles.statsTable}>
        <thead>
          <tr>
            <th>Month</th>
            {uniqueBikes.map(bike => <th key={bike}>{bike}</th>)}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map(row => (
            <tr key={row.month}>
              <td>{row.month}</td>
              {uniqueBikes.map(bike => (
                <td key={bike}>{ row.bikes[bike] || 0}</td>
              ))}
              <td className={styles.statsBold}>{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}