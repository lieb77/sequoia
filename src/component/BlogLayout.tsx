/* components/BlogLayout */
import Link from "next/link"


export function BlogLayout({ blog }){

	return(
		<div className="blog">
			{blog.map(post =>
				<div key={post.id} className="post">
					<h3>{ post.title }</h3>
					<p>Date: {post.date}</p>
					<div dangerouslySetInnerHTML={{ __html: post.body }} />
				    <Link href={post.url}>Read on my website</Link> 
				</div>
			)}
		</div>
	);
}
