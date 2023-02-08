import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, CircleMarker, Circle, Popup, Polyline, LayersControl, LayerGroup } from 'react-leaflet'
import { divIcon } from 'leaflet'

class TravellingTo extends Component {
  render() {
    const placeA = this.props.places[0]
    const placeB = this.props.places[1]

    const locationA = [placeA.coordinate.latitude, placeA.coordinate.longitude]
    const locationB = [placeB.coordinate.latitude, placeB.coordinate.longitude]
    const center = [(locationA[0] + locationB[0]) / 2, (locationA[1] + locationB[1]) / 2]
    const bounds = [
      [Math.min(locationA[0], locationB[0]) - 5, Math.min(locationA[1], locationB[1]) - 5],
      [Math.max(locationA[0], locationB[0]) + 5, Math.max(locationA[1], locationB[1]) + 5],
    ]
    const pulsingIcon = divIcon({
    className: 'css-icon',
    html: '<div class="travelling_to_ring"></div>',
    iconSize: [25,25]
  })

    return (
      <div style={{height: 400}}>
        <MapContainer
          center={center}
          bounds={bounds}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}' />
          <Circle center={locationB} color='red' />
          <Circle center={locationA} color='red' />
          <Marker position={locationA} icon={pulsingIcon} />
          <Polyline
            color='red'
            weight={3}
            opacity={0.25}
            dashArray={'5,5'}
            positions={[locationA, locationB]} />
        </MapContainer>
      </div>
    )
  }
}

export default TravellingTo
