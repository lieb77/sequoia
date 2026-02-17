// /components/Slideshow
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

    useEffect(() => {
        if (isPaused) return

        const timer = setInterval(() => {
            handleNext()
        }, interval)

        return () => clearInterval(timer)
    }, [images, interval, isPaused, currentIndex])

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    if (!images || images.length === 0) return null

    return (
        <div
            className="relative w-full max-w-5xl mx-auto group h-[70vh] rounded-xl overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex} // Crucial: tells Framer this is a "new" element
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={images[currentIndex].url}
                            alt={`Slide ${currentIndex + 1}`}
                            fill
                            sizes="(max-height: 80vh) 100vw, 80vw"
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows - Only visible on hover */}
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <ChevronLeft size={32} />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <ChevronRight size={32} />
            </button>
        </div>
    )
}
/*	
 
      <Image
        key={images[currentIndex].id}
        src={images[currentIndex].url}
        alt={`Slide ${currentIndex + 1}`}
		sizes="(max-height: 80vh) 100vw, 80vw"
        fill // Use fill for better responsive control in a container
        className="object-contain transition-opacity duration-700 ease-in-out"
        priority // Loads the first images faster
      />







	return (
		<div className="slideshow-container">
		  <Image
			src={images[currentIndex].url}
			alt={`Slide ${currentIndex + 1}`}
			key={images[currentIndex].id}
			width={1024}
			height={768}
			sizes="(max-height: 80vh) 100vw, 80vw"
			style={{ objectFit: 'contain' }}
		  />
		</div>
	)
}
*/
