import React, { Component } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  RedditShareButton,

  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  RedditIcon
} from 'react-share'

class Share extends Component {
  render() {
    const {title, shareUrl, imageUrl } = this.props

    return (
      <div className="share-container">
        <div className="share-buttons">
          <FacebookShareButton
            url={shareUrl}
            quote={title}>
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={title}>
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>

          <PinterestShareButton
            url={shareUrl}
            media={imageUrl}
            windowWidth={1000}
            windowHeight={730}>
            <PinterestIcon size={32} round />
          </PinterestShareButton>

          <RedditShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}>
            <RedditIcon
              size={32}
              round />
          </RedditShareButton>
        </div>
      </div>
    );
  }
}

export default Share
