import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Nav from '../components/Nav'
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
