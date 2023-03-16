import React from 'react'
import Layout from '../components/Layout'
import TravellingTo from '../components/TravellingTo'
import InifinteScroll from '../components/InfiniteScroll'
import PhotoAlbum from 'react-photo-album'
import { Range } from 'react-range'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import { format } from 'date-fns'
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

// this will actually be a shared form for each "blog" page I think
// the range slider doesn't handle dates yet
// add a close button that hides the search form. clicking on the search icon to close is annoying
class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  render() {
    const toggleDropdown = () => {
      this.setState({open: !this.state.open})
    }

    return (
      <div className="search">
        <button className="search-btn" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        {this.state.open && (
          <div className="search-dropdown">
            <input
              className="search-input"
              type="text"
              placeholder="Search"
              value={this.props.search}
              onChange={(ev) => this.props.searchChange({search: ev.target.value})}
            />

            <div className="date-range-slider">
              <Range
                step={1}
                min={this.props.start}
                max={this.props.end}
                values={this.props.range}
                onChange={(values) => this.props.searchChange({ range: values })}
                renderTrack={({ props, children }) => (
                  <div {...props} style={{ ...props.style }} className="track">
                    {children}
                  </div>
                )}
                renderThumb={({ index, props }) => (
                  <div {...props} style={{ ...props.style }} className="thumb" >
                    <div className="thumb-label">
                      {format(new Date(this.props.range[index]*1000), "MM/yy")}
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="asc-desc-toggle">
              <label>
                <input type="radio" value="asc" onChange={() => this.props.searchChange({order: "asc"})} checked={this.props.order == "asc"} /> Asc
              </label>
              <span> / </span>
              <label>
                <input type="radio" value="desc" onChange={() => this.props.searchChange({order: "desc"})} checked={this.props.order == "desc"} /> Desc
              </label>
            </div>

            <button
              className="search-close"
              onClick={() => this.setState({open: false})}>
              Close
            </button>
          </div>
        )}
      </div>
    )
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

    // need to debounce search a bit
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
          </div>
        </section>
      </Layout>
    );
  }
}

export default InifinteScroll(Index, {
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
