import React from 'react'
import { Markers, Marker } from 'react-simple-maps'

const markers = [
  { name: "Antigua Guatemala", coordinates: [-90.7333304, 14.5666644] },
  { name: "Bogota Columbia", coordinates: [-74.072222, 4.711111] },
  { name: "La Paz Bolivia", coordinates: [-68.1333328, -16.499998] },
]

const styles = {
  default: { fill: "#FF5722" },
  hover: { fill: "#FFFFFF", outline: "none" },
  pressed: { fill: "#FF5722", outline: "none" },
}

const circleStyles = {
  stroke: "#FF5722",
  strokeWidth: 3,
  opacity: 0.9,
}

const textStyles = {
  fontSize: '6pt',
  fontFamily: "Roboto, sans-serif",
  fill: "#607D8B",
}

const renderRoute = () => (
  <Markers>
    {markers.map((marker, i) => (
      <Marker key={i} marker={marker} style={styles}>
        <circle cx={0} cy={0} r={5} style={circleStyles} />
        <text textAnchor="middle" y={-10} style={textStyles}>
          {marker.name}
        </text>
      </Marker>
    ))}
  </Markers>
)

export default renderRoute
