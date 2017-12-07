import React from 'react'
import { Markers, Marker } from 'react-simple-maps'

const styles = {
  default: {
    fill: "rgb(49, 130, 189)",
    stroke: "rgb(49, 130, 189)",
    strokeWidth: 2,
    strokeOpacity: 1
  },
  hover: {
    fill: "rgb(49, 130, 189)",
    stroke: "rgb(49, 130, 189)",
    strokeWidth: 2,
    strokeOpacity: 1,
    outline: "none"
  },
  pressed: {
    fill: "rgb(49, 130, 189)",
    stroke: "rgb(49, 130, 189)",
    strokeWidth: 2,
    strokeOpacity: 1,
    outline: "none"
  }
}

const textStyles = {
  fontSize: "6pt",
  fontFamily: "Roboto, sans-serif",
  fill: "#607D8B",
  strokeWidth: 0,
}

const renderLocation = (location) => (
  <Markers>
    <Marker key={0} marker={location}
      style={styles}>
      <circle cx={0} cy={0} r={5}/>
      <circle className="pulse" cx={0} cy={0} r={10}/>
      <text textAnchor="middle" y={-10} style={textStyles}>
        {location.name}
      </text>
    </Marker>
  </Markers>
)

export default renderLocation
