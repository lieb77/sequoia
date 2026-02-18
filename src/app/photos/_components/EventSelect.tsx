"use client";
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export function EventSelect({options, current}){
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSelectChange = (change) => {
    const event = change.target.value
    const params = new URLSearchParams(searchParams);
    
    if (event === 'All') {
      params.delete('event')
    } else {
      params.set('event', event)
    }
    
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-2 text-gray-800 font-medium whitespace-nowrap">
      Select Event:
      <select 
        value={current} 
        onChange={handleSelectChange} 
        className="bg-white border border-gray-400 p-1 rounded text-sm focus:ring-2 focus:ring-gray-500 outline-none"
      >
        <option value="All">All Events</option>
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  )
}