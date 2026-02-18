'use client'
import { useEffect } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import { currentYear, minYear } from '@/lib/constants'

import styles from '../_styles/ridenav.module.css'

export function RideNav() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    // 1. Get the year from the URL path instead of SearchParams
    // Split the path: ["", "bike", "rides", "2024"] -> grab the last element
    const pathSegments = pathname.split('/')
    const lastSegment = pathSegments[pathSegments.length - 1]

    // If the last segment is a number, use it. Otherwise, use currentYear
    const year: number = /^\d{4}$/.test(lastSegment)
        ? parseInt(lastSegment, 10)
        : parseInt(currentYear, 10)

    // Helper to build the new URL
    const navigate = (newYear: number, newView?: string) => {
        const view = newView || searchParams.get('view') || 'rides'
        const params = new URLSearchParams()

        // Only add view to params if it's not the default 'rides'
        // (optional, keeps URL cleaner)
        if (view !== 'rides') params.set('view', view)

        const queryString = params.toString()
        const cleanPath = `/bike/rides/${newYear}`

        replace(queryString ? `${cleanPath}?${queryString}` : cleanPath)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger if the user is typing in the "Go to year" input
            if (document.activeElement?.tagName === 'INPUT') return

            if (e.key === 'ArrowLeft') {
                handlePrev()
            } else if (e.key === 'ArrowRight') {
                handleNext()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [year])

    function setPrev() {
        if (year > parseInt(minYear, 10)) {
            navigate(year - 1)
        }
    }

    function setNext() {
        if (year < parseInt(currentYear, 10)) {
            navigate(year + 1)
        }
    }

    function goToYear(formData: FormData) {
        const goYear = parseInt(formData.get('year') as string, 10)
        if (goYear >= parseInt(minYear, 10) && goYear <= parseInt(currentYear, 10)) {
            navigate(goYear)
        }
    }

    function setView(view: string) {
        navigate(year, view)
    }

    return (
        <div className={styles.rideNav}>
            <h2 className={styles.ridesYear}>Rides {year}</h2>
            <div className={styles.navButtons}>
                <button
                    onClick={setPrev}
                    className={styles.navButton}
                    disabled={year <= parseInt(minYear, 10)}
                >
                    <AiOutlineArrowLeft size={24} />
                </button>

                <span className={styles.navText}>{year}</span>

                <button
                    onClick={setNext}
                    className={styles.navButton}
                    disabled={year >= parseInt(currentYear, 10)}
                >
                    <AiOutlineArrowRight size={24} />
                </button>

                <form action={goToYear} className={styles.ridenavForm}>
                    <input
                        className={styles.ridenavYear}
                        type="number" // Changed to number for better mobile keyboards
                        name="year"
                        placeholder="Go to year"
                    />
                    <button className={styles.navButton} type="submit">
                        Go
                    </button>
                </form>

                <div className={styles.ridenavView}>
                    <span className={styles.ridenavSpan}>View as: </span>
                    <input
                        onChange={() => setView('rides')}
                        type="radio"
                        className={styles.ridenavRadio}
                        id="rides"
                        name="view"
                        value="rides"
                        checked={searchParams.get('view') !== 'stats'} // Controlled component
                    />
                    <label className={styles.ridenavLabel} htmlFor="rides">
                        Rides
                    </label>

                    <input
                        onChange={() => setView('stats')}
                        type="radio"
                        className={styles.ridenavRadio}
                        id="stats"
                        name="view"
                        value="stats"
                        checked={searchParams.get('view') === 'stats'} // Controlled component
                    />
                    <label className={styles.ridenavLabel} htmlFor="stats">
                        Stats
                    </label>
                </div>
            </div>
        </div>
    )
}
