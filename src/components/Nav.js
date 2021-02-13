import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import pick from 'random-pick'
import withSizes from 'react-sizes'

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

    return(
      <header className="header">
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
    <a href={`https://instagram.com/kevinhughes27`} target='_blank'>
      <FontAwesomeIcon icon={["fab", "instagram"]} />
    </a>
  </li>
)

const mapSizesToProps = ({ width }) => ({
  windowWidth: width
})

export default withSizes(mapSizesToProps)(Nav)
