// /component/RideView.tsx
import { RideList } from './ridelist'
import { RideTable } from './ridetable'
import { YearlyReport } from './yearly'

export function RideView({view, stats, rides}){
  if(view === "rides")
    return(
        <RideList rides={rides} />
    )
   else return (
      <YearlyReport data={stats} />
  )
}

