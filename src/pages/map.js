import React, { Component } from 'react'
import withSizes from 'react-sizes'
import { Map, TileLayer, Marker, CircleMarker, Circle, Popup, Polyline } from 'react-leaflet'
import { divIcon } from 'leaflet'
import moment from 'moment'

import { currentLocation, locations as allLocations } from '../data/route'
import previousTrips from '../data/previousTrips'

const locations = allLocations.filter((r) => r.map !== false)

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
    return { center: [11.82, 22.00], zoom: 3.1 }
  }
}

class MapPage extends Component {
  render() {
    if (typeof window === 'undefined') {
      return <div></div>
    }

    const windowWidth = this.props.windowWidth
    const { center, zoom } = MapParams(windowWidth)

    return (
      <Map
        center={center}
        zoom={zoom}
        minZoom={2.7}
        maxZoom={6.8}
        zoomSnap={0}
        zoomDelta={0.5}
        wheelPxPerZoomLevel={100}
        zoomControl={false}
        attributionControl={false}
        onMove={(ev) => {
          const map = ev.target
          const latLng = map.getCenter()
          const zoom = map.getZoom()
          console.log(latLng, zoom)
        }}>

        <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}' />
        <Route />
        <Previous />
      </Map>
    )
  }
}

const Route = () => {
  const coordinates = locations.map((location) => location.coordinates)

  return (
    <div>
      <Polyline
        color='blue'
        weight={2}
        opacity={0.25}
        dashArray={'5,5'}
        positions={coordinates} />
      <LocationMarker location={currentLocation} />
      <RouteMarkers locations={locations} color='blue' />
    </div>
  )
}

const Previous = () => {
  return (
    <div>
      {previousTrips.map((trip) => {
        return <Trip trip={trip} />
      })}
    </div>
  )
}

const Trip = ({ trip }) => {
  const coordinates = trip.locations.map((location) => location.coordinates)

  return (
    <div>
      <Polyline
        color='grey'
        weight={2}
        opacity={0.25}
        dashArray={'5,5'}
        positions={coordinates} />
      <RouteMarkers locations={trip.locations} color='grey' />
    </div>
  )
}

const LocationMarker = ({ location }) => {
  const pulsingIcon = divIcon({
    className: 'css-icon',
    html: '<div class="gps_ring"></div>',
    iconSize: [20,20]
  })

  return (
    <div>
      <Marker position={location.coordinates} icon={pulsingIcon}>
        <Popup>
          <div>
            <h4>{location.name}</h4>
            {"We're here now!"}
          </div>
        </Popup>
      </Marker>
    </div>
  )
}

const DateText = ({ date} ) => {
  if (date === undefined) {
    return null
  }

  if (moment(date) < Date.now()) {
    return moment(date).format('MMM Do YYYY')
  } else {
    return moment(date).format('MMMM YYYY')
  }
}

const RouteMarkers = ({ locations, color }) => {
  const markers = locations.map((location, i) => (
    <CircleMarker key={i} center={location.coordinates} radius={14} color="transparent">
      <Popup>
        <div>
          <h4>{location.name}</h4>
          <DateText date={location.date}/>
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
