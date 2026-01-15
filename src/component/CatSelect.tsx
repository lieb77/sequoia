"use client";
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export function CatSelect({options, current}){
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

 const handleSelectChange = (event) => {
   const category = event.target.value

    const params = new URLSearchParams(searchParams);
    params.set('category', category)
    replace(`${pathname}?${params.toString()}`);
  }

 return(
    <div className="m-2 p-2 text-blue-600 photos-nav">
      Select Category:
      <select value={current} onChange={handleSelectChange} className="border p-2 rounded">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
