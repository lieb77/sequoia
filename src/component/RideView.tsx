// /component/RideView.tsx
import { RidesLayout } from '@/component/RidesLayout'
import { RideTable } from '@/component/RideTable'
import { StatsLayout } from '@/component/StatsLayout'


export function RideView({view, stats, rides}){
  if(view === "table")
    return(
        <RideTable rides={rides} />
    )
   else return (
      <StatsLayout stats={stats} />,
      <RidesLayout rides={rides} />
  )
}

