import React, {Component} from 'react'

class Gif extends Component {
  render () {
    return (
      <div className="gif">
        <img src={this.props.src}/>
        <figcaption>
          { this.props.caption }
        </figcaption>
      </div>
    )
  }
}

export default Gif
