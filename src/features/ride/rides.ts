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
import { base, client } from "@/lib/api"
import { fixUrls } from "@/lib/utils"
import { currentYear } from '@/lib/utils'
import { DrupalJsonApiParams } from "drupal-jsonapi-params"

import {  Ride, Stats, JsonRide } from "../types.ts"


export class Rides {

	ridesArray: Ride[] = []
	year: string 
	
	// Constructor is passes raw data from JSON:API
	constructor(year: string) {
		this.year = year
	}
	
	// Return all rides
	public async  getRides() : Ride[] {

		const data = await this.fetchRidesByYear(this.year)

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
		if (this.year == currentYear ){
			this.sortDesc
		}
		else {
			this.sortAsc}
	
		return this.ridesArray
	}
	
	// Return yearly stats
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
	
	/* Privare functions -------------------------------- */

	private sortAsc() : void {
		this.ridesArray.sort((a, b) => {
		  return new Date(a.date).getTime() - new Date(b.date).getTime();
		});
	}

	private sortDesc() : void {
		this.ridesArray.sort((a, b) => {
		  return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
	}

	
	private async fetchRidesByYear(year): Promise<Ride[]> {
		const params = new DrupalJsonApiParams()
			.addFields("node--ride", ['title','body','field_miles', 'field_ridedate', 'field_buddies', 'field_bike'])
			.addFilter("field_ridedate",year, 'STARTS_WITH' )
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

}

	
	
	
