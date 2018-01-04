import React, { Component } from 'react'
import windowSize from 'react-window-size'
import { withPrefix } from 'gatsby-link'

const title = "Kevin & Sam"
const subheading = "See the World"

class Home extends Component {
  render() {
    const mediumScreen = this.props.windowWidth <= 768;
    return mediumScreen ? renderMobile() : renderDesktop();
  }
}

const renderMobile = () => (
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
)

const renderDesktop = () => (
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
)

export default windowSize(Home)
