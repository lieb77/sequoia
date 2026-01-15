/* components/ServiceLog */

export function ServiceLogEntry({ log }){

	return(
		<div className="servicelog">
			{log.map(service =>
				<div key={service.id} className="grid grid-cols-2 gap-4 warpme">
					<div>
						<h3 className="big">{ service.title }</h3>
						<p>Date: {service.date}</p>
						<p>Miles: {service.miles}</p>
					</div>
					<div dangerouslySetInnerHTML={{ __html: service.body }} />
				</div>
			)}
		</div>
	);
}
