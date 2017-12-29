import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Nav from '../components/Nav'
import '../styles/index.scss'

class Layout extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.func,
  }

  render() {
    const title = "kevinandsam.travel"
    const location = this.props.location.pathname;
    const children = this.props.children;

    const nav = location !== '/'
      ? <Nav />
      : null

    return (
      <div>
        <Helmet title={title} meta={[]} />
        { nav }
        <main>
          { children() }
        </main>
      </div>
    )
  }
}

export default Layout
