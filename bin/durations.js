import moment from 'moment'
import { locations as allLocations } from '../src/data/route'

let locations = allLocations.sort((a, b) => new Date(a.date) - new Date(b.date))

let lastLocation = locations[0]

locations.slice(1).forEach((location) => {
  let start = moment(location.date)
  let end = moment(lastLocation.date)
  let duration = moment.duration(start.diff(end)).as('days')

  if (duration > 0)
    console.log(`${lastLocation.name} ${duration} days`)

  lastLocation = location
})
