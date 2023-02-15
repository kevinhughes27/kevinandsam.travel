import React from 'react'
import withSizes from 'react-sizes'
import { Link } from 'gatsby'

import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import faHome from '@fortawesome/fontawesome-free-solid/faHome'
import { firstLoad } from '../utils'

fontawesome.library.add(brands)

class Nav extends React.Component {
  render() {
    const compressedNav = this.props.windowWidth <= 375

    const styles = firstLoad() ? {animation: "fadeIn 3s both 0.3s"} : {}

    return(
      <header className="header" style={styles}>
        <nav>
          <ul>
            <Item path="/" title={ compressedNav ? <HomeIcon /> : "Home" } partiallyActive={false}/>
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

const Item = ({path, title, partiallyActive=true}) => (
  <li>
    <Link activeClassName="active" to={path} partiallyActive={partiallyActive}>
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
