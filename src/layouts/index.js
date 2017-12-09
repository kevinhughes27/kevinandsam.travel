import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import GatsbyLink from 'gatsby-link'
import classNames from 'classnames'

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

const Nav = () => {
  const isHome = window.location.pathname === "/";
  const classes = classNames("header", {'home': isHome});

  return (
    <header className={classes}>
      <nav>
        <ul>
          <li>
            <GatsbyLink to="/">Home</GatsbyLink>
          </li>
          <li>
            <GatsbyLink to="/about">About Us</GatsbyLink>
          </li>
          <li>
            <GatsbyLink to="/map">Map</GatsbyLink>
          </li>
          <li>
            <GatsbyLink to="/blog">Blog</GatsbyLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

const Layout = ({ children }) => (
  <div>
    <Head />
    <Nav />
    <main>
      { children() }
    </main>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout
