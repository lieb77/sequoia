// /lib/ridenav.tsx

'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import { currentYear, minYear } from '@/lib/utils'

import styles from '../styles/ridenav.module.css';

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
  	<div className={styles.navButtons}>
	  	<button onClick={() => setPrev()}
	  		className={styles.navButton} >
	  	<AiOutlineArrowLeft size={24} /></button>

	  	<span className={styles.navText}>{year}</span>

  		<button onClick={() => setNext()}
  			className={styles.navButton} >
  		<AiOutlineArrowRight size={24} /></button>

  		<form action={goToYear} className={styles.ridenavForm}>
        <input
          className = {styles.ridenavYear}
          type = "text"
          name = "year"
          placeholder = "Go to year"
        />
        <button className={styles.navButton}
         type="submit">Go</button>
      </form>
      <div className={styles.ridenavView} >
        View as:<br />
        <input onChange={() => setView('rides')}
          type="radio"
          id="blob"
          name="view"
          value="rides"
          defaultChecked
        />
        <label className={styles.ridenavLabel} htmlFor="rides">Rides</label>
        <input onChange={() => setView('stats')}
          type="radio"
          id="table"
          name="view"
          value="stats"
        />
        <label className={styles.ridenavLabel} htmlFor="stats">Stats</label>
      </div>

  	</div>
  )

}
