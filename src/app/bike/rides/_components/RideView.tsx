// /component/RideView.tsx
import { RideList } from './RideList'
import { RideTable } from './RideTable'
import { YearlyReport } from './Yearly'

export function RideView({view, stats, rides}){
  if(view === "rides")
    return(
        <RideList rides={rides} />
    )
   else return (
      <YearlyReport data={stats} />
  )
}

