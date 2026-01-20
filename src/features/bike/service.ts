/**
 * /lib/service.tsx
 *
 * Exports a Service class
 *
 *
 * Public methods provide access to the data
 *
 */
import { fixUrls } from "@/lib/utils"

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

export class ServiceLog {

	slog: Service[] = []

	// Constructor is passed raw data from JSON:API
	constructor(data: JsonService[]) {

		data.forEach((service: JsonService) => {
			this.slog.push({
				id: service.id,
				title: service.title,
				date: service.field_date1,
				body: fixUrls(service.body.processed),
				miles: service.field_milage1,
			})
		})
	}

	// Return all rides
	public getServiceLog() : Service[] {
		return this.slog
	}

}
