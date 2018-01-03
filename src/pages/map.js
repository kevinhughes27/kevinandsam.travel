import React, { Component } from 'react'
import { Map, TileLayer, Circle, CircleMarker } from 'react-leaflet'
import windowSize from 'react-window-size'

const zoom = 3
const Center = (windowWidth) => {
  const smallScreen = windowWidth < 667;
  return smallScreen ? [23.16, -76.81] : [23.76, -34.27]
}

const currentLocation = {
  name: 'Ottawa Canada',
  coordinates: [45.4215, -75.6972]
}

const route = [
  { name: "Antigua Guatemala", coordinates: [14.5666644, -90.7333304] },
  { name: "Bogota Columbia", coordinates: [4.711111, -74.072222] },
  { name: "La Paz Bolivia", coordinates: [-16.499998, -68.1333328] },
]

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
        zoom={zoom}
        zoomControl={false}
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
