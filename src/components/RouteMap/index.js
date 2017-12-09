import React, {Component} from 'react'
import windowSize from 'react-window-size'
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

class Map extends Component {
  render () {
    const {x, y, zoom,  currentLocation} = this.props;
    
    const width = this.props.windowWidth == 0
      ? 850 
      : this.props.windowWidth;

    const height = this.props.windowHeight == 0
      ? 500 
      : this.props.windowHeight;

    return (
      <ComposableMap
        projectionConfig={{
          scale: 205,
          rotation: [-11,0,0],
        }}
        width={width}
        height={height - 10}
        style={{
          width: "100%",
          height: "100%",
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
    );
  }
}

export default windowSize(Map)
