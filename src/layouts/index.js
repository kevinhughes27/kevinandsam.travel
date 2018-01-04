import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Nav from '../components/Nav'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '../styles/vendor/leaflet.css'
import '../styles/index.scss'

class Layout extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.func,
  }

  render() {
    const title = "kevinandsam.travel"
    const children = this.props.children;
    const path = this.props.location.pathname;

    return (
      <div>
        <Helmet title={title} meta={[]} />
        <Nav path={path} />
        <main>
          { children() }
        </main>
      </div>
    )
  }
}

export default Layout
