import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import windowSize from 'react-window-size'
import pick from 'random-pick'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import faHome from '@fortawesome/fontawesome-free-solid/faHome'

fontawesome.library.add(brands)

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-responsive-select/dist/ReactResponsiveSelect.css'
import '../styles/vendor/leaflet.css'
import '../styles/index.scss'

class Layout extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    windowWidth: PropTypes.number,
    children: PropTypes.func,
  }

  render() {
    const title = "kevinandsam.travel"
    const children = this.props.children;
    const compressedNav = this.props.windowWidth <= 375

    const meta = [
      { property: "keywords", content: "travel, backpacking, digital nomad" },
    ]

    const script = [
      { src: 'https://platform.instagram.com/en_US/embeds.js', type: 'text/javascript', async: true, defer: true }
    ]

    return (
      <div>
        <Helmet title={title} meta={meta} script={script} />
        <Nav compressed={compressedNav} />
        <main>
          { children() }
        </main>
      </div>
    )
  }
}

const Nav = ({compressed}) => (
  <header className="header">
    <nav>
      <ul>
        <Item path="/" title={ compressed ? <HomeIcon /> : "Home" } />
        <Item path="/about" title="About Us" />
        <Item path="/map" title="Map" />
        <Item path="/visit" title={ compressed ? "Visit" : "Come Visit" } />
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

const HomeIcon = () => (
  <FontAwesomeIcon icon={faHome} />
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

export default windowSize(Layout)
