// /component/RideView.tsx
import { RidesLayout } from './RidesLayout'
import { RideTable } from './RideTable'
import { YearlyReport } from './Yearly'

export function RideView({view, stats, rides}){
  if(view === "rides")
    return(
        <RidesLayout rides={rides} />
    )
   else return (
      <YearlyReport data={stats} />
  )
}

