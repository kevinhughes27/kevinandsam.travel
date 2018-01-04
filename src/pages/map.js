import React, { Component } from 'react'
import windowSize from 'react-window-size'
import { Map, TileLayer, Circle, CircleMarker } from 'react-leaflet'
import { currentLocation, route } from '../data/route'

const Center = (windowWidth) => {
  const smallScreen = windowWidth < 667;
  return smallScreen ? [23.16, -76.81] : [23.76, -34.27]
}

const tileProviderUrl =
  'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'

const RouteMarkers = ({ locations }) => {
  const markers = locations.map((location, i) => (
    <Circle key={i} center={location.coordinates} radius={5} />
  ))
  return <div>{markers}</div>
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

    return (
      <Map
        center={Center(windowWidth)}
        zoom={3}
        minZoom={2}
        zoomSnap={0}
        zoomDelta={0.5}
        wheelPxPerZoomLevel={100}
        zoomControl={false}
        attributionControl={false}
        onMove={(ev) => {
          const latLng = ev.target.getCenter()
          console.log(latLng)
        }}>

        <TileLayer url={tileProviderUrl} />
        <CircleMarker center={currentLocation.coordinates} radius={5} />
        <RouteMarkers locations={route} />

      </Map>
    )
  }
}

export default windowSize(MapPage)
