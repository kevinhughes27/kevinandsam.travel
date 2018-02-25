import React, {Component} from 'react'

class Photo extends Component {
  render () {
    return (
      <figure>
        <img src={this.props.src}/>
        <figcaption>
          { this.props.caption }
        </figcaption>
      </figure>
    )
  }
}

export default Photo
