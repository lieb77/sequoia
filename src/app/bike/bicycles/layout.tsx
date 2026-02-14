// src/app/bikes/layout.tsx
import Navbar from './_components/Navbar';

export default function BikesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      
      {/* 1. The Spacer: This matches the Navbar height (h-16) */}
      <div className="h-16 w-full" aria-hidden="true" />

      {/* 2. The Content: Now it naturally sits below the spacer */}
      <main className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}