// src/app/bikes/[name]/page.tsx
import { getBikeByName } from "../_lib/getbikes"
import { transformBike } from "../_lib/transformBike"
import { Bike } from "./Bike.tsx"

	export default async function BikePage({ params }: { params: Promise<{ name: string }> }) {
	const { name } = await params;
	
	// Decodes "Soma%20Saga" back to "Soma Saga"
	const decodedName = decodeURIComponent(name); 
		
	const bike = await getBikeByName(decodedName);
	if (!bike) return <div>Bike not found</div>;
	
	// map the fields to simple array keys
	const bikeData =transformBike(bike)  
	
	return (
		  <div className="p-4 place-items-center">			
			  <Bike bike={bikeData} />
		  </div>
	)
}
