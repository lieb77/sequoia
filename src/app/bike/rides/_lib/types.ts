
export interface Ride {
	id: string
	title:    string
	miles:    number
	date:     string
	bike:     string
	buddies?: string
	body:     string
	link:     string
}


export interface Stats {
  total:   number,
  num:     number,
  longest: number,
  avg:     number,
}

export interface JsonRide{
  id: string,
	title: string,
	field_miles: number,
	field_ridedate: string,
	field_bike: {
	  title: string
	},
	field_buddies: string,
	body: {
	  processed: string
	},
	path: {
	  alias: string
	}
}
