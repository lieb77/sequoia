// src/app/bikes/_components/Navbar.tsx
"use client"; // Required to use usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { bikeNames } from '../_lib/constants';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-slate-900 text-white z-50 flex items-center px-6 shadow-md">
      <div className="font-bold text-xl mr-8 border-r border-slate-700 pr-8">
       <Link href="/" className="hover:text-blue-400 transition-colors">
          Home
        </Link>
     </div>
      <div className="font-bold text-xl mr-8 border-r border-slate-700 pr-8">        
        <Link href="/bike/bicycles" className="hover:text-blue-400 transition-colors">
          Bicycles
        </Link>
      </div>

      <ul className="flex gap-6 overflow-x-auto no-scrollbar py-2">
        {bikeNames.map((name) => {
          const href = `/bike/bicycles/${name}`;
          // Decode the pathname to handle spaces (%20) correctly
          const isActive = decodeURIComponent(pathname) === href;

          return (
            <li key={name} className="whitespace-nowrap">
              <Link 
                href={href} 
                className={`text-sm font-medium transition-colors ${
                  isActive 
                    ? "text-blue-400 border-b-2 border-blue-400" 
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}