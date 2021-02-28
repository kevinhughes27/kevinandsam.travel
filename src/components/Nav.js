import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withSizes from 'react-sizes'
import { Link } from 'gatsby'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import faHome from '@fortawesome/fontawesome-free-solid/faHome'

fontawesome.library.add(brands)

class Nav extends Component {
  static propTypes = {
    windowWidth: PropTypes.number,
  }

  render() {
    const compressedNav = this.props.windowWidth <= 375

    const styles = firstLoad() ? {animation: "fadeIn 3s both 0.3s"} : {}

    return(
      <header className="header" style={styles}>
        <nav>
          <ul>
            <Item path="/" title={ compressedNav ? <HomeIcon /> : "Home" } />
            <Item path="/about" title="About Us" />
            <Item path="/map" title="Map" />
            <Item path="/visit" title={ compressedNav ? "Visit" : "Come Visit" } />
            <Item path="/blog" title="Blog" />
            <InstagramLink />
          </ul>
        </nav>
      </header>
    )
  }
}

const firstLoad = () => {
  if (window.hasLoaded === true) {
    return false
  } else {
    window.hasLoaded = true;
    return true
  }
}

const Item = ({path, title}) => (
  <li>
    <Link activeClassName="active" to={path}>
      {title}
    </Link>
  </li>
)

const HomeIcon = () => (
  <FontAwesomeIcon icon={faHome} />
)

const InstagramLink = () => (
  <li>
    <a href={`https://instagram.com/kevinhughes27`} target='_blank' rel="noreferrer">
      <FontAwesomeIcon icon={["fab", "instagram"]} />
    </a>
  </li>
)

const mapSizesToProps = ({ width }) => ({
  windowWidth: width
})

export default withSizes(mapSizesToProps)(Nav)
