import React from 'react'
import Layout from '../components/Layout'
import TravellingTo from '../components/TravellingTo'
import InfinteScroll from '../components/InfiniteScroll'
import Search from '../components/Search'
import Loader from '../components/Loader'
import PhotoAlbum from 'react-photo-album'
import { graphql } from 'gatsby'

export { Head } from '../components/Head'

class Post extends React.Component {
  render() {
    const post = this.props.post
    const { author, text, places, timestamp } = post
    const date = new Date(timestamp*1000).toDateString()

    const images = post.images.map(img => img.childrenImageSharp[0].original)
    const videos = post.videos.map(vid => ({
      src: vid.src.publicURL,
      type: 'video/mp4',
      width: vid.width,
      height: vid.height,
      duration: vid.duration,
    }))
    const photos = [...images, ...videos]
    const maxPhotos = photos.length === 3 ? 2 : 3

    return (
      <div className='fb-post'>
        <div className='fb-author'>
          <img src={`${__PATH_PREFIX__}/${author.toLowerCase()}.jpg`} alt={author} />
          <div>
            <strong>{author}</strong> {this.renderLocation(places)}
            <p>{date}</p>
          </div>
        </div>

        <p>{text}</p>

        <PhotoAlbum
          layout='rows'
          spacing={2}
          defaultContainerWidth={600}
          rowConstraints={{maxPhotos: maxPhotos}}
          photos={photos}
          renderPhoto={({ photo: { src, type, duration }, layout: { width } }) => {
            if ((type || '').startsWith('video')) {
              return (
                <video
                  controls
                  playsInline
                  autoPlay={duration < 10}
                  loop={duration < 2}
                  disablePictureInPicture
                  width={Math.round(width)}
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

  renderLocation(places) {
    if (places.length === 1) {
      const place = places[0]
      const latlng = `${place.coordinate.latitude},${place.coordinate.longitude}`
      const link = `https://www.google.com/maps/?q=${latlng}`
      return (
        <span> at <a target='_blank' href={link}>{place.name}</a></span>
      )
    } else if (places.length === 2) {
      let emoji = '✈️'
      if (places[0].name.startsWith('London')) { emoji = '🚋' }
      return ` is ${emoji} travelling from ${places[1].name} to ${places[0].name}`
    } else {
      return null
    }
  }
}

class Index extends React.Component {
  constructor(props) {
    super(props)

    const posts = props.data.allFacebookPostsJson.nodes // is desc
    const range = [
      posts[posts.length - 1].timestamp,
      posts[0].timestamp
    ]

    this.state = {
      search: "",
      range: range,
      order: "desc"
    }
  }

  render() {
    const posts = this.props.data.allFacebookPostsJson.nodes // is desc
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
          <div className='grid'>
            {postsToShow.map(p => <Post key={p.id} post={p}/>)}
            {showLoader ? <Loader/> : null}
          </div>
        </section>
      </Layout>
    );
  }
}

export default InfinteScroll(Index, {
  uid: 'fb',
  initialSize: 4,
  loadSize: 4,
  threshold: 300
})

export const pageQuery = graphql`
  query IndexQuery {
    allFacebookPostsJson(sort: {timestamp: DESC}) {
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
