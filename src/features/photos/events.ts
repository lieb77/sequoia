/**
 * /class/Events.tsx
 *
 *  For family event taxonomy
 *
 */


export interface Event {
	id:    string
	name:  string
}


export class Events {

	eventsArray: Event[] = []

	// Constructor is passes raw data from JSON:API
	constructor(data: Event[]) {

		data.forEach((event: Event) => {
			this.eventsArray.push({
				id: event.id,
				name: event.name,
			})
		})
	}

	// Return all rides
	public getEvents() : Event[] {
		return this.eventsArray
	}

}
