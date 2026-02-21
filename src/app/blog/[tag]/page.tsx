// /blog/page.tsx
import { fetchBlogByTag, fetchBlogByYear, fetchBlogById, fetchTags } from '../_lib/getblog'
import { BlogList } from '../_components/BlogList'
import { BlogSelect } from '../_components/BlogSelect'
import { Suspense } from 'react'


export default async function BlogPage({ params }: Props) {
	const { tag } = await params; 
	
	// Check if the tag is exactly 4 digits (a year)
  	const isYear = /^\d{4}$/.test(tag)
  	const isPath = tag.includes('--')

	let posts
	let links
	let selectedTag = tag
	
	if (isYear) {
		const result = await fetchBlogByYear(tag)
		posts = result.posts
		links = result.links
		selectedTag = "All"
	} 
	else if (isPath) {
    	const uuid = tag.split('--').pop(); // Grabs the ID after the last "--"    

		const result = await fetchBlogById(uuid)
		posts = result.posts
		links = result.links
		selectedTag = "All"
    } 
    else {	
		if(tag === 'tech') selectedTag = "Technology"
		else if (tag == 'bike') selectedTag = "Bike riding"
		else if (tag == 'ride') selectedTag = "Bike riding"
		else if (tag.startsWith('Bike')) selectedTag = "Bike riding"

		else selectedTag = tag
	
		const result = await fetchBlogByTag(selectedTag)
		posts = result.posts
		links = result.links
	}

	const category = selectedTag 

	const nextUrl = links?.next?.href || null
	
	const tags = await fetchTags()	
	
	return (
		<div className="mt-4"> 
			<div className="items-baseline justify-center gap-4 p-2 mb-4 bg-gray-100 rounded-lg w-fit mx-auto border border-gray-800">
				<BlogSelect options={tags} current={category} />
			</div>
			<Suspense key={category} fallback={<p className="text-center">Loading {category} posts...</p>}>
                <BlogList initialNodes={posts} nextUrl={nextUrl}  />    
            </Suspense>
		</div>
	)
}
