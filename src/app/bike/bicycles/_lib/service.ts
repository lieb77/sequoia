/**
 * /lib/service.tsx
 *
 * Exports a Service class
 *
 *
 * Public methods provide access to the data
 *
 */
import { client } from "@/lib/api"
import { fixUrls } from "@/lib/utils"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { DrupalNode } from "next-drupal"
import type { Service, JsonService } from "./types"


export class Service {

	bike: string = "Grando"

	// Constructor 
	constructor(bikeName) {
		this.bike = bikeName
	}

    /*
     * Return structured data
     *
     */
	public async getServiceLog() : Service[] {
		const slog: Service[] = []

		const nodes = await this.fetchServiceLog()

		nodes.forEach((service: JsonService) => {
			slog.push({
				id: service.id,
				title: service.title,
				date: service.field_date1,
				body: fixUrls(service.body.processed),
				miles: service.field_milage1,
			})
		})
		return slog
	}


	/*
	 * fetch Service Log
	 *
	 */
	 private async fetchServiceLog(): Promise<JsonService> {
	
		const params = new DrupalJsonApiParams()
			.addFields("node--service", ['title', 'body', 'field_bike', 'field_milage1', 'field_date1'])
			.addSort('created', 'DESC')
			.addInclude('field_bike')
			.addFilter('field_bike.title', this.bike)
	
	
		const nodes = await client.getResourceCollection<DrupalNode[]>("node--service", {params: params.getQueryObject() })
		return nodes
	}

}
