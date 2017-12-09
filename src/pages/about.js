import React from 'react'
import { withPrefix } from 'gatsby-link'

// about classes aren't in scss files. might be missing might be extra.

const AboutPage = () => (
  <section id="about" className="section-padding bg-grey">
    <div className="grid">
      <div className="about-text">
        <p className="about__text wow fadeInUp" data-wow-delay="300ms">
          Kevin and Sam met in 2014 through a mutual love of travelling. Their first adventure together was in 2015 to Costa Rica.
          Since that first trip things have only escalated, hiking the Inca trail in Peru and backpacking around China for 4 weeks.
          In 2018 Sam and Kevin are embarking on their most ambitious adventure yet -
          we are selling all of our stuff and becoming nomads to see the world.
        </p>
      </div>

      <div className="container-triple">
        <div className="container-item">
          <div className="image-container">
            <div className="content-overlay"></div>
            <img className="content-image" src={`${__PATH_PREFIX__}/about-1.jpg`} />
            <div className="content-details fadeIn-bottom">
              <h3>Where</h3>
            </div>
          </div>
        </div>

        <div className="container-item">
          <div className="image-container">
            <div className="content-overlay"></div>
            <img className="content-image" src={`${__PATH_PREFIX__}/about-2.jpg`} />
            <div className="content-details fadeIn-bottom">
              <h3>to</h3>
            </div>
          </div>
        </div>

        <div className="container-item">
          <div className="image-container">
            <div className="content-overlay"></div>
            <img className="content-image" src={`${__PATH_PREFIX__}/about-3.jpg`} />
            <div className="content-details fadeIn-bottom">
              <h3>Next?</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default AboutPage
