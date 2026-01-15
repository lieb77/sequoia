// /lib/BikeNav.tsx

'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation'


export function BikeNav({bikes}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

   function goToBike(goBike) {
    const params = new URLSearchParams(searchParams);
    params.set('bike', goBike)
    replace(`${pathname}?${params.toString()}`);
  }


  return(
  	<div className="nav-buttons bg-gray-100">
  		{bikes.map(bike =>
	  		<button key={bike} onClick={() =>  goToBike(bike)}
	  			className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300" >
	  			{bike}
	  		</button>
	  	)}
  	</div>
  )
}

