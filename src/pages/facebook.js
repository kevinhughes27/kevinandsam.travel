import React from 'react'
import Layout from '../components/Layout'
import PhotoAlbum from 'react-photo-album'
import { graphql } from 'gatsby'

export { Head } from '../components/Head'

function Post(post) {
  const { author, text, timestamp } = post
  const date = new Date(timestamp*1000).toDateString()
  const images = post.images.map(img => img.childrenImageSharp[0].original)
  const maxPhotos = images.length === 3 ? 2 : 3

  return (
    <div key={post.id} className="fb-post">
      <div className="fb-author">
        <img src={`${__PATH_PREFIX__}/${author.toLowerCase()}.jpg`} alt={author} />
        <div>
          <strong>{author}</strong>
          <p>{date}</p>
        </div>
      </div>

      <p>{text}</p>

      <PhotoAlbum
        layout="rows"
        spacing={2}
        targetRowHeight={300}
        defaultContainerWidth={600}
        rowConstraints={{maxPhotos: maxPhotos}}
        photos={images}
      />
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
        images {
          childrenImageSharp {
            original {
              src
              width
              height
            }
          }
        }
      }
    }
  }
`
