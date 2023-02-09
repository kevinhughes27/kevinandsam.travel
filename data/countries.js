import locations from './yearTrip.json'

export const countries = []

locations.forEach((location) => {
  let countryName = location.name.indexOf(", ") !== -1
    ? location.name.split(", ")[1]
    : location.name

  const foreignCountry = (countryName !== "Ottawa" && countryName !== "Calgary")
  if (!foreignCountry) {
    return
  }

  let countryIndex = countries.findIndex((c) => c.name === countryName)
  let countryAdded = countryIndex !== -1

  if (!countryAdded) {
    countries.push({
      name: countryName,
      date: location.date,
      airport: location.airport
    })
  } else {
    if (!countries[countryIndex].airport) {
      countries[countryIndex].airport = location.airport
    }
  }
})
