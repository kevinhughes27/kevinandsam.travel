import React, {Component} from 'react'
import Link from 'gatsby-link'

const Item = ({path, title}) => (
  <li>
    <Link activeClassName="active" to={path}>
      {title}
    </Link>
  </li>
)

class Nav extends Component {
  render () {
    const path = this.props.path;

    if (path === '/') {
      return <div></div>
    }

    return (
      <header className="header">
        <nav>
          <ul>
            <Item path="/home" title="Home" />
            <Item path="/about" title="About Us" />
            <Item path="/map" title="Map" />
            <Item path="/blog" title="Blog" />
          </ul>
        </nav>
      </header>
    )
  }
}

export default Nav
