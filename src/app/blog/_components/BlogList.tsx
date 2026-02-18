'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Jsona } from 'jsona'
import { fixUrls, formatDate, sanitizeHTML, currentMonthYear } from '@/lib/utils'

const dataFormatter = new Jsona()

export function BlogList({ initialNodes, nextUrl }) {
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
                tags: node.field_tags?.[0]?.name || 'Uncategorized',
                dmy: node.field_ridedate ? node.field_ridedate : ''
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
        <section className="flex flex-col items-center w-full">
            <div className="w-full max-w-4xl">
                {nodes.map((post, index) => (
                    <div key={post.id}>
                        {/* Month/Year Divider Logic */}
                        {(index === 0 || post.dmy !== nodes[index - 1].dmy) &&
                            post.dmy &&
                            post.dmy !== currentMonthYear && (
                                <div className="flex items-center my-8 text-slate-200 text-sm font-semibold uppercase tracking-wider">
                                    <span className="whitespace-nowrap pr-4">{post.dmy}</span>
                                    <div className="flex-grow border-t border-gray-700"></div>
                                </div>
                            )}

                        <div className="bg-dark-glass border border-glass-border rounded-lg p-6 m-4 text-white shadow-xl">
                            <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                            <p className="text-gray-400 text-sm mb-4">Posted on: {post.date}</p>
                            <div className="blogwrapper prose prose-invert max-w-none mb-4">
                                <div
                                    dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.body) }}
                                />
                            </div>
                            <div className="pt-4 border-t border-gray-700">
                                <span className="text-xs bg-slate-900/50 px-2 py-1 rounded text-slate-200">
                                    Tag: {post.tags}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Intersection Target / Loading Spinner */}
            <div ref={observerTarget} className="h-32 flex items-center justify-center w-full">
                {isLoading && (
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                )}
                {!nextLink && nodes.length > 0 && (
                    <p className="text-gray-500 italic text-sm">
                        You've reached the end of the road.
                    </p>
                )}
            </div>
        </section>
    )
}
