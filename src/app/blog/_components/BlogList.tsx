'use client'
import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Jsona } from 'jsona'
import { AiOutlineLink } from 'react-icons/ai'
import { PermalinkButton } from '../_components/PermalinkButton'
import { fixUrls, formatDate, sanitizeHTML, currentMonthYear } from '@/lib/utils'
import styles from '../_styles/blog.module.css'


const dataFormatter = new Jsona()

export function BlogList({ initialNodes, nextUrl }: JSX.Element)  {
    const [nodes, setNodes] = useState(initialNodes)
    const [nextLink, setNextLink] = useState(nextUrl)
    const [isLoading, setIsLoading] = useState(false)
    const observerTarget = useRef(null)

    useEffect(() => {
        setNodes(initialNodes)
        setNextLink(nextUrl)
    }, [initialNodes, nextUrl])

    // 1. Updated handleLoadMore
    const handleLoadMore = useCallback(async () => {
        // Double check we have a valid link before fetching
        if (!nextLink) return

        setIsLoading(true)
        try {
            const response = await fetch(nextLink)
            if (!response.ok) throw new Error('Network response was not ok')

            const json = await response.json()
            const newData = dataFormatter.deserialize(json) as any[]

            const newNodes = newData.map((node) => ({
                id: node.id,
                title: node.title,
                date: formatDate(node.created),
                url: 'https://paulleiberman.org/blog',
                body: fixUrls(node.body.processed),
				tags: node.field_tags.map((tag: any) => ({ name: tag.name, id: tag.id })),
                dmy: node.field_ridedate ? node.field_ridedate : '',
                path: node.path.alias
            }))

            setNodes((prev) => [...prev, ...newNodes])

            // Only set nextLink if it actually exists in the response
            const next = json.links?.next?.href
            setNextLink(next || null)
        } catch (error) {
            setNextLink(null) // Stop trying to fetch if it fails
        } finally {
            setIsLoading(false)
        }
    }, [nextLink]) // Remove isLoading from here to prevent unnecessary re-creations

    // 2. Updated Observer
    useEffect(() => {
        const currentTarget = observerTarget.current

        // Heartbeat log: Does the observer see the target and the link?
        console.log('Observer Sync:', {
            hasTarget: !!currentTarget,
            nextLink: nextLink ? 'Found' : 'Missing',
            isLoading
        })

        if (!currentTarget || !nextLink || isLoading) return

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0]
                if (first.isIntersecting) {
                    handleLoadMore()
                }
            },
            {
                threshold: 0, // Trigger as soon as even 1 pixel is visible
                rootMargin: '100px' // Fetch before the user even gets there
            }
        )

        observer.observe(currentTarget)

        return () => {
            if (currentTarget) observer.unobserve(currentTarget)
        }
    }, [handleLoadMore, nextLink, isLoading])


    return (
        <section className={styles.blogcontainer}>
            <div className={styles.bloginner}>
                {nodes.map((post, index) => (
                    <div key={post.id}>
                        {/* Month/Year Divider Logic */}
                        {(index === 0 || post.dmy !== nodes[index - 1].dmy) &&
                            post.dmy &&
                            post.dmy !== currentMonthYear && (
                                <div className={styles.blogdmyouter}>
                                    <span className={styles.blogdmy}>{post.dmy}</span>
                                    <div className={styles.blogdmyborder}></div>
                                </div>
                            )}

                        <div className={styles.blogpost}>
                            <h3 className={styles.blogposttitle}>{post.title}</h3>
                            <p className={styles.blogposted}>Posted on: {post.date}</p>
                            <div className={styles.blogwrapper}>
                                <div
                                    dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.body) }}
                                />                               
                            </div>
                         
                         <div className={styles.postFooter}>
							  {/* Tags Section */}
							  <div className={styles.tagGroup}>
								<span className={styles.tagLabel}>
								  Tags:
								</span>
								{post.tags.map((tag) => (
								  <Link 
									key={tag.name} 
									href={`/blog/${tag.name.replace(/\s+/g, '-')}`}
									className={styles.tagPill}
								  >
									{tag.name}
								  </Link>
								))}
							  </div>
							
							  {/* Permalink Section */}
							<PermalinkButton url={`/blog/${post.path.replace('/blog/', '')}--${post.id}`} />
							
							</div>
                         				
                        </div>
                    </div>
                ))}
            </div>

            {/* Intersection Target / Loading Spinner */}
            <div ref={observerTarget} className={styles.observeroute}>
                {isLoading && (
                    <div className={styles.observerinner}>
                        <div className={styles.bouncer}></div>
                        <div className={styles.bouncer}></div>
                        <div className={styles.bouncer}></div>
                    </div>
                )}
                {!nextLink && nodes.length > 0 && (
                    <p className={styles.theend}>
                        You've reached the end of the road.
                    </p>
                )}
            </div>
        </section>
    )
}
