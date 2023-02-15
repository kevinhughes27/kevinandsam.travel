import React from 'react'
import Layout from '../components/Layout'
import Slideshow from '../components/Slideshow'
import withSizes from 'react-sizes'

export { Head } from '../components/Head'

class AboutPage extends Component {
  render() {
    return (
      <Layout>
        <section id="about" className="section-padding">
          <div className="grid">
            <div className="text-container">
              <p>
                In 2014, Kevin and Sam met through their mutual love of travel.
                Our first adventure together was Costa Rica where we explored rainforests,
                went zip-lining, and enjoyed many beachside drinks. The trips have escalated
                since from hiking the Inca Trail in Peru to a month of backpacking around China.
              </p>
              <p>
                Inspired by other long-term travellers we'd met it was our dream to take a year and
                travel around the world. In 2018 we got our chance and embarked on our most ambitious
                trip yet - we sold everything and became travelling nomads for 14 months.
              </p>
              <p>
                These days our travelling is a bit more tame and family friendly but it's still our passion
                and we travel whenever we can.
              </p>
            </div>

            <Images windowWidth={this.props.windowWidth} />
          </div>
        </section>
      </Layout>
    )
  }
}

class Images extends React.Component {
  render() {
    const isServer = (typeof window === 'undefined');
    const mediumScreen = this.props.windowWidth <= 768;

    if (isServer) {
      return null
    } else if (mediumScreen) {
      return renderMobile()
    } else {
      return renderDesktop()
    }
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
