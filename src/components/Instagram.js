import React, {Component} from 'react'
import InstagramEmbed from 'react-instagram-embed'

class Instagram extends Component {
  render () {
    const hideCaption = this.props.caption == 'false'

    return (
      <div className='instagram'>
        <InstagramEmbed
          url={`https://instagr.am/p/${this.props.uuid}/`}
          clientAccessToken='1309344542748164|71e510ebaf3241868b9e00ae3ad456b3'
          hideCaption={hideCaption}
          maxWidth={640}
          injectScript={false}
        />
      </div>
    )
  }
}

export default Instagram
