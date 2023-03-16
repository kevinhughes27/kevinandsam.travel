import React from 'react'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import InfinteScroll from '../components/InfiniteScroll'
import Search from '../components/Search'
import Loader from '../components/Loader'
import PhotoAlbum from 'react-photo-album'
import Swipe from 'react-easy-swipe'
import { Carousel } from 'react-responsive-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faPlayCircle, faCaretRight, faCaretLeft } from '@fortawesome/fontawesome-free-solid'
import { graphql } from 'gatsby'
import mousetrap from 'mousetrap'

export { Head } from '../components/Head'

class Post extends React.Component {
  render() {
    const post = this.props.post
    const { author, text, timestamp } = post
    const date = new Date(timestamp*1000).toDateString()

    return (
      <div id={post.id} className='ig-post' onClick={(e) => e.stopPropagation()} >
        <div className='media-container'>
          {this.renderPostMedia(post)}
        </div>
        <Swipe
          className='post-details'
          tolerance={80}
          onSwipeLeft={() => this.props.next()}
          onSwipeRight={() => this.props.prev()}
        >
          <div className='author'>
            <img src={`${__PATH_PREFIX__}/${author.toLowerCase()}.jpg`} alt={author} />
            <div>
              <strong>{author}</strong>
              <p>{this.renderLocation(post)}</p>
              <p>{date}</p>
            </div>
          </div>
          <div className='text'>
            <p>{text}</p>
          </div>
        </Swipe>
      </div>
    )
  }

  renderLocation(post) {
    if (post.places.length > 0) {
      const place = post.places[0]
      const latlng = `${place.latitude},${place.longitude}`
      const link = `https://www.google.com/maps/?q=${latlng}`
      return (<a target='_blank' href={link}>{place.name}</a>)
    } else {
      return null
    }
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
        autoPlay={false}
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
  constructor(props) {
    super(props)

    const posts = props.data.allInstagramPostsJson.nodes // is desc
    const range = [
      posts[posts.length - 1].timestamp,
      posts[0].timestamp
    ]

    this.state = {
      activePost: null,
      search: "",
      range: range,
      order: "desc"
    }
  }

  componentDidMount() {
    mousetrap.bind(`left`, () => this.previousPost())
    mousetrap.bind(`right`, () => this.nextPost())
    mousetrap.bind(`space`, () => this.nextPost())
  }

  componentWillUnmount() {
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

    if (this.modalIsOpened()) {
      const activePost = this.state.activePost
      const prevIndex = Math.max(activePost - 1, 0)

      this.setState({ activePost: prevIndex })
    }
  }

  nextPost(event) {
    if (event) {
      event.stopPropagation()
    }

    if (this.modalIsOpened()) {
      const activePost = this.state.activePost
      const posts = this.props.data.allInstagramPostsJson.nodes
      const nextIndex = Math.min(activePost + 1, posts.length - 1)

      this.setState({ activePost: nextIndex })
    }
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
          { activePost !== null ?
              <Post
                post={(posts[activePost])}
                next={() => this.nextPost()}
                prev={() => this.previousPost()}
              />
            : null
          }
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
    const rangeBounds = [
      posts[posts.length - 1].timestamp,
      posts[0].timestamp
    ]

    const filteredPosts = posts.filter((post) => {
      // check range
      if (post.timestamp < this.state.range[0] || post.timestamp > this.state.range[1]) {
        return false
      }

      // check search
      if (this.state.search.length > 3) {
        return post.places.some((place) => (
            place.name.toLowerCase().includes(this.state.search.toLowerCase())
          )) || post.text.toLowerCase().includes(this.state.search.toLowerCase())
      } else {
        return true
      }
    })

    let sortedPosts = filteredPosts
    if (this.state.order === "asc") {
      sortedPosts = filteredPosts.reverse()
    }

    const postsToShow = sortedPosts.slice(0, this.props.show)
    const showLoader = postsToShow.length < sortedPosts.length

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
      <Layout search={
        <Search
          start={rangeBounds[0]}
          end={rangeBounds[1]}
          search={this.state.search}
          range={this.state.range}
          order={this.state.order}
          searchChange={(state) => {
            this.setState(state)
            this.props.resetInfiniteScroll()
          }}
        />
      }>
        <section className='section-padding bg-white' style={{opacity: this.props.ready ? 1 : 0}}>
          {this.renderModal()}
          <div className='grid ig-grid'>
            <PhotoAlbum
              layout='rows'
              rowConstraints={{
                maxPhotos: 3
              }}
              spacing={(containerWidth) => {
                if (containerWidth < 600) return 5
                if (containerWidth < 1200) return 10
                return 15
              }}
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
          {showLoader ? <Loader/> : null}
        </section>
      </Layout>
    );
  }
}

export default InfinteScroll(Index, {
  uid: 'ig',
  initialSize: 24,
  loadSize: 6,
  threshold: 100
})

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
        places {
          name
          latitude
          longitude
        }
      }
    }
  }
`
