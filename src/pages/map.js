import React from 'react'
import Layout from '../components/Layout'
import withSizes from 'react-sizes'
import { MapContainer, TileLayer, Marker, CircleMarker, Circle, Popup, Polyline, LayersControl, LayerGroup } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { format, isAfter } from 'date-fns'
import { isDomAvailable } from '../utils'

import yearTrip from '../../data/yearTrip.json'
import kevinTrips from '../../data/kevin.json'
import kevinChildhoodTrips from '../../data/kevin-childhood.json'
import trips from '../../data/trips.json'

const currentLocation = {
  name: "Ottawa",
  flag: "🇨🇦",
  coordinates: [45.4215, -75.6972]
}

const MapParams = (windowWidth) => {
  const smallScreen = windowWidth < 667
  const mediumScreen = windowWidth <= 768
  const mobileCenters = {
    asia: { center: [19.91, 113.15], zoom: 2.8 },
    southAmerica: { center: [4.26, -64.32], zoom: 2.7 }
  }

  if (smallScreen) {
    return mobileCenters.southAmerica
  } else if (mediumScreen) {
    return { center: [19.69, -23.68], zoom: 2.87 }
  } else {
    return { center: [11.82, 22.00], zoom: 3.0 }
  }
}

export { Head } from '../components/Head'

class MapPage extends React.Component {
  render() {
    if (!isDomAvailable()) {
      return <div></div>
    }

    const windowWidth = this.props.windowWidth
    const { center, zoom } = MapParams(windowWidth)

    return (
      <Layout id="map">
        <MapContainer
          center={center}
          zoom={zoom}
          minZoom={2.5}
          maxZoom={7.0}
          zoomSnap={0}
          zoomDelta={0.5}
          wheelPxPerZoomLevel={100}
          zoomControl={true}
          attributionControl={false}
          maxBounds={[[-90,-270], [90,270]]}
          onMove={(ev) => {
            const map = ev.target
            const latLng = map.getCenter()
            const zoom = map.getZoom()
            console.log(latLng, zoom)
          }}>

          <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}' />

          <LayersControl position="topright">
            <LayersControl.Overlay name="Kevin">
              <LayerGroup>
                <Trips trips={kevinChildhoodTrips}/>
                <Trips trips={kevinTrips}/>
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="Kevin & Sam">
              <LayerGroup>
                <Trips trips={ trips.filter(t => new Date(t.locations[0].date) < new Date("2022-04-19")) }/>
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="When we were Nomads (Year Trip)">
              <LayerGroup>
                <YearTrip />
                <CurrentLocationMarker location={currentLocation} />
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="Kevin, Sam & Miles">
              <LayerGroup>
                <Trips trips={ trips.filter(t => new Date(t.locations[0].date) > new Date("2022-04-19")) }/>
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </Layout>
    )
  }
}

const YearTrip = () => {
  const locations = yearTrip.filter((r) => r.map !== false)
  const coordinates = locations.map((location) => location.coordinates)

  return (
    <div>
      <Polyline
        color='blue'
        weight={2}
        opacity={0.25}
        dashArray={'5,5'}
        positions={coordinates} />
      <LocationMarkers locations={locations} color='blue' />
    </div>
  )
}

const Trips = ({ trips }) => {
  return (
    <div>
      {trips.map((trip) => {
        return <Trip key={trip.name} trip={trip} />
      })}
    </div>
  )
}

const Trip = ({ trip }) => {
  const coordinates = trip.locations.map((location) => location.coordinates)

  return (
    <div>
      <Polyline
        color={trip.color}
        weight={2}
        opacity={0.25}
        dashArray={'5,5'}
        positions={coordinates} />
      <LocationMarkers locations={trip.locations} color={trip.color} />
    </div>
  )
}

const CurrentLocationMarker = ({ location }) => {
  const pulsingIcon = divIcon({
    className: 'css-icon',
    html: '<div class="gps_ring"></div>',
    iconSize: [20,20]
  })

  return (
    <div>
      <CircleMarker center={location.coordinates} radius={1} color="blue"/>
      <Marker position={location.coordinates} icon={pulsingIcon}>
        <Popup>
          <div>
            <h4>{location.name} {location.flag}</h4>
            {"We're here now!"}
          </div>
        </Popup>
      </Marker>
    </div>
  )
}

const DateText = ({ date }) => {
  if (date === undefined) {
    return null
  }

  const now = new Date()
  const inPast = isAfter(now, date)

  if (inPast) {
    return format(date, 'MMM do yyyy')
  } else {
    return format(date, 'MMMM yyyy')
  }
}

const LocationMarkers = ({ locations, color }) => {
  const markers = locations.map((location, i) => (
    <CircleMarker key={i} center={location.coordinates} radius={14} color="transparent">
      <Popup>
        <div>
          <h4>{location.name} {location.flag}</h4>
          <p><DateText date={new Date(location.date)}/></p>
          {location.text}
        </div>
      </Popup>
    </CircleMarker>
  ))

  const circles = locations.map((location, i) => (
    <Circle key={i} center={location.coordinates} color={color} radius={3} />
  ))

  return <div>{circles}{markers}</div>
}

const mapSizesToProps = ({ width }) => ({
  windowWidth: width
})

export default withSizes(mapSizesToProps)(MapPage)
