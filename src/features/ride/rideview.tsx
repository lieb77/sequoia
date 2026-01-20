// /component/RideView.tsx
import { RidesLayout } from './rideslayout'
import { RideTable } from './ridetable'
import { YearlyReport } from './yearly'

export function RideView({view, stats, rides}){
  if(view === "rides")
    return(
        <RidesLayout rides={rides} />
    )
   else return (
      <YearlyReport data={stats} />
  )
}

