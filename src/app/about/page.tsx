
import { fetchAboutPage } from './_lib/getabout'
import { About } from './About'

export default async function AboutPage() {

	const data = await fetchAboutPage()
	
	return (
		<About data={data} />
	)
}


