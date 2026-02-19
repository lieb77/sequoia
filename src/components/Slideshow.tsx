'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { PhotoData } from '@/app/photos/_lib/types'

export const Slideshow = ({
    images,
    interval = 4000
}: {
    images: PhotoData[]
    interval?: number
}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [direction, setDirection] = useState(0) // 1 for right, -1 for left

    // Handle automated transitions
    useEffect(() => {
        if (isPaused) return
        const timer = setInterval(() => {
            paginate(1)
        }, interval)
        return () => clearInterval(timer)
    }, [isPaused, currentIndex, interval])

    const paginate = (newDirection: number) => {
        setDirection(newDirection)
        setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length)
    }

    // Framer Motion Variants for the slide animation
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        })
    }

    if (!images || images.length === 0) return null

    return (
        <div
            className="relative w-full max-w-5xl mx-auto group h-[70vh] rounded-xl overflow-hidden bg-transparent"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    // --- TOUCH / DRAG LOGIC ---
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = offset.x
                        const swipeThreshold = 50 // px to trigger change
                        if (swipe < -swipeThreshold) {
                            paginate(1)
                        } else if (swipe > swipeThreshold) {
                            paginate(-1)
                        }
                    }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
                >
                    <Image
                        src={images[currentIndex].url}
                        alt={`Slide ${currentIndex + 1}`}
                        fill
                        sizes="(max-height: 70vh) 100vw, 90vw"
                        className="object-contain pointer-events-none rounded-xl" // prevent img drag
                        priority
                    />
                    
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                onClick={() => paginate(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-white/40 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
            >
                <ChevronLeft size={32} className="text-white" />
            </button>

            <button
                onClick={() => paginate(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-white/40 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
            >
                <ChevronRight size={32} className="text-white" />
            </button>
            
           
        </div>
    )
}
