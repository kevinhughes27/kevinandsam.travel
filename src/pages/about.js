import React, { Component } from 'react'
import windowSize from 'react-window-size'
import Slideshow from '../components/Slideshow'
import { withPrefix } from 'gatsby-link'

class AboutPage extends Component {
  render() {
    return (
      <section id="about" className="section-padding">
        <div className="grid">
          <div className="text-container">
            <p>
              In 2014, Kevin and Sam met through their mutual love of travel.
              Their first adventure together was in Costa Rica where they explored the rainforest,
              went zip-lining, and enjoyed many beachside drinks.
              Since then the trips have escalated from hiking the Inca Trail in Peru to backpacking China for a month.
              Now it’s time for Kevin and Sam to embark on their most ambitious plan to date,
              sell everything and become traveling nomads.
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
    if (this.props.windowWidth === 0) { return null }
    const mediumScreen = this.props.windowWidth <= 768;
    return mediumScreen ? renderMobile() : renderDesktop();
  }
}

const renderMobile = () => (
  <Slideshow>
    <img src={`${__PATH_PREFIX__}/about-1.jpg`} />
    <img src={`${__PATH_PREFIX__}/about-2.jpg`} />
    <img src={`${__PATH_PREFIX__}/about-3.jpg`} />
  </Slideshow>
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
