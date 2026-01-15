// /blog/page.tsx
import { fetchBlog } from "@/lib/getblog"
import { Layout } from '@/component/Layout'
import { BlogLayout } from "@/component/BlogLayout"
import { Blog } from "@/class/Blog"

export const dynamic = 'force-dynamic'

export default async function Page() {

  const data = await fetchBlog()
  const blogObj = new Blog(data)
  const blogData = blogObj.getBlogData()

//  const tags = await fetchTags()


  return (
 	  <Layout>
      <BlogLayout blog={blogData} />
    </Layout>
  )
}
