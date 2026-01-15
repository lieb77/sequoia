// src/app/bikes/page.tsx
import { fetchServiceLog, fetchBikes, bikeNames } from "@/lib/getbikes"
import { Bikes } from "@/class/Bikes"
import { ServiceLog } from  "@/class/Service"
import { BikeNav } from "@/component/BikeNav"
import { BikesLayout } from "@/component/BikesLayout"
import { Layout } from '@/component/Layout'
import { ServiceLogEntry } from '@/component/ServiceLog'
import { Suspense } from 'react';

export default async function Page(props: {
  searchParams?: Promise<{
    bike?: string}>;
}) {

  const searchParams = await props.searchParams
  const bike = searchParams?.bike || "Grando"

  // Fetch the data for this bike
  const data = await fetchBikes()

  // These are plural, but we're only dealing with one bike at a time now
  const bikes   = new Bikes(data)
  const myBikes = bikes.getBikes()

  // Fetch the service log for this bike
 // const sdata = await fetchServiceLog(bike)
 // const slog   = new ServiceLog(sdata)
  //const log    = slog.getServiceLog()

// console.log(myBikes);
  return (
    <Layout>
      <div className="p-4 place-items-center">
        <h1 className="biggest">Bikes</h1>
        <Suspense>
          <BikesLayout bikes={myBikes} />
 
        </Suspense>
      </div>
    </Layout>
  )
}

//                <BikeNav bikes={bikeNames} />
//  <ServiceLogEntry log={log} />