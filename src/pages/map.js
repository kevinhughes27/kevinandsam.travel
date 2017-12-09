import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import Map from '../components/RouteMap'

const currentLocation = {
  name: 'Ottawa Canada',
  coordinates: [-75.6972, 45.4215]
}

class MapPage extends Component {
  constructor() {
    super()
    this.focus = this.focus.bind(this)
    this.state = {
      center: [0,20],
      zoom: 1,
    }
  }

  componentDidMount() {
    this.focus();
  }

  focus() {
    this.setState({
      zoom: 2,
      center: currentLocation.coordinates,
    })
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
