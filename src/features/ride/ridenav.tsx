// /lib/ridenav.tsx

'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import { currentYear, minYear } from '@/lib/utils'

export function RideNav() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

 	const year: number = searchParams.get('year') || currentYear

  function setPrev() {
    const params = new URLSearchParams(searchParams)

    if (year && year > minYear ) {
      params.set('year', year - 1)
    } else {
      params.delete('year')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  function setNext() {
    const params = new URLSearchParams(searchParams)

    if (year && year < currentYear) {
    	const nextYear: number = parseInt(year, 10) + 1
    	
      params.set('year', nextYear)
    } else {
      params.delete('year')
    }
    replace(`${pathname}?${params.toString()}`)
  }

   function goToYear(data) {
   	const goYear = data.get('year')
    const params = new URLSearchParams(searchParams)
    if (goYear > minYear && goYear <= currentYear) {
      params.set('year', goYear)
    } else {
      params.set('year', year)
    }
    replace(`${pathname}?${params.toString()}`)
  }

  function setView(view) {
    const params = new URLSearchParams(searchParams)
    params.set('view', view)
    replace(`${pathname}?${params.toString()}`)
  }

  return(
  	<div className="nav-buttons bg-gray-100">
	  	<button onClick={() => setPrev()}
	  		className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded transition-colors duration-300" >
	  	<AiOutlineArrowLeft size={24} /></button>

	  	<span className="nav-text">{year}</span>

  		<button onClick={() => setNext()}
  			className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded transition-colors duration-300" >
  		<AiOutlineArrowRight size={24} /></button>

  		<form action={goToYear} className="ridenav-form inline-block border-gray-800 ">
        <input
          className = "ridenav-year"
          type = "text"
          name = "year"
          placeholder = "Go to year"
        />
        <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded-full transition-colors duration-300"
         type="submit">Go</button>
      </form>
      <div className="ridenav-view" >
        View as:<br />
        <input onChange={() => setView('rides')}
          type="radio"
          id="blob"
          name="view"
          value="rides"
          defaultChecked
        />
        <label className="mr-2 p-1" htmlFor="rides">Rides</label>
        <input onChange={() => setView('stats')}
          type="radio"
          id="table"
          name="view"
          value="stats"
        />
        <label className="p-1" htmlFor="stats">Stats</label>
      </div>

  	</div>
  )

}
