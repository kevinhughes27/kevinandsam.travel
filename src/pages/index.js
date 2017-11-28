import React from 'react'
import { withPrefix } from 'gatsby-link'

const IndexPage = () => (
  <section className='mast'>
    <header className='mast__header'>
      <h1>Kevin & Sam</h1>
      <span>Eat. Sleep. Travel.</span>
    </header>
    <div className='mast__img bg-alpha'>
      <div className='absolute-bg' style={{backgroundImage: `url('${__PATH_PREFIX__}/mast-left.jpg')`}}></div>
    </div>
    <div className='mast__img bg-alpha'>
      <div className='absolute-bg' style={{backgroundImage: `url('${__PATH_PREFIX__}/mast-right.jpg')`}}></div>
    </div>
  </section>
)

export default IndexPage
