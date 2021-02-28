import React, { Component } from 'react'
import Layout from '../components/Layout'
import withSizes from 'react-sizes'
import Slideshow from '../components/Slideshow'

class AboutPage extends Component {
  render() {
    return (
      <Layout>
        <section id="about" className="section-padding">
          <div className="grid">
            <div className="text-container">
              <p>
                In 2014, Kevin and Sam met through their mutual love of travel.
                Their first adventure together was Costa Rica where they explored the rainforest,
                went zip-lining, and enjoyed many beachside drinks.
                The trips have escalated since then from hiking the Inca Trail in Peru to a month of backpacking around China.
                Inspired by other long-term travellers they'd met Kevin and Sam often dreamt of taking a year off to
                travel the world. In 2018 they embarked on their most ambitious plan to date, they sold everything to
                become travelling nomads for 14 months.
              </p>
            </div>

            <Images windowWidth={this.props.windowWidth} />
          </div>
        </section>
      </Layout>
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
  <Slideshow>
    <img src={`${__PATH_PREFIX__}/about-1.jpg`} alt="where"/>
    <img src={`${__PATH_PREFIX__}/about-2.jpg`} alt="to"/>
    <img src={`${__PATH_PREFIX__}/about-3.jpg`} alt="next"/>
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
    <img className="content-image" src={`${__PATH_PREFIX__}/${image}`} alt={overlayText}/>
    <div className="content-details fadeIn-bottom">
      <h3>{overlayText}</h3>
    </div>
  </div>
)

const mapSizesToProps = ({ width }) => ({
  windowWidth: width
})

export default withSizes(mapSizesToProps)(AboutPage)
