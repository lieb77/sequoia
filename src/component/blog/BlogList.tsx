'use client';

import Link from "next/link"
import { useState } from 'react';
import { Jsona } from 'jsona';
import { fixUrls, formatDate } from "@/lib/utils"

const dataFormatter = new Jsona();

export function BlogList({ initialNodes, initialLinks }) {
	// Store the nodes and the "next" link in state
	const [nodes, setNodes] = useState(initialNodes);
	const [nextLink, setNextLink] = useState(initialLinks?.next?.href);
	const [isLoading, setIsLoading] = useState(false);

	const handleLoadMore = async () => {
		if (!nextLink || isLoading) return;
	
		setIsLoading(true);
	
		try {
			// 1. Fetch raw JSON from the 'next' URL provided by Drupal
			const response = await fetch(nextLink);
			const json = await response.json();
			
			// 2. Deserialize the full response (to resolve includes/images)
			const newData = dataFormatter.deserialize(json);
			const newNodes = []
    		newData.forEach((node) =>
      			newNodes.push({
					id: node.id,
					title: node.title,
					date: formatDate(node.created),
					url: "https://paulleiberman.org/blog",
					body: fixUrls(node.body.processed),
					tags: node.field_tags[0].name,
      			})
    		)    
			
			// 3. Update state: append new nodes and update the next link
			setNodes((prev) => [...prev, ...newNodes]);
			setNextLink(json.links?.next?.href || null);
		} catch (error) {
			console.error("Failed to load more blog posts:", error);
		} finally {
		  	setIsLoading(false);
		}
	  }

  	return (
    	<section className="blog-wrapper">
      		<div className="blog"> 
				{nodes.map((post) => (
					<div key={post.id} className="post">
						<h3>{ post.title }</h3>
						<p>Date: {(post.date)}</p>
						<div dangerouslySetInnerHTML={{ __html: post.body }}
							className="post-body"
						/>
						<p>Tags: {post.tags}</p>					
					</div>          
				))}
      		</div>

     		 {nextLink && (
        		<button 
          			onClick={handleLoadMore}
          			disabled={isLoading}
          			className="load-more-btn"
        		>
          		{isLoading ? 'Loading...' : 'Load More'}
        		</button>
      		)}
    	</section>
	)
}

/*
<Link href={post.url}>Read on my website</Link> 
*/