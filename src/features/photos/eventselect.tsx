"use client";
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export function EventSelect({options, current}){
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

 const handleSelectChange = (change) => {
   const event = change.target.value

    const params = new URLSearchParams(searchParams);
    params.set('event', event)
    replace(`${pathname}?${params.toString()}`);
  }

 return(
    <div className="m-2 p-2 text-blue-600 eventss-nav ">
      Select Event:
      <select value={current} onChange={handleSelectChange} className="border p-2 rounded">
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
