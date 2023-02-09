import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Circle, Polyline } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { lineString } from '@turf/helpers'
import bezierSpline from '@turf/bezier-spline'

class TravellingTo extends Component {
  render() {
    const placeA = this.props.from
    const placeB = this.props.to

    const locationA = [placeA.coordinate.latitude, placeA.coordinate.longitude]
    const locationB = [placeB.coordinate.latitude, placeB.coordinate.longitude]

    const center = [(locationA[0] + locationB[0]) / 2, (locationA[1] + locationB[1]) / 2]
    const bounds = [
      [Math.min(locationA[0], locationB[0]) - 5, Math.min(locationA[1], locationB[1]) - 5],
      [Math.max(locationA[0], locationB[0]) + 5, Math.max(locationA[1], locationB[1]) + 5],
    ]

    // midpoint calculation for bezier curve
    // https://ryancatalani.medium.com/creating-consistently-curved-lines-on-leaflet-b59bc03fa9dc
    const offsetX = locationB[1] - locationA[1]
    const offsetY = locationB[0] - locationA[0]
    const r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2))
    const theta = Math.atan2(offsetY, offsetX)

    // offset proportional to r (distance)
    const thetaOffset = (r) => {
      // straight line for very short distances (not flights)
      if (r < 5) {
        return 0
      // smaller offset for larger distances because the curves get too big
      } else if (r > 200) {
        return 0.1
      } else {
        return 0.2
      }
    }

    const r2 = (r/2)/(Math.cos(thetaOffset(r)))
    const theta2 = theta + thetaOffset(r)

    const midpointX = (r2 * Math.cos(theta2)) + locationA[1]
    const midpointY = (r2 * Math.sin(theta2)) + locationA[0]
    const midpointLatLng = [midpointY, midpointX]

    const line = lineString([locationA, midpointLatLng, locationB])
    const curved = bezierSpline(line);

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
          scrollWheelZoom={false}
          touchZoom={false}
          doubleClickZoom={false}
          dragging={false}
          attributionControl={false}
        >
          <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}' />
          <Circle center={locationA} color='red' />
          <Circle center={locationB} color='red' />
          <Marker position={locationB} icon={pulsingIcon} />
          <Polyline
            color='red'
            weight={3}
            opacity={0.25}
            dashArray={'5,5'}
            positions={curved.geometry.coordinates} />
        </MapContainer>
      </div>
    )
  }
}

export default TravellingTo
