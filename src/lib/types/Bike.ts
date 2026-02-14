// src/lib/types/Bike.ts

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
