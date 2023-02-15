import React from 'react'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import PhotoAlbum from 'react-photo-album'
import { Carousel } from 'react-responsive-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faPlayCircle, faCaretRight, faCaretLeft } from '@fortawesome/fontawesome-free-solid'
import { graphql } from 'gatsby'
import mousetrap from 'mousetrap'

export { Head } from '../components/Head'

const initialPostsToShow = 24
const loadInc = 6
const storageKey = 'ig-postsToShow'

class Post extends React.Component {
  constructor() {
    super()
  }

  render() {
    const post = this.props.post
    const { author, text, timestamp } = post
    const date = new Date(timestamp*1000).toDateString()

    return (
      <div className='ig-post' onClick={(e) => e.stopPropagation()}>
        <div className='media-container'>
          {this.renderPostMedia(post)}
        </div>
        <div className='post-details'>
          <div className='author'>
            <img src={`${__PATH_PREFIX__}/${author.toLowerCase()}.jpg`} alt={author} />
            <div>
              <strong>{author}</strong>
              <p>{date}</p>
            </div>
          </div>
          <div className='text'>
            <p>{text}</p>
          </div>
        </div>
      </div>
    )
  }

  renderPostMedia(post) {
    const images = post.images.map(i => i.childrenImageSharp[0].original.src)
    const videos = post.videos.map(vid => ({
      src: vid.src.publicURL,
      type: 'video/mp4'
    }))

    if (images.length == 1) {
      return (<img className='media' src={images[0]} />)
    } else if (images.length > 1) {
      return this.renderPostCarousel(images, videos)
    } else if (videos.length == 1) {
      return this.renderPostVideo(videos[0])
    }
  }

  renderPostCarousel(images, videos) {
    return (
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
      >
        {images.map(img => (<img src={img}/>))}
        {videos.map(vid => this.renderPostVideo(vid))}
      </Carousel>
    )
  }

  renderPostVideo(video) {
    return (
      <video
        controls
        playsInline
        disablePictureInPicture
        className='media'>
        <source type={video.type} src={video.src} />
      </video>
    )
  }
}

class Index extends React.Component {
  constructor() {
    super()
    let postsToShow = initialPostsToShow

    if (typeof window !== `undefined`) {
      postsToShow = parseInt(sessionStorage.getItem(storageKey)) || initialPostsToShow
    }

    this.state = {
      postsToShow,
      activePost: null
    }
  }

  update() {
    const distanceToBottom = document.documentElement.offsetHeight - (window.scrollY + window.innerHeight)
    if (distanceToBottom < 100) {
      const postsToShow = this.state.postsToShow + loadInc
      sessionStorage.setItem(storageKey, postsToShow)
      this.setState({ postsToShow })
    }
    this.ticking = false
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update())
    }
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll)
    mousetrap.bind(`left`, () => this.previousPost())
    mousetrap.bind(`right`, () => this.nextPost())
    mousetrap.bind(`space`, () => this.nextPost())
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
    mousetrap.unbind(`left`)
    mousetrap.unbind(`right`)
    mousetrap.unbind(`space`)
  }

  onClick(index) {
    this.setState({activePost: index})
  }

  modalIsOpened() {
    return this.state.activePost !== null
  }

  closeModal() {
    this.setState({activePost: null})
  }

  previousPost(event) {
    if (event) {
      event.stopPropagation()
    }

    const activePost = this.state.activePost
    const prevIndex = Math.max(activePost - 1, 0)
    this.setState({ activePost: prevIndex })
  }

  nextPost(event) {
    if (event) {
      event.stopPropagation()
    }

    const activePost = this.state.activePost
    const posts = this.props.data.allInstagramPostsJson.nodes
    const nextIndex = Math.min(activePost + 1, posts.length)

    // load more posts if necessary
    let postsToShow = this.state.postsToShow
    if (nextIndex >= postsToShow) {
      postsToShow += loadInc
    }

    this.setState({ postsToShow, activePost: nextIndex })
  }

  renderModal() {
    const activePost = this.state.activePost
    const posts = this.props.data.allInstagramPostsJson.nodes

    return (
      <Modal
        isOpen={this.modalIsOpened()}
        close={() => this.closeModal()}
      >
        <FontAwesomeIcon icon={faCaretLeft} className='ig-modal-caret'
          onClick={(e) => this.previousPost(e)}
        />
        { activePost !== null ? <Post post={(posts[activePost])}/> : null }
        <FontAwesomeIcon icon={faCaretRight} className='ig-modal-caret'
          onClick={(e) => this.nextPost(e)}
        />
      </Modal>
    )
  }

  renderGalleryVideo(index, type, src, width) {
    return (
      <div style={{ position: 'relative' }}>
        <video
          width={Math.round(width)}
          onClick={() => this.onClick(index)}
        >
          <source type={type} src={src} />
        </video>
        <FontAwesomeIcon className='ig-gallery-icon' icon={faPlayCircle} />
      </div>
    )
  }

  renderGalleryPhoto(index, wrapperStyle, renderDefaultPhoto) {
    const post = this.props.data.allInstagramPostsJson.nodes[index]
    return (
      <div style={{ position: 'relative', ...wrapperStyle }}>
        {renderDefaultPhoto({ wrapped: true })}
        { post.images.length > 1 ? <FontAwesomeIcon className='ig-gallery-icon' icon={faImages} /> : null }
      </div>
    )
  }

  render() {
    const posts = this.props.data.allInstagramPostsJson.nodes
    const postsToShow = posts.slice(0, this.state.postsToShow)

    const photos = postsToShow.map((post) => {
      const images = post.images.map(img => img.childrenImageSharp[0].original)
      const videos = post.videos.map(vid => ({
        src: vid.src.publicURL,
        type: 'video/mp4',
        width: vid.width,
        height: vid.height,
        duration: vid.duration,
      }))
      return [...images, ...videos][0]
    })

    return (
      <Layout>
        <section className='section-padding bg-white'>
          {this.renderModal()}
          <div className='grid ig-grid'>
            <PhotoAlbum
              layout='rows'
              photos={photos}
              onClick={({ index }) => this.onClick(index)}
              renderPhoto={({ photo, layout: { index, width }, wrapperStyle, renderDefaultPhoto }) => {
                if ((photo.type || '').startsWith('video')) {
                  return this.renderGalleryVideo(index, photo.type, photo.src, width)
                } else {
                  return this.renderGalleryPhoto(index, wrapperStyle, renderDefaultPhoto)
                }
              }}
            />
          </div>
        </section>
      </Layout>
    );
  }
}

export default Index

export const pageQuery = graphql`
  query IndexQuery {
    allInstagramPostsJson(sort: {timestamp: DESC}) {
      nodes {
        id
        author
        text
        timestamp
        images {
          childrenImageSharp {
            original {
              src
              width
              height
            }
          }
        }
        videos {
          src {
            publicURL
          }
          width
          height
          duration
        }
      }
    }
  }
`
