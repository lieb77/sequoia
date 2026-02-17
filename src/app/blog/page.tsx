// /blog/page.tsx
import { fetchBlog } from './_lib/getblog'
import { BlogList } from './BlogList'
import { Layout } from '@/components/Layout'

export default async function BlogPage() {

	const {posts, links} = await fetchBlog()

	return (
		<Layout>
			<BlogList initialNodes={posts} initialLinks={links} />
		</Layout>
	)
}
