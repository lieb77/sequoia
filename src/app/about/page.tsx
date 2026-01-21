
import { Layout } from '@/components/Layout'
import { fetchAboutPage, About } from '@/features/about'

export default async function Page() {

	const data = await fetchAboutPage()
	
	return (
		<Layout>      
			<About data={data} />
		</Layout>
	)
}


