import React from 'react'
import { Carousel } from 'react-responsive-carousel'

class Slideshow extends React.Component {
  render () {
    const children = this.props.children.filter((c) => typeof(c) !== "string")

    return (
      <div style={{paddingBottom: 15}}>
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}>
          { children }
        </Carousel>
      </div>
    )
  }
}

export default Slideshow
