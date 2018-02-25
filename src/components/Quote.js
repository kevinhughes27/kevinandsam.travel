import React, {Component} from 'react'

class Quote extends Component {
  render () {
    return (
      <p>
        <blockquote>
          { this.props.children }
        </blockquote>
      </p>
    )
  }
}

export default Quote
