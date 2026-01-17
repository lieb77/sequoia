// src/app/bikes/page.tsx
import { Bikes, bikeNames } from "@/component/bike/bikes"
import { BikeNav } from "@/component/bike/nav"
import { Layout } from "@/component/Layout"

export default async function Page(props: {
	searchParams?: Promise<{
    	bike?: string}>;
	}) {

	const searchParams = await props.searchParams
	const bike = searchParams?.bike || "Grando"
	
	
	return (
		<Layout>
		  <div className="p-4 place-items-center">
			<h1 className="biggest">Bikes</h1>
			  <BikeNav bikes={bikeNames} />
			  <Bikes thisBike={bike} />
		  </div>
		</Layout>
	)
}
