import React, {Component} from 'react'
import InstagramEmbed from 'react-instagram-embed'

class Instagram extends Component {
  render () {
    const hideCaption = this.props.caption == 'false'

    return (
      <div className='instagram'>
        <InstagramEmbed
          url={`https://instagr.am/p/${this.props.uuid}/`}
          hideCaption={hideCaption}
          maxWidth={640}
        />
      </div>
    )
  }
}

export default Instagram
