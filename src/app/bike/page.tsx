// src/app/bike/page.tsx
import { Layout } from '@/components/Layout'
import { getBikePage } from './_lib/getbikepage'

export default async function BikePage() {

	const html = await getBikePage()
	
	return (
		<Layout>      
			<div className="flex flex-col items-center justify-center min-h-screen p-4 ">
			  <div className="bg-dark-glass border border-glass-border rounded-glass p-2 text-white max-w-6xl">
				<div dangerouslySetInnerHTML={{ __html: html }} />
			</div>	
			</div>
		</Layout>
	)
}


