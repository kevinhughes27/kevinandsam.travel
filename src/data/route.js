import Countries from './countries'

export const currentLocation = {
  name: "Namibia",
  coordinates: [-22.5602536,17.0495205]
}

export const locations = [
  {
    name: "Ottawa",
    visit: false,
    coordinates: [45.4215, -75.6972]
  },
  {
    name: "Guatemala",
    date: "2018-02-01",
    airport: "GUA",
    coordinates: [14.5666644, -90.7333304]
  },
  ...Countries.Colombia,
  ...Countries.Bolivia,
  ...Countries.Chile,
  ...Countries.Argentina,
  {
    name: "Montenegro",
    date: "2018-05-08",
    airport: "TIV",
    coordinates: [42.4242999,18.7683874]
  },
  ...Countries.Croatia,
  {
    name: "Bosnia",
    date: "2018-05-26",
    airport: "SJJ",
    coordinates: [43.8938256,18.312952]
  },
  {
    name: "Budapest, Hungary",
    date: "2018-06-01",
    airport: "BUD",
    coordinates: [47.4813602,18.9902211]
  },
  {
    name: "Bratislava, Slovakia",
    date: "2018-06-05",
    airport: "BTS",
    coordinates: [48.1356952,16.9758341]
  },
  ...Countries.Slovenia,
  ...Countries.Austria,
  {
    name: "Calgary",
    map: false,
    visit: false,
    date: "2018-06-27"
  },
  {
    name: "Frankfurt, Germany",
    date: "2018-07-05",
    visit: false,
    coordinates: [50.121301,8.5665245]
  },
  {
    name: "Munich, Germany",
    date: "2018-07-06",
    visit: false,
    coordinates: [48.1548895,11.4717966]
  },
  {
    name: "Prague, Czech Republic",
    date: "2018-07-09",
    airport: "PRG",
    coordinates: [50.0598058,14.3255423]
  },
  {
    name: "Berlin, Germany",
    date: "2018-07-13",
    airport: "TXL",
    coordinates: [52.5069704,13.2846504]
  },
  {
    name: "Hamburg, Germany",
    date: "2018-07-20",
    visit: false,
    coordinates: [53.5586941,9.7877404]
  },
  {
    name: "Amersterdam, Netherlands",
    date: "2018-07-22",
    airport: "AMS",
    coordinates: [52.3546274,4.828584]
  },
  {
    name: "Rotterdam, Netherlands",
    date: "2018-07-26",
    airport: "AMS",
    coordinates: [51.9280573,4.420367]
  },
  {
    name: "Bruges, Belgium",
    date: "2018-07-28",
    visit: false,
    coordinates: [51.2607606,3.1521058]
  },
  {
    name: "Brussels, Belgium",
    date: "2018-07-30",
    airport: "BRU",
    coordinates: [50.8550625,4.3053507]
  },
  {
    name: "London UK",
    date: "2018-08-03",
    airport: "LHR",
    coordinates: [51.5287718,-0.24168]
  },
  ...Countries.Ireland,
  ...Countries.Scotland,
  ...Countries.Namibia,
  ...Countries.SouthAfrica,
  ...Countries.Tanzania,
  {
    name: "Ottawa",
    map: false,
    visit: false,
    date: "2018-10-22"
  },
  ...Countries.SouthKorea,
  ...Countries.Japan,
  {
    name: "Vientiane, Laos",
    date: "2018-12-02",
    airport: "VTE",
    coordinates: [17.9605181,102.5707462]
  },
  {
    name: "Laos",
    date: "2018-12-05",
    airport: "VTE",
    coordinates: [19.6894002,102.4119533]
  },
  ...Countries.Vietnam,
  {
    name: "Malaysia",
    date: "2018-12-23",
    airport: "KUL",
    coordinates: [3.138675,101.6169495]
  },
  {
    name: "Singapore",
    date: "2018-12-29",
    airport: "SIN",
    coordinates: [1.3439166,103.7540049]
  },
  {
    name: "Cambodia",
    date: "2019-01-02",
    airport: "REP",
    coordinates: [13.3403383,103.7929146]
  },
  ...Countries.Thailand,
  {
    name: "Myanmar",
    date: "2019-02-18",
    airport: "MDL",
    coordinates: [21.9403451,96.0057844]
  },
  {
    name: "Bhutan",
    date: "2019-03-02",
    visit: false,
    coordinates: [27.470012,89.3147555]
  },
  {
    name: "Nepal",
    date: "2019-03-05",
    airport: "KTM",
    coordinates: [27.7089559,85.2911134]
  },
  {
    name: "India",
    date: "2019-03-16",
    airport: "DEL",
    coordinates: [28.527272,77.1389455]
  },
  {
    name: "Ottawa",
    date: "2019-04-01",
    visit: false,
    map: false,
    coordinates: [45.4215, -75.6972]
  }
]

export const sortedLocations = locations.sort((a, b) => new Date(a.date) - new Date(b.date))

export const countries = []

sortedLocations.forEach((location) => {
  let countryName = location.name.indexOf(", ") !== -1
    ? location.name.split(", ")[1]
    : location.name

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
