import React, { Component } from 'react'
import { Map, TileLayer, Circle, CircleMarker } from 'react-leaflet'

const zoom = 3
const center = [23.76, -34.27]

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
    return (
      <Map
        center={center}
        zoom={zoom}
        zoomControl={false}
        onDrag={(ev) => console.log(ev.target._lastCenter)}>

        <TileLayer url={tileProviderUrl} />
        <CircleMarker center={currentLocation.coordinates} radius={5} />
        <RouteMarkers locations={route} />

      </Map>
    )
  }
}

export default MapPage
