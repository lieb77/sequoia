// src/app/bikes/page.tsx
import { bikeNames } from "./_lib/constants"
import Link from 'next/link'

export default async function BicyclesPage() {
  return (
    <div className="bg-dark-glass border-glass-border rounded p-4 place-items-center">
     <p>These are my bicycles</p>
    </div>
  )
}
