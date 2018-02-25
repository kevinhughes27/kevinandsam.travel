import React, {Component} from 'react'
import YouTube from 'react-youtube'

class Video extends Component {
  render () {
    return (
      <div className="video-responsive">
        <YouTube videoId={this.props.uuid}/>
      </div>
    )
  }
}

export default Video
