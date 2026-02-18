// /blog/page.tsx
import { fetchBlog, fetchTags } from './_lib/getblog'
import { BlogList } from './_components/BlogList'
import { BlogSelect } from './_components/BlogSelect'
import { Suspense } from 'react'

export default async function BlogPage(props: {
    searchParams: Promise<{ category?: string }>
}) {
    const searchParams = await props.searchParams
    const category = searchParams.category || 'All'

    const tags = await fetchTags()

	const {posts, links} = await fetchBlog(category)
	const nextUrl = links?.next?.href || null
	
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
