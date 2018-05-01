import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import pick from 'random-pick'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(brands)

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-responsive-select/dist/ReactResponsiveSelect.css'
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

    const meta = [
      { property: "keywords", content: "travel, backpacking, digital nomad" },
    ]

    return (
      <div>
        <Helmet title={title} meta={meta}/>
        <Nav />
        <main>
          { children() }
        </main>
      </div>
    )
  }
}

const Nav = () => (
  <header className="header">
    <nav>
      <ul>
        <Item path="/" title="Home" />
        <Item path="/about" title="About Us" />
        <Item path="/map" title="Map" />
        <Item path="/visit" title="Come Visit" />
        <Item path="/blog" title="Blog" />
        <InstagramLink />
      </ul>
    </nav>
  </header>
)

const Item = ({path, title}) => (
  <li>
    <Link activeClassName="active" to={path} exact>
      {title}
    </Link>
  </li>
)

const InstagramLink = () => (
  <li>
    <a href={`https://instagram.com/${randomAccount()}`} target='_blank'>
      <FontAwesomeIcon icon={["fab", "instagram"]} />
    </a>
  </li>
)

const randomAccount = () => (
  pick(['kevinhughes27', 'samcluthe', 'kevinhughes27'])[0]
)

export default Layout
