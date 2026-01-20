/* component/RideLayout */

export function RidesLayout({ rides }: JSX.Element){
	return(
	  <div id="ridediv">
	    {rides.map(ride =>
        <div key={ride.id} className="rounded-lg wider warpme">
          <h2 className="bigger">
            <a href={ride.link}>
              {ride.title}
            </a>
          </h2>
          <p>Date: {ride.date}</p>
          <p>Miles: {ride.miles}</p>
          <p>Bike: {ride.bike}</p>
          <p>Buddies: {ride.buddies}</p>
          <div className='epost' dangerouslySetInnerHTML={{ __html: ride.body}} />
        </div>
      )}
		</div>
	)
}

