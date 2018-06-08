import moment from 'moment'
import { locations as allLocations } from '../src/data/route'

let locations = allLocations.sort((a, b) => new Date(a.date) - new Date(b.date))

// run the script as `yarn durations all` to show past durations
if (process.argv[2] !== 'all') {
  locations = locations.filter((l) => new Date(l.date) > new Date)
}

let lastLocation = locations[0]

locations.slice(1).forEach((location) => {
  let start = moment(location.date)
  let end = moment(lastLocation.date)
  let duration = moment.duration(start.diff(end)).as('days')

  if (duration > 0)
    console.log(`${lastLocation.name} ${duration} days`)

  lastLocation = location
})
