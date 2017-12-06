import React from 'react'
import { withPrefix } from 'gatsby-link'

// about classes aren't in scss files. might be missing might be extra.

const AboutPage = () => (
  <section id="about" className="section-padding bg-grey">
    <div className="grid">
      <h1 className="section-header">About Us</h1>
      <div className="about-text">
        <p className="about__text wow fadeInUp" data-wow-delay="300ms">
          Fixie quinoa hot chicken, 8-bit tousled jianbing portland yr truffaut beard. Dreamcatcher ethical brunch authentic kale chips. Hell of raclette tumblr, organic kinfolk locavore occupy gastropub pinterest. Ramps squid la croix, chicharrones gochujang fixie try-hard bitters.
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
