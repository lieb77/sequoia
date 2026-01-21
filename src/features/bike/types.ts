

export interface Bike {
	id:    string,
	name:  string,
	make:  string,
	model: string,
	from:  string,
	year:  string,
	body:  string,
	urls:  string[]
}

export interface JsonBike {
  id: string,
	title: string,
	field_make: string,
	field_model: string,
	field_purchased_from: string,
	field_year: string,
	body:{
	  processed: string
  },
  field_bicycle_picture: [
    {thumbnail: {
      uri: {
      url: string[]
    }}}
  ]
}

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
