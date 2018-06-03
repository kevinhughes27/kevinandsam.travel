import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Nav from '../components/Nav'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-responsive-select/dist/ReactResponsiveSelect.css'
import '../styles/vendor/leaflet.css'
import '../styles/index.scss'

class Layout extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.func
  }

  render() {
    const title = "kevinandsam.travel"
    const children = this.props.children;

    const meta = [
      { property: "keywords", content: "travel, backpacking, digital nomad" },
    ]

    const script = [
      { src: 'https://platform.instagram.com/en_US/embeds.js', type: 'text/javascript', async: true, defer: true }
    ]

    return (
      <div>
        <Helmet title={title} meta={meta} script={script} />
        <Nav />
        <main>
          { children() }
        </main>
      </div>
    )
  }
}

export default Layout
