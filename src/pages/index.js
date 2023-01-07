import React, { Component } from 'react'
import Layout from '../components/Layout'
import withSizes from 'react-sizes'
export { Head } from '../components/Head'

const title = "Kevin & Sam"
const subheading = "See the World"

class Home extends Component {
  render() {
    const isServer = (typeof window === 'undefined');
    const mediumScreen = this.props.windowWidth <= 800;

    if (isServer) {
      return renderServer()
    } else if (mediumScreen) {
      return renderMobile()
    } else {
      return renderDesktop()
    }
  }
}

const renderServer = () => (
  <Layout>
  </Layout>
)

const renderMobile = () => (
  <Layout>
    <section className='mast'>
      <header className='mast__header' >
        <h1>{title}</h1>
        <span>{subheading}</span>
      </header>
      <div className='mast__img'>
        <div className='absolute-bg' style={{
            backgroundPosition: '65%',
            backgroundImage: `url('${__PATH_PREFIX__}/home.jpg')`
          }}>
        </div>
      </div>
    </section>
  </Layout>
)

const renderDesktop = () => (
  <Layout>
    <section className='mast' style={{display: 'flex'}}>
      <header className='mast__header'>
        <h1>{title}</h1>
        <span>{subheading}</span>
      </header>
      <div className='mast__img_left'>
        <div className='absolute-bg' style={{backgroundImage: `url('${__PATH_PREFIX__}/home-left.jpg')`}}></div>
      </div>
      <div className='mast__img_right'>
        <div className='absolute-bg' style={{backgroundImage: `url('${__PATH_PREFIX__}/home-right.jpg')`}}></div>
      </div>
    </section>
  </Layout>
)

const mapSizesToProps = ({ width }) => ({
  windowWidth: width
})

export default withSizes(mapSizesToProps)(Home)
