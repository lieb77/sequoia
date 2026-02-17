"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react'; // Optional: install lucide-react for icons

const primaryLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Bike', href: '/bike' },
  { name: 'Photos', href: '/photos' },
]

const secondaryMenus: Record<string, { name: string; href: string }[]> = {
  '/bike': [
    { name: 'Bicycles', href: '/bike/bicycles' },
    { name: 'Rides', href: '/bike/rides' },
    { name: 'Tours', href: '/bike/tours' },
  ],
  '/photos': [
    { name: 'Gallery', href: '/photos/gallery' },
    { name: 'Slideshow', href: '/photos/slideshow' },
  ],
}

export default function Navbar() {
 	const [isOpen, setIsOpen] = useState(false);
  	const pathname = usePathname();

	// 1. Find the active primary link
  	// We check for an exact match OR if the current path starts with the href + /
  	const activePrimary = primaryLinks.find(link => {
	if (link.href === '/') return pathname === '/';
		return pathname === link.href || pathname.startsWith(`${link.href}/`);
	})

	  // 2. Get the specific secondary menu based on that active primary href
	  // Using activePrimary?.href ensures we use the exact key: '/bike' or '/photos'
	  const secondaryLinks = activePrimary ? secondaryMenus[activePrimary.href] : null;
	  
	const NavLink = ({ href, children }: any) => {
	  // Use exact match for the underline, or check if it's a deep child
  		const isActive = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

    return (
     <Link
      href={href}
      className={`px-3 text-lg font-medium transition-all relative ${
        isActive ? 'text-white' : 'text-gray-300 hover:text-white'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full" />
      )}
    </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] bg-gray-800 text-white shadow-lg">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Primary Menu (Left) */}
          <div className="hidden md:flex space-x-4">
            {primaryLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>{link.name}</NavLink>
            ))}
          </div>

          {/* Secondary Menu (Right) */}
          <div className="hidden md:flex space-x-4">
            {secondaryLinks?.map((link) => (
              <NavLink key={link.href} href={link.href} isSecondary>{link.name}</NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu (Collapsed) */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 px-4 pt-2 pb-4 space-y-1">
          <p className="text-xs font-bold text-gray-500 uppercase px-3 py-2">Main Menu</p>
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block px-3 py-2" onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}
          {secondaryLinks && (
            <>
              <div className="border-t border-gray-700 my-2" />
              <p className="text-xs font-bold text-gray-500 uppercase px-3 py-2">Sub Menu</p>
              {secondaryLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block px-3 py-2" onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </nav>
  );
}
