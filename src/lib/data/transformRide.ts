// src/lib/data/transformRide.ts
import { JsonRide, Ride } from '@/lib/types/Ride'

export function transformRide(ride: JsonRide): Ride {
    return {
        id: ride.id,
        title: ride.title,
        miles: ride.field_miles,
        date: ride.field_ridedate,
        bike: ride.field_bike.title,
        buddies: ride.field_buddies,
        body: ride.body ? fixUrls(ride.body.processed) : 'No notes',
        link: ride.path.alias
    }
}
