import React, { Component } from 'react'
import windowSize from 'react-window-size'
import { Carousel } from 'react-responsive-carousel'
import { withPrefix } from 'gatsby-link'

class AboutPage extends Component {
  render() {
    return (
      <section id="about" className="section-padding">
        <div className="grid">
          <div className="text-container">
            <p>
              Kevin and Sam met in 2014 through a mutual love of travelling. Their first adventure together was in 2015 to Costa Rica.
              Since that first trip things have only escalated, hiking the Inca trail in Peru and backpacking around China for 4 weeks.
              In 2018 Sam and Kevin are embarking on their most ambitious adventure yet -
              we are selling all of our stuff and becoming nomads to see the world.
            </p>
          </div>

          <Images windowWidth={this.props.windowWidth} />
        </div>
      </section>
    )
  }
}

class Images extends Component {
  render() {
    const mediumScreen = this.props.windowWidth <= 768;
    return mediumScreen ? renderMobile() : renderDesktop();
  }
}

const renderMobile = () => (
  <div style={{paddingBottom: 15}}>
    <Carousel
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}>
      { Item('about-1.jpg') }
      { Item('about-2.jpg') }
      { Item('about-3.jpg') }
    </Carousel>
  </div>
)

const Item = (image) => (
  <div>
    <img src={`${__PATH_PREFIX__}/${image}`} />
  </div>
)

const renderDesktop = () => (
  <div className="images">
    { Image('about-1.jpg', 'Where') }
    { Image('about-2.jpg', 'to') }
    { Image('about-3.jpg', 'Next') }
  </div>
)

const Image = (image, overlayText) => (
  <div className="image-container">
    <div className="content-overlay"></div>
    <img className="content-image" src={`${__PATH_PREFIX__}/${image}`} />
    <div className="content-details fadeIn-bottom">
      <h3>{overlayText}</h3>
    </div>
  </div>
)

export default windowSize(AboutPage)
