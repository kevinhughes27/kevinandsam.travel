import React, {Component} from 'react'
import { Carousel } from 'react-responsive-carousel'

class Slideshow extends Component {
  render () {
    const children = this.props.children.filter((c) => typeof(c) !== "string")

    return (
      <div style={{paddingBottom: 15}}>
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}>
          { children }
        </Carousel>
      </div>
    )
  }
}

export default Slideshow