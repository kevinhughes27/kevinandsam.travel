import React, { Component } from 'react'
import windowSize from 'react-window-size'
import { Map, TileLayer, Marker, CircleMarker, Circle, Popup, Polyline } from 'react-leaflet'
import { divIcon } from 'leaflet'
import moment from 'moment'

import { currentLocation, locations as allLocations } from '../data/route'
const locations = allLocations.filter((r) => r.map !== false)

const MapParams = (windowWidth) => {
  const smallScreen = windowWidth < 667
  const mediumScreen = windowWidth <= 768

  if (smallScreen) {
    return { center: [9.96, -57.65], zoom: 2 }
  } else if (mediumScreen) {
    return { center: [9.35, -37.32], zoom: 2.9 }
  } else {
    return { center: [10, 5], zoom: 3 }
  }
}

class MapPage extends Component {
  render() {
    const windowWidth = this.props.windowWidth

    if (windowWidth === 0) {
      return <div></div>
    }

    if (window === undefined) {
      return <div></div>
    }

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
      <RouteMarkers locations={locations} />
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

const RouteMarkers = ({ locations }) => {
  const markers = locations.map((location, i) => (
    <CircleMarker key={i} center={location.coordinates} radius={24} color="transparent">
      <Popup>
        <div>
          <h4>{location.name}</h4>
          {moment(location.date).format('MMMM')}
        </div>
      </Popup>
    </CircleMarker>
  ))

  const circles = locations.map((location, i) => (
    <Circle key={i} center={location.coordinates} radius={3} />
  ))

  return <div>{circles}{markers}</div>
}

export default windowSize(MapPage)
