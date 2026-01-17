/* components/ServiceLog */

import { fixUrls } from "@/lib/utils"
import { fetchServiceLog } from "./getbikes"

export interface Service {
	id:    string
	title:  string
	date: string
	body:  string
	miles: number
}

export interface JsonService {
  id: string,
	title: string,
	field_date1: string,
	body: {
	  processed: string
  },
	field_milage: number,
	
}

export async function ServiceLog({ bike }){

	const slog = []
	

	const nodes = await fetchServiceLog(bike)
	console.log(nodes)


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
	
			{slog.map(service =>
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
	)
}

