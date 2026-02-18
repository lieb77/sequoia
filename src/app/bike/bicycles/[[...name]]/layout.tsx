// src/app/bikes/layout.tsx
import Bikenav from '../_components/Bikenav';

export default function BikesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mt-4 min-h-screen flex flex-col">
      <Bikenav />      
      
      <div className="flex-1 px-6  max-w-5xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
}

/* <div className="h-16 w-full" aria-hidden="true" /> */