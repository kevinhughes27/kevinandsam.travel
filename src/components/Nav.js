import React, {Component} from 'react'
import GatsbyLink from 'gatsby-link'

class Nav extends Component {
  render () {
    return (
      <header className="header">
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
