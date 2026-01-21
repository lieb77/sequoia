'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { PhotoData } from "@/features/photos"

import "@/features/photos/photos.css"
import 'swiper/css'
import 'swiper/css/bundle'


export const ReactSlideshow = ({ images, interval = 4000 } : {images: PhotoData[]; interval: number}) => {

  return (
    <section className='py-12'>
      <div className='container'>
        <Swiper
          autoplay
          navigation
          loop
          pagination={{ type: 'fraction'}}
          modules={[Navigation, Pagination, Autoplay ]}
          onSwiper={swiper => console.log(swiper)}
          className='slideshow'
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className='flex h-full w-full items-center justify-center'>
                <Image
                  src={image.url}
                  alt={image.name}
                  key={image.id}
				  width={800}
				  height={600}
				  loading="eager"
			      sizes="(max-height: 80vh) 100vw, 80vw"
                  className='block h-full w-full object-cover'
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}