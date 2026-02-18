// src/app/bikes/layout.tsx
import Bikenav from '../_components/Bikenav';

export default function BikesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Bikenav />      
      <div className="h-16 w-full" aria-hidden="true" />
      <div className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
}