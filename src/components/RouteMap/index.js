import React from 'react'
import topojson from './world-50m-simplified.json'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps'


import renderLocation from './location'
import renderRoute from './route'

const styles = {
  default: {
    fill: "#ECEFF1",
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  },
  hover: {
    fill: "#ECEFF1",
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  },
  pressed: {
    fill: "#ECEFF1",
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  },
}

const Map = ({ zoom, x, y, currentLocation }) => (
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
    <ZoomableGroup center={[x,y]} zoom={zoom}>
      <Geographies geography={topojson}>
        {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
          <Geography
            key={i}
            geography={geography}
            projection={projection}
            style={styles}
          />
        ))}
      </Geographies>
      { renderLocation(currentLocation) }
      { renderRoute() }
    </ZoomableGroup>
  </ComposableMap>
)

export default Map
