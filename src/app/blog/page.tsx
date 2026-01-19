// /blog/page.tsx
import { fetchBlog } from "@/component/blog/getblog"
import { Layout } from '@/component/Layout'
import { BlogList } from "@/component/blog/BlogList"

export const dynamic = 'force-dynamic'

export default async function Page() {

	const {posts, links} = await fetchBlog()

	return (
		<Layout>
			<BlogList initialNodes={posts} initialLinks={links} />			
		</Layout>
	)
}
