/**
 * /lib/ride.ts
 *
 * Exports a Rides class
 *
 * The constructor parses the data as it comes from JSON:API
 * and stores it as an array of rides.
 * Also does some tallying and calculations.
 *
 * Public methods provide access to the data
 *
 */
import { base } from "@/lib/api"
import { fixUrls } from "@/lib/utils"

interface Ride {
	id: string
	title:    string
	miles:    number
	date:     string
	bike:     string
	buddies?: string
	body:     string
	link:     string
}


interface Stats {
  total:   number,
  num:     number,
  longest: number,
  avg:     number,
}

interface JsonRide{
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

export class Rides {

	ridesArray: Ride[] = []
	totalMiles = 0
	numRides = 0
	longest = 0
	avgMiles = 0
	
	// Constructor is passes raw data from JSON:API
	constructor(data: JsonRide[]) {

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
			this.totalMiles += ride.field_miles
			this.numRides++
			if (ride.field_miles > this.longest)
			  this.longest = ride.field_miles
		})
		this.avgMiles = Math.round(this.totalMiles / this.numRides)
		
	}
	
	public getYearlyStats() {
	
		const rides = this.ridesArray
		
		const monthNames = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
		
		// 1. Initialize the 12-month structure
		const initialAcc = monthNames.reduce((obj, month) => {
			obj[month] = { month, total: 0, bikes: {} };
			return obj;
		}, {});
		
		// 2. Aggregate the data
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
		
		// 3. Calculate Yearly Stats
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
		};
	}

	public sortAsc() : void {
		this.ridesArray.sort((a, b) => {
		  return new Date(a.date).getTime() - new Date(b.date).getTime();
		});
	}

	public sortDesc() : void {
		this.ridesArray.sort((a, b) => {
		  return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
	}

	// Return all rides
	public getRides() : Ride[] {
		return this.ridesArray
	}

	// Return the totals
	public getStats() : Stats {

		return ({
			total:   this.totalMiles,
			num:     this.numRides,
			longest: this.longest,
			avg:     this.avgMiles,
		})

	}




	
}	
	













/*
 * Stats not yet implemented in this version

	// Tally up miles per bike
	public getStatsByBike() : [] {
		const rides = []
		this.ridesArray.forEach(ride =>
			ride.bike in rides
			?	rides[ride.bike] += ride.miles
			: rides[ride.bike] = ride.miles
		)

		const byBikeArray: Bike[] = []

		for (const key in rides) {
			byBikeArray.push({
				bike: key,
				miles: rides[key],
			})
		}
		return byBikeArray
	}



*/
