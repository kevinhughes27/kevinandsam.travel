import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import Map from '../components/RouteMap'

const currentLocation = {
  name: 'Ottawa Canada',
  coordinates: [-75.6972, 45.4215]
}

class MapPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      center: currentLocation.coordinates,
      zoom: 2,
    }
  }

  render() {
    const {zoom, center} = this.state
    const motionParams = {stiffness: 100, damping: 30}
    const motionStyle = {
      zoom: spring(zoom, motionParams),
      x: spring(center[0], motionParams),
      y: spring(center[1], motionParams),
    }

    return (
      <Motion style={motionStyle} >
        {({zoom, x, y}) => (
          <Map zoom={zoom} x={x} y={y} currentLocation={currentLocation} />
        )}
      </Motion>
    )
  }
}

export default MapPage
