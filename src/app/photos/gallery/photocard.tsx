'use client'
import React, { useState } from 'react'
import  { formatDate }  from '@/lib/utils'

export const PhotoCard = ({ data }) => {
    const [showMap, setShowMap] = useState(false)
    const canShowMap = data.lat !== null && data.lng !== null

    let mapUrl = null

    if (canShowMap){
      const params = new URLSearchParams({
          style: 'osm-bright',
          width: '600',
          height: '400',
          center: `lonlat:${data.lng},${data.lat}`,
          zoom: '8',
          marker: `lonlat:${data.lng},${data.lat};color:#ff0000;size:medium`,
          apiKey: 'afb07405abd846fc93dd0767b28f18d3'
      })
  
      mapUrl = `https://maps.geoapify.com/v1/staticmap?${params.toString()}`
    }

    return (
        <div className="group relative w-full mb-6">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-black rounded-lg shadow-md">
                
                {/* 1. Background Blur Glow */}
                {data.uri && ( 
                    <div
                        className="absolute -inset-4 bg-cover bg-center blur-2xl opacity-40 z-0"
                        style={{ backgroundImage: `url(${data.uri})` }}
                    ></div>
                )}

                {/* 2. Main Image */}
                <div className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-300 ${showMap ? 'blur-md brightness-50' : 'brightness-100'}`}>
                    <img
                        src={data.uri || ''}
                        alt={data.alt || 'Photo'}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>

                {/* 3. The Toggle Button - Increased z-index and explicit cursor */}
              {canShowMap && (
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        setShowMap(!showMap)
                    }}
                    type="button"
                    aria-label="Toggle map"
                    className={`absolute top-3 right-3 z-50 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-xl transition-all hover:scale-110 active:scale-95 ${showMap ? 'bg-yellow-400' : 'bg-white'}`}
                >
                    <span className="text-xl pointer-events-none">📍</span>
                </button>
              )}

                {/* 4. The Map Overlay - Using conditional rendering for stability */}
                {showMap && (
                    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/20 animate-in fade-in zoom-in duration-200">
                        <div className="text-center text-white w-full">
                            <img
                                src={mapUrl}
                                alt="Location map"
                                className="max-w-[85%] mx-auto border-2 border-white rounded shadow-2xl mb-2"
                            />
                            <div className="space-y-1">
                                <p className="text-sm font-small drop-shadow-md px-4">{data.loc || "Unknown Location"}</p>
                                <p className="text-sm font-small drop-shadow-md ">{formatDate(data.tak)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

