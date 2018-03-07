import React, { Component } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  GooglePlusShareButton,
  PinterestShareButton,
  RedditShareButton,

  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
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
            quote={title}
            className="share-button">
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="share-button">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>

          <GooglePlusShareButton
            url={shareUrl}
            className="share-button">
            <GooglePlusIcon
              size={32}
              round />
          </GooglePlusShareButton>

          <PinterestShareButton
            url={String(window.location)}
            media={imageUrl}
            windowWidth={1000}
            windowHeight={730}
            className="share-button">
            <PinterestIcon size={32} round />
          </PinterestShareButton>

          <RedditShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}
            className="share-button">
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
