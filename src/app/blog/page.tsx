// /blog/page.tsx
import { fetchBlog,  BlogList } from "@/features/blog"
import { Layout } from '@/components/Layout'

export const dynamic = 'force-dynamic'

export default async function Page() {

	const {posts, links} = await fetchBlog()

	return (
		<Layout>
			<BlogList initialNodes={posts} initialLinks={links} />			
		</Layout>
	)
}
