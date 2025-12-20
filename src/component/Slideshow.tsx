// /components/Slideshow
"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { PhotoData } from '@/lib/types'

export   const Slideshow = ({ images, interval = 4000 } : {images: PhotoData[]; interval: number}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer); // Clean up the interval on unmount
  }, [images, interval]);

  if (images[currentIndex] === undefined ) return

  return (
    <div className="slideshow-container">
      <Image
        src={images[currentIndex].url}
        alt={`Slide ${currentIndex + 1}`}
        width={1024}
        height={768}
        key={images[currentIndex].id}
      />
    </div>
  )
}
