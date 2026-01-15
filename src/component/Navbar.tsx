// components/Navbar.tsx
"use client"

import { useState } from 'react';
import Link from 'next/link';

export function Navbar()  {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">Lieb&apos;s Log</Link>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
              ) : (
                <path fillRule="evenodd" clipRule="evenodd" d="M3 6H21V8H3V6ZM3 12H21V14H3V12ZM3 18H21V20H3V18Z" />
              )}
            </svg>
          </button>
        </div>
        <div className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} lg:block space-x-4`}>
          <Link href="/about" className="block lg:inline-block">About</Link>
          <Link href="/bikes" className="block lg:inline-block">Bikes</Link>
          <Link href="/rides" className="block lg:inline-block">Rides</Link>
          <Link href="/tours" className="block lg:inline-block">Tours</Link>
          <Link href="/pictures"  className="block lg:inline-block">Pictures</Link>
          <Link href="/blog"  className="block lg:inline-block">Blog</Link>
        </div>
      </div>
    </nav>
  )
}

