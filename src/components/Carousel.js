import React from 'react'
import { Carousel as ReactResponsiveCarousel } from 'react-responsive-carousel'

class Carousel extends React.Component {
  render () {
    const children = this.props.children.filter((c) => typeof(c) !== "string")

    return (
      <div style={{paddingBottom: 15}}>
        <ReactResponsiveCarousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}>
          { children }
        </ReactResponsiveCarousel>
      </div>
    )
  }
}

export default Carousel
