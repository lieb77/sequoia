// /blog/page.tsx
import { fetchBlog } from './_lib/getblog'
import { BlogList } from './BlogList'

export default async function BlogPage() {

	const {posts, links} = await fetchBlog()

	return (
		<BlogList initialNodes={posts} initialLinks={links} />
	)
}
