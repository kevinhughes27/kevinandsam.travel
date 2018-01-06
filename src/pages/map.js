import React, { Component } from 'react'
import windowSize from 'react-window-size'
import { Map, TileLayer, Circle, CircleMarker, Polyline } from 'react-leaflet'
import { currentLocation, route } from '../data/route'

const RouteMarkers = ({ coordinates }) => {
  const markers = coordinates.map((point, i) => (
    <Circle key={i} center={point} radius={5} />
  ))

  return <div>{markers}</div>
}

const Route = () => {
  const coordinates = route.map((location, i) => location.coordinates)
  const currentCoordinates = currentLocation.coordinates
  const positions = [currentCoordinates, ...coordinates]

  return (
    <div>
      <CircleMarker center={currentCoordinates} radius={5} />
      <RouteMarkers coordinates={coordinates} />
      <Polyline
        color="blue"
        weight={2}
        opacity={0.25}
        dashArray={'5,5'}
        positions={positions} />
    </div>
  )
}

const MapParams = (windowWidth) => {
  const smallScreen = windowWidth < 667
  const mediumScreen = windowWidth <= 768

  if (smallScreen) {
    return { center: [9.96, -57.65], zoom: 2 }
  } else if (mediumScreen) {
    return { center: [9.35, -37.32], zoom: 2.9 }
  } else {
    return { center: [11.43, -7.20], zoom: 3 }
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
        minZoom={2}
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

export default windowSize(MapPage)
