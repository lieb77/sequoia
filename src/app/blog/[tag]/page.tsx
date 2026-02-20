// /blog/page.tsx
import { fetchBlog, fetchBlogByYear, fetchBlogByPath } from '../_lib/getblog'
import { BlogList } from '../_components/BlogList'
import { BlogSelect } from '../_components/BlogSelect'
import { Suspense } from 'react'


export default async function BlogPage({ params }: Props) {
	const { tag } = await params; 
	
	// Check if the tag is exactly 4 digits (a year)
  	const isYear = /^\d{4}$/.test(tag)
  	const isPath = tag.includes('-')

	let posts
	let links

	if (isYear) {
		const result = await fetchBlogByYear(tag)
		posts = result.posts
		links = result.links
	} else if (isPath) {
		const result = await fetchBlogByPath(tag)
		posts = result.posts
		links = result.links
	} else	{
		let selectedTag 
		if(tag === 'tech') selectedTag = "Technology"
		else if (tag == 'bike') selectedTag = "Bike riding"
		else selectedTag = tag
	
		const result = await fetchBlog(selectedTag)
		posts = result.posts
		links = result.links
		
	}

	const nextUrl = links?.next?.href || null
	
	return (
		<div className="mt-4"> 			
			<Suspense key={tag} fallback={<p className="text-center">Loading {tag} posts...</p>}>
                <BlogList initialNodes={posts} nextUrl={nextUrl}  />    
            </Suspense>
		</div>
	)
}
