"use client";
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export function BlogSelect({options, current}){
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSelectChange = (event) => {
    const category = event.target.value
    const params = new URLSearchParams(searchParams);
    
    params.set('category', category)
      
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-2 text-gray-800 font-medium whitespace-nowrap">
      Select Category:
      <select 
        value={current} 
        onChange={handleSelectChange} 
        className="bg-white border border-gray-400 p-1 rounded text-sm focus:ring-2 focus:ring-gray-500 outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}