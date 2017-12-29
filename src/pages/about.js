import React from 'react'
import { withPrefix } from 'gatsby-link'

const Image = (image, overlayText) => (
  <div className="image-container">
    <div className="content-overlay"></div>
    <img className="content-image" src={`${__PATH_PREFIX__}/${image}`} />
    <div className="content-details fadeIn-bottom">
      <h3>{overlayText}</h3>
    </div>
  </div>
)

const AboutPage = () => (
  <section id="about" className="section-padding bg-grey">
    <div className="grid">
      <h1 className="section-header">About Us</h1>
      <div className="text-container">
        <p className="about__text wow fadeInUp" data-wow-delay="300ms">
          Kevin and Sam met in 2014 through a mutual love of travelling. Their first adventure together was in 2015 to Costa Rica.
          Since that first trip things have only escalated, hiking the Inca trail in Peru and backpacking around China for 4 weeks.
          In 2018 Sam and Kevin are embarking on their most ambitious adventure yet -
          we are selling all of our stuff and becoming nomads to see the world.
        </p>
      </div>

      <div className="images">
        { Image('about-1.jpg', 'Where') }
        { Image('about-2.jpg', 'to') }
        { Image('about-3.jpg', 'Next') }
      </div>
    </div>
  </section>
)

export default AboutPage
