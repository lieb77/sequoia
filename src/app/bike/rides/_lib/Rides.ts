/**
 * /lib/ride.ts
 *
 * Exports a Rides class
 *
 * Parses the data as it comes from JSON:API
 * and stores it as an array of rides.
 * Also does some tallying and calculations.
 *
 * Public methods provide access to the data
 *
 */
import { client } from "@/lib/api/drupalClient"
import { base, currentYear } from "@/lib/constants"
import { fixUrls } from "@/lib/utils"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"

import type { Ride, Stats, JsonRide } from "./_lib/types.ts"


export class Rides {

	year: string = currentYear
	ridesArray: Ride[] = []

	// Constructor is passes raw data from JSON:API
	constructor(year?: string) {
		this.year = year
	}

	// Return all rides

	public async getRides(): Promise<Ride[]> {
    	const data = await this.fetchRidesByYear()
    
    	// Clear the array before parsing to prevent duplication if called twice
    	this.ridesArray = [] 
    	this.parseData(data)
    
    	// Only reverse the order if it's the current year
    	if (String(this.year) === String(currentYear)) {
  	 		this.sortDesc();
		}
    	    	
    	return this.ridesArray
	}

	
	// Get rides for tour
	public async getRidesForTour(tourId){

		const data = await this.fetchRidesByTour(tourId)
		this.parseData(data)
	
		return this.ridesArray	
	}
	

	// Return yearly stats
	public getYearlyStats() {

		const rides = this.ridesArray

		const monthNames = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];

		// Initialize the 12-month structure
		const initialAcc = monthNames.reduce((obj, month) => {
			obj[month] = { month, total: 0, bikes: {} };
			return obj;
		}, {});

		//  Aggregate the data
		const monthlyData = rides.reduce((acc, ride) => {
			const date = new Date(ride.date);
			const month = date.toLocaleString('default', { month: 'long' });
			const miles = parseInt(ride.miles) || 0;
			const bikeName = ride.bike || 'Unknown';

			if (acc[month]) {
				acc[month].total += miles;
				acc[month].bikes[bikeName] = (acc[month].bikes[bikeName] || 0) + miles;
			}
			return acc;
		}, initialAcc);

		//  Calculate Yearly Stats
		const totalMiles = rides.reduce((sum, r) => sum + (parseInt(r.miles) || 0), 0);

		const stats = {
			totalMiles: totalMiles,
			rideCount: rides.length,
			average: rides.length ? Math.round(totalMiles / rides.length) : 0,
    		longest: Math.max(...rides.map(r => Math.round(r.miles) || 0), 0)
		};

		return {
			tableRows: Object.values(monthlyData), // Returns the Jan-Dec array
			stats,
			uniqueBikes: [...new Set(rides.map(r => r.bike).filter(Boolean))]
		}
	}

	/**
	 * Returns the sum of miles for all rides currently in the array.
	 * Usage: const total = ridesInstance.totalMiles;
	 */
	get totalMiles(): number {
		return this.ridesArray.reduce((sum, ride) => sum + (Number(ride.miles) || 0), 0);
	}
	
	/**
	 * Returns the total count of rides.
	 * Usage: const count = ridesInstance.count;
	 */
	get count(): number {
		return this.ridesArray.length;
	}
	
	/**
	 * Returns the average miles per ride, rounded.
	 */
	get averageMiles(): number {
		if (this.count === 0) return 0;
		return Math.round(this.totalMiles / this.count);
	}


	/* Privare functions -------------------------------- */
	
	private parseData(data){
		data.forEach((ride:JsonRide) =>
		{
			this.ridesArray.push({
				id:	     ride.id,
				title:   ride.title,
				miles:   ride.field_miles,
				date:    ride.field_ridedate,
				bike:    ride.field_bike.title,
				buddies: ride.field_buddies,
				body:    ride.body ? fixUrls(ride.body.processed) : "No notes",
			})
		})
	}

	private sortDesc() : void {
    	this.ridesArray.sort((a, b) => b.date.localeCompare(a.date));
	}
	
	private async fetchRidesByYear(): Promise<Ride[]> {
		const params = new DrupalJsonApiParams()
			.addFields("node--ride", ['title','body','field_miles', 'field_ridedate', 'field_buddies', 'field_bike'])
			.addFilter("field_ridedate",this.year, 'STARTS_WITH' )
			.addSort("field_ridedate", "ASC")
			.addInclude(['field_bike'])

		let allData = [];
		let allIncluded = [];
		let nextUrl = null;

		// Initial fetch for the first 50 nodes
		const firstPage = await client.getResourceCollection("node--ride", {
			params: params.getQueryObject(),
			deserialize: false,
		})

		allData = [...firstPage.data];
		if (firstPage.included) allIncluded = [...firstPage.included];
		nextUrl = firstPage.links?.next?.href;

		// Loop to follow links.next
		while (nextUrl) {
			const response = await fetch(nextUrl);
			const page = await response.json();

			allData = [...allData, ...page.data];
			if (page.included) allIncluded = [...allIncluded, ...page.included];
			nextUrl = page.links?.next?.href;
		}

		// Construct a complete JSON:API document for Jsona
		// Jsona needs a single object with the 'data' and 'included' keys
		const fullDocument = {
			data: allData,
			included: allIncluded
		};

		// 4. Deserialize into clean objects
		return  client.deserialize(fullDocument);
	}
	
	/**
	 * fetchRidesByTour
	 *
	 */
	private async fetchRidesByTour(tourId: string) {
	
		const params = new DrupalJsonApiParams()
			.addFields("node--ride", ['title','body','field_miles', 'field_ridedate', 'field_buddies', 'field_bike'])
			.addFilter("field_tour.id", tourId )
			.addInclude(['field_tour'])
	
		const nodes = await client.getResourceCollection<DrupalNode[]>("node--ride", {params: params.getQueryObject() })
		return(nodes)
	}
	
	
	

}




