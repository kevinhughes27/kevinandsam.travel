import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import GatsbyLink from 'gatsby-link'

import '../styles/index.scss'

const Head = () => (
  <Helmet
    title="kevinandsam.travel"
    meta={[
      { name: 'description', content: 'Sample' },
      { name: 'keywords', content: 'sample, something' },
    ]}
  />
)

const TopNav = () => (
  <header className="header">
    <a href="/">
      <figure className="header__img">
      </figure>
    </a>
    <nav>
      <ul className="header__list">
        <li>
          <GatsbyLink to="/">Home</GatsbyLink>
        </li>
        <li>
          <GatsbyLink to="/about">About</GatsbyLink>
        </li>
        <li>
          <GatsbyLink to="/blog">Blog</GatsbyLink>
        </li>
      </ul>
    </nav>
  </header>
)

const Layout = ({ children }) => (
  <div id="home">
    <Head />
    <TopNav />
    <main>
      {children()}
    </main>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout
