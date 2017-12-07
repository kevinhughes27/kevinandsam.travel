// plot blog posts on a map
// plot our intended route on a map

import React from 'react'
import topojson from '../data/world-50m-simplified.json'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps'

const markers = [
  { markerOffset: -10, name: "Antigua Guatemala", coordinates: [-90.7333304, 14.5666644] },
  { markerOffset: -10, name: "Bogota Columbia", coordinates: [-74.072222, 4.711111] },
  { markerOffset: -10, name: "La Paz Bolivia", coordinates: [-68.1333328, -16.499998] },
]

const Map = () => (
  <section className="section-padding bg-white">
    <div className="grid">
      <ComposableMap
        projectionConfig={{
          scale: 205,
          rotation: [-11,0,0],
        }}
        width={980}
        height={551}
        style={{
          width: "100%",
          height: "auto",
        }}
        >
        <ZoomableGroup center={[0,20]} disablePanning>
          <Geographies geography={topojson}>
            {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
              <Geography
                key={i}
                geography={geography}
                projection={projection}
                style={{
                  default: {
                    fill: "#ECEFF1",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none",
                  },
                  hover: {
                    fill: "#607D8B",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none",
                  },
                  pressed: {
                    fill: "#FF5722",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none",
                  },
                }}
              />
            ))}
          </Geographies>
          <Markers>
              {markers.map((marker, i) => (
                <Marker
                  key={i}
                  marker={marker}
                  style={{
                    default: { fill: "#FF5722" },
                    hover: { fill: "#FFFFFF" },
                    pressed: { fill: "#FF5722" },
                  }}
                  >
                  <circle
                    cx={0}
                    cy={0}
                    r={5}
                    style={{
                      stroke: "#FF5722",
                      strokeWidth: 3,
                      opacity: 0.9,
                    }}
                  />
                  <text
                    textAnchor="middle"
                    y={marker.markerOffset}
                    style={{
                      fontSize: '6pt',
                      fontFamily: "Roboto, sans-serif",
                      fill: "#607D8B",
                    }}
                    >
                    {marker.name}
                  </text>
                </Marker>
              ))}
            </Markers>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  </section>
)

export default Map
