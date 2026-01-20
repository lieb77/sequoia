/* components/ServiceLog */

import { fixUrls } from "@/lib/utils"
import { fetchServiceLog } from "./getbikes"


export async function ServiceLog({ bike }){

	const slog = []	
	const nodes = await fetchServiceLog(bike)

	nodes.forEach((service: JsonService) => {
		slog.push({
			id: service.id,
			title: service.title,
			date: service.field_date1,
			body: fixUrls(service.body.processed),
			miles: service.field_milage1,
		})
	})

	return(
		<div className="servicelog">
            <h2>Service Log</h2>	
			{slog.map(service =>
				<div key={service.id} className="bike-service">
					<div>
						<h3 className="big">{ service.title }</h3>
						<p>Date: {service.date}</p>
						<p>Miles: {service.miles}</p>
					</div>
					<div dangerouslySetInnerHTML={{ __html: service.body }} />
				</div>
			)}
		</div>
	)
}

