import moment from 'moment'
import { countries as _countries, sortedLocations as _locations } from '../src/data/route'

let countries = _countries
let locations = _locations

// run the script as `yarn durations all` to show past durations
if (process.argv.indexOf('all') === -1) {
  locations = locations.filter((l) => new Date(l.date) > new Date)
  countries = countries.filter((l) => new Date(l.date) > new Date)
}

// run the script as `yarn durations countries` to show country durations
if (process.argv.indexOf('countries') !== -1) {
  locations = countries
}

let lastLocation = locations[0]

locations.forEach((location) => {
  let start = moment(lastLocation.date)
  let end = moment(location.date)
  let duration = moment.duration(end.diff(start)).as('days')
  duration = Math.round(duration)

  if (duration === 0) return

  // run the script as `yarn durations dates` to show the date range
  if (process.argv.indexOf('dates') !== -1) {
    console.log(`${lastLocation.name} ${start.format('MMM Do')} to ${end.format('MMM Do')}`)
  } else {
    console.log(`${lastLocation.name} ${duration} days`)
  }


  lastLocation = location
})
