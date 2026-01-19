/**
 * Fetch all rides for given year
 *
 */ 
import { client } from "@/lib/api"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"

export async function fetchRidesByYear(year): Promise<Ride[]> {
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
    return client.deserialize(fullDocument);
}

