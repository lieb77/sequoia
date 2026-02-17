'use client';

import Link from "next/link"
import { useState, useEffect, useRef } from 'react'
import { Jsona } from 'jsona';
import { fixUrls, formatDate, sanitizeHTML, date2MonthYear, currentMonthYear } from "@/lib/utils"

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

	  useEffect(() => {
	  const handleReset = () => {
		// 1. Scroll to top
		window.scrollTo({ top: 0, behavior: 'smooth' });

		// 2. Reset your state to the first batch only
		// This wipes the "Load More" duplicates
		setNodes(initialNodes)
		setNextLink(initialLinks?.next?.href)
	  };

	  window.addEventListener('resetBlog', handleReset);
	  return () => window.removeEventListener('resetBlog', handleReset);
	}, []);

	const observerTarget = useRef(null);
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				// If the target is visible and we have a nextLink and aren't already loading...
				if (entries[0].isIntersecting && nextLink && !isLoading) {
					handleLoadMore();
				}
			},
			{ threshold: 1.0 } // Trigger only when 100% of the target is visible
			);

			if (observerTarget.current) {
				observer.observe(observerTarget.current);
			}

			return () => {
			if (observerTarget.current) {
				observer.unobserve(observerTarget.current);
			}
		}
	}, [nextLink, isLoading, handleLoadMore]); // Re-run if these dependencies change


  	return (
    	<section className="place-items-center max-w-4xl">
      		<div className="">
				{nodes.map((post, index) => (
					<div key={post.id} className="bg-dark-glass border border-glass-border rounded-glass p-4 m-4 text-white max-w-4xl">
			         {(index === 0 || post.dmy !== nodes[index - 1].dmy) && (post.dmy !== currentMonthYear) && (
					<div className="flex items-center my-8 text-gray-500 text-sm font-semibold uppercase tracking-wider">
                		<span className="whitespace-nowrap pr-4">{post.dmy}</span>
                		<div className="flex-grow border-t border-gray-300"></div>
                	</div>
                	)}
			        <div key={post.id} className="post">
			            <h3>{ post.title }</h3>
						<p>Date: {(post.date)}</p>
						<div className="blogwrapper">
    						<div dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.body) }}
						    />
						</div>
						<p>Tags: {post.tags}</p>
					</div>
					</div>
				))}
      		</div>

     		 <div ref={observerTarget} className="h-20 flex items-center justify-center mt-10">
                {isLoading && (
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                )}
                {!nextLink && nodes.length > 0 && (
                    <p className="text-gray-400 italic text-sm">No more posts to show</p>
                )}
            </div>

    	</section>
	)
}

/*
<Link href={post.url}>Read on my website</Link>
*/
