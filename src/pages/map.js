import React, { Component } from 'react'
import { Map, TileLayer, Circle, CircleMarker } from 'react-leaflet'

const currentLocation = {
  name: 'Ottawa Canada',
  coordinates: [45.4215, -75.6972]
}

const route = [
  { name: "Antigua Guatemala", coordinates: [14.5666644, -90.7333304] },
  { name: "Bogota Columbia", coordinates: [4.711111, -74.072222] },
  { name: "La Paz Bolivia", coordinates: [-16.499998, -68.1333328] },
]

class MapPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      center: currentLocation.coordinates,
      zoom: 3,
    }
  }

  render() {
    const {zoom, center} = this.state

    return (
      <Map center={center} zoom={zoom} zoomControl={false}>
        <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}' />
        <CircleMarker center={center} radius={5} />
        {route.map((location, i) => (
          <Circle key={i} center={location.coordinates} radius={5} />
        ))}
      </Map>
    )
  }
}

export default MapPage
