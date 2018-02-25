import React, {Component} from 'react'

class YouTube extends Component {
  render () {
    return (
      <div className="video-responsive">
        <iframe
          frameBorder="0"
          src={`https://www.youtube.com/embed/${this.props.uuid}?rel=0&amp;showinfo=0`}
          gesture="media"
          allow="encrypted-media"
          allowFullScreen>
        </iframe>
      </div>
    )
  }
}

export default YouTube
