// /class/Blog.tsx
import { formatDate, fixUrls } from "@/lib/utils"

interface BlogJson {
  id: string,
  title: string,
  created: string,
  path: {
    alias: string,
  },
  body: {
    value: string,
    processed: string,
  }
  field_tags: {
    id: string,
    name: string,
  }
}


export interface BlogData {
  id: string,
  title: string,
  date: string,
  url: string,
  body: string,
  tags: string[],
}

export class Blog {

  blogData: BlogData[] = []

  constructor(data: BlogJson[]){
    data.forEach((post: BlogJson) =>
      this.blogData.push({
        id: post.id,
        title: post.title,
        date: formatDate(post.created),
        url: "https://paulleiberman.org/blog",
        body: fixUrls(post.body.processed),
        tags: post.field_tags.name,
      })
    )
  }

  public getBlogData(){

    return this.blogData
  }

// end of class
}
