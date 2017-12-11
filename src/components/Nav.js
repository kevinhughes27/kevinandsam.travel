import React, {Component} from 'react'
import GatsbyLink from 'gatsby-link'
import classNames from 'classnames'

function isHome() {
  if (typeof window !== `undefined`) {
    return window.location.pathname === '/home';
  } else {
    return true;
  }
}

class Nav extends Component {
  render () {
    const classes = classNames("header", {'home': isHome()});

    return (
      <header className={classes}>
        <nav>
          <ul>
            <li>
              <GatsbyLink to="/home">Home</GatsbyLink>
            </li>
            <li>
              <GatsbyLink to="/about">About Us</GatsbyLink>
            </li>
            <li>
              <GatsbyLink to="/map">Map</GatsbyLink>
            </li>
            <li>
              <GatsbyLink to="/blog">Blog</GatsbyLink>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Nav
