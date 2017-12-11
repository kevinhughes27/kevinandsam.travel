import React, { Component } from 'react'
import windowSize from 'react-window-size'
import { withPrefix } from 'gatsby-link'

class Home extends Component {
  render() {
    const smallScreen = this.props.windowWidth < 667;
    return smallScreen ? renderMobile() : renderDesktop();
  }
}

const renderMobile = () => (
  <section className='mast'>
    <header className='mast__header'>
      <h1>Kevin & Sam</h1>
      <span>Eat. Sleep. Travel.</span>
    </header>
    <div className='mast__img bg-alpha'>
      <div className='absolute-bg' style={{backgroundImage: `url('${__PATH_PREFIX__}/home.jpg')`}}></div>
    </div>
  </section>
)

const renderDesktop = () => (
  <section className='mast' style={{display: 'flex'}}>
    <header className='mast__header'>
      <h1>Kevin & Sam</h1>
      <span>Eat. Sleep. Travel.</span>
    </header>
    <div className='mast__img_left bg-alpha'>
      <div className='absolute-bg' style={{backgroundImage: `url('${__PATH_PREFIX__}/home-left.jpg')`}}></div>
    </div>
    <div className='mast__img_right bg-alpha'>
      <div className='absolute-bg' style={{backgroundImage: `url('${__PATH_PREFIX__}/home-right.jpg')`}}></div>
    </div>
  </section>
)
  

export default windowSize(Home)
