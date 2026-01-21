// src/app/bikes/page.tsx
import { Layout } from "@/components/Layout"
import { 
	Bikes, 
	Service, 
	bikeNames, 
	BikeNav,
	Bike,
	ServiceLog
 } from "@/features/bike"

export default async function Page(props: {
	searchParams?: Promise<{
    	bike?: string}>;
	}) {

	const searchParams = await props.searchParams
	const bikeName = searchParams?.bike || "Grando"

	// Get the bike
	const bikeClass = new Bikes(bikeName)
	const bikeData = await bikeClass.getBike()

	// Get the service log
	const serviceClass = new Service(bikeName)
	const slog = await serviceClass.getServiceLog()
	
	
	return (
		<Layout>
		  <div className="p-4 place-items-center">
			<h1 className="biggest">Bikes</h1>
			  <BikeNav bikes={bikeNames} />
			  <Bike bike={bikeData} />
			  <ServiceLog slog={slog} />
		  </div>
		</Layout>
	)
}
