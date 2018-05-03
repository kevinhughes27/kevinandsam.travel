import Colombia from './countries/colombia'
import Bolivia from './countries/bolivia'
import Chile from './countries/chile'
import Argentina from './countries/argentina'
import Croatia from './countries/croatia'
import Ireland from './countries/ireland'
import Scotland from './countries/scotland'
import SouthAfrica from './countries/south_africa'

export const currentLocation = {
  name: "Buenos Aires, Argentina",
  coordinates: [-34.6037,-58.3816]
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
  ...Colombia,
  ...Bolivia,
  ...Chile,
  ...Argentina,
  {
    name: "Montenegro",
    date: "2018-05-08",
    airport: "TGD",
    coordinates: [42.7087,19.3744]
  },
  ...Croatia,
  {
    name: "Bosnia",
    date: "2018-05-29",
    airport: "SJJ",
    coordinates: [43.8938256,18.312952]
  },
  {
    name: "Hungary",
    date: "2018-06-10",
    airport: "BUD",
    coordinates: [47.4813602,18.9902211]
  },
  {
    name: "Slovenia",
    date: "2018-06-20",
    airport: "LJU",
    coordinates: [46.0662151,14.4620597]
  },
  {
    name: "Ottawa",
    map: false,
    visit: false,
    date: "2018-06-29"
  },
  {
    name: "Austria",
    date: "2018-07-05",
    airport: "VIE",
    coordinates: [48.220778,16.3100206]
  },
  {
    name: "Slovakia",
    date: "2018-07-17",
    airport: "BTS",
    coordinates: [48.8683701,19.1196324]
  },
  {
    name: "Czech Republic",
    date: "2018-07-21",
    airport: "PRG",
    coordinates: [50.0598058,14.3255423]
  },
  {
    name: "Germany",
    date: "2018-07-26",
    airport: "TXL",
    coordinates: [52.5069704,13.2846504]
  },
  {
    name: "Netherlands",
    date: "2018-08-04",
    airport: "AMS",
    coordinates: [52.3546274,4.828584]
  },
  ...Ireland,
  ...Scotland,
  {
    name: "Namibia",
    date: "2018-09-08",
    airport: "WDH",
    coordinates: [-22.5602536,17.0495205]
  },
  {
    name: "Botswana",
    date: "2018-09-24",
    airport: "GBE",
    coordinates: [-22.322312,22.4436439]
  },
  ...SouthAfrica,
  {
    name: "Tanzania",
    date: "2018-10-16",
    airport: "WDH",
    coordinates: [-6.172943,35.713066]
  },
  {
    name: "Ottawa",
    map: false,
    visit: false,
    date: "2018-10-23"
  },
  {
    name: "South Korea",
    date: "2018-11-01",
    airport: "ICN",
    coordinates: [37.5652894,126.8494671]
  },
  {
    name: "Japan",
    date: "2018-11-14",
    airport: "NRT",
    coordinates: [35.6693863,139.6012976]
  },
  {
    name: "Philippines",
    date: "2018-12-03",
    airport: "MNL",
    coordinates: [14.5965788,120.9445404]
  },
  {
    name: "Singapore",
    date: "2018-12-18",
    airport: "SIN",
    coordinates: [1.3439166,103.7540049]
  },
  {
    name: "Malaysia",
    date: "2018-12-24",
    airport: "KUL",
    coordinates: [3.138675,101.6169495]
  },
  {
    name: "Thailand",
    date: "2019-01-06",
    airport: "DMK",
    coordinates: [13.7196108,100.5322264]
  },
  {
    name: "Vietnam",
    date: "2019-02-01",
    airport: "SGN",
    coordinates: [10.7553411,106.4150414]
  },
]
