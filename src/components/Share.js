import React, { Component } from 'react'
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,

  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  EmailIcon,
} from 'react-share'

class Share extends Component {
  render() {
    const {title, shareUrl, imageUrl } = this.props

    return (
      <div className="share-container">
        <div className="share-wrapper">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="share-button">
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>
        </div>

        <div className="share-wrapper">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="share-button">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>
        </div>

        <div className="share-wrapper">
          <TelegramShareButton
            url={shareUrl}
            title={title}
            className="share-button">
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </div>

        <div className="share-wrapper">
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="share-button">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>

        <div className="share-wrapper">
          <GooglePlusShareButton
            url={shareUrl}
            className="share-button">
            <GooglePlusIcon
              size={32}
              round />
          </GooglePlusShareButton>
        </div>

        <div className="share-wrapper">
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            windowWidth={750}
            windowHeight={600}
            className="share-button">
            <LinkedinIcon
              size={32}
              round />
          </LinkedinShareButton>
        </div>

        <div className="share-wrapper">
          <PinterestShareButton
            url={String(window.location)}
            media={imageUrl}
            windowWidth={1000}
            windowHeight={730}
            className="share-button">
            <PinterestIcon size={32} round />
          </PinterestShareButton>
        </div>

        <div className="share-wrapper">
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

        <div className="share-wrapper">
          <TumblrShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}
            className="share-button">
            <TumblrIcon
              size={32}
              round />
          </TumblrShareButton>
        </div>

        <div className="share-wrapper">
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="body"
            className="share-button">
            <EmailIcon
              size={32}
              round />
          </EmailShareButton>
        </div>
      </div>
    );
  }
}

export default Share
