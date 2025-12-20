// /lib/types.tsx

export interface Ride {
	id:       string
	title:    string
	miles:    number
	date:     string
	bike:     string
	buddies?: string
	body:     string
	link:     string
}

export interface Service {
	id:    string
	title:  string
	date: string
	body:  string
	miles: number
}


export interface Bike {
	id:    string
	name:  string
	make:  string
	model: string
	from:  string
	year:  string
	body:  string
	url:   string
}

export interface Article {
	id:    string
	title:  string
	date: string
	body:  string
}
