import React from 'react'
import Layout from '../components/Layout'
import TravellingTo from '../components/TravellingTo'
import PhotoAlbum from 'react-photo-album'
import { graphql } from 'gatsby'

export { Head } from '../components/Head'

function locationText(places) {
  if (places.length === 1) {
    const latlng = `${places[0].coordinate.latitude},${places[0].coordinate.longitude}`
    const link = `https://www.google.com/maps/?q=${latlng}`
    return (
      <span> at <a style={{textDecoration: "none"}} target="_blank" href={link}>{places[0].name}</a></span>
    )
  } else if (places.length === 2) {
    let emoji = '✈️'
    if (places[0].name.startsWith("London")) { emoji = "🚋" }
    return ` is ${emoji} travelling from ${places[1].name} to ${places[0].name}`
  } else {
    return null
  }
}

function Post(post) {
  const { author, text, places, timestamp } = post
  const date = new Date(timestamp*1000).toDateString()

  const images = post.images.map(img => img.childrenImageSharp[0].original)
  const videos = post.videos.map(vid => ({
    src: vid.src.publicURL,
    type: "video/mp4",
    width: vid.width,
    height: vid.height,
    duration: vid.duration,
  }))
  const photos = [...images, ...videos]
  const maxPhotos = photos.length === 3 ? 2 : 3

  return (
    <div key={post.id} className="fb-post">
      <div className="fb-author">
        <img src={`${__PATH_PREFIX__}/${author.toLowerCase()}.jpg`} alt={author} />
        <div>
          <strong>{author}</strong> {locationText(places)}
          <p>{date}</p>
        </div>
      </div>

      <p>{text}</p>

      <PhotoAlbum
        layout="rows"
        spacing={2}
        targetRowHeight={400}
        defaultContainerWidth={600}
        rowConstraints={{maxPhotos: maxPhotos}}
        photos={photos}
        renderPhoto={({ photo: { src, type, duration }, layout: { width } }) => {
          if ((type || "").startsWith("video")) {
            return (
              <video
                controls
                playsInline
                autoPlay={duration < 10}
                disablePictureInPicture
                width={Math.round(width)}
                style={{ objectFit: "cover" }}
              >
                <source type={type} src={src} />
              </video>
            );
          }
        }}
      />

      { places.length == 2 ? <TravellingTo from={places[1]} to={places[0]} /> : null }
    </div>
  );
}

class Index extends React.Component {
  constructor() {
    super()
    let postsToShow = 4
    this.state = {
      postsToShow
    }
  }

  update() {
    const distanceToBottom = document.documentElement.offsetHeight - (window.scrollY + window.innerHeight)
    if (distanceToBottom < 300) {
      this.setState({ postsToShow: this.state.postsToShow + 4 })
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
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
  }

  render() {
    const posts = this.props.data.allPostsJson.nodes
    const postsToShow = posts.slice(0, this.state.postsToShow)

    return (
      <Layout>
        <section className="section-padding bg-white">
          <div className="grid">
            {postsToShow.map(Post)}
          </div>
        </section>
      </Layout>
    );
  }
}

export default Index

export const pageQuery = graphql`
  query IndexQuery {
    allPostsJson(sort: {timestamp: DESC}) {
      nodes {
        id
        author
        text
        timestamp
        places {
          name
          coordinate {
            latitude
            longitude
          }
        }
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
