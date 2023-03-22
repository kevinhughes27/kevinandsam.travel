import React from 'react'
import withSizes from 'react-sizes'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { firstLoad } from '../utils'


class Nav extends React.Component {
  render() {
    const Search = this.props.search || <SearchDisabled />
    const compressedNav = this.props.windowWidth <= 400
    const superCompressedNav = this.props.windowWidth <= 380
    const maxCompressedNav = this.props.windowWidth <= 330
    const styles = firstLoad() ? {animation: "fadeIn 3s both 0.3s"} : {}

    return(
      <header className="header" style={styles}>
        <nav>
          <ul>
            <Item path="/" title={ compressedNav ? <HomeIcon /> : "Home" } partiallyActive={false}/>
            <Item path="/about" title={ maxCompressedNav ? "About" : "About Us" } />
            <Item path="/map" title="Map" />
            <Item path="/visit" title={ superCompressedNav ? "Visit" : "Come Visit" } />
            <BlogDropdown />
            <li>{Search}</li>
          </ul>
        </nav>
      </header>
    )
  }
}

const SearchDisabled = () => {
  return (
    <FontAwesomeIcon style={{width: '24.8px', color: 'grey'}} icon={faMagnifyingGlass} />
  )
}

const BlogDropdown = () => {
  const blogActive = () => {
    return typeof window !== `undefined` && (
      location.pathname.startsWith('/blog') ||
      ['/facebook', '/instagram'].includes(location.pathname)
    )
  }
  const btnClass = classNames('dropbtn nav-button', { 'active': blogActive()})

  return (
    <li>
      <div className="dropdown">
        <button className={btnClass}>Blog</button>
        <div className="dropdown-content">
          <Link to={"/blog"}>Articles</Link>
          <Link to={"/facebook"}>Posts</Link>
          <Link to={"/instagram"}>Photos</Link>
        </div>
      </div>
    </li>
  )
}

const Item = ({path, title, partiallyActive=true}) => (
  <li>
    <Link activeClassName="active" to={path} partiallyActive={partiallyActive}>
      {title}
    </Link>
  </li>
)

const HomeIcon = () => (
  <FontAwesomeIcon icon={faHouseChimney} />
)

const mapSizesToProps = ({ width }) => ({
  windowWidth: width
})

export default withSizes(mapSizesToProps)(Nav)
