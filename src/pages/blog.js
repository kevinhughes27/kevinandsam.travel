import React from 'react'
import Layout from '../components/Layout'
import InfinteScroll from '../components/InfiniteScroll'
import Search from '../components/Search'
import Loader from '../components/Loader'
import { graphql } from 'gatsby'

export { Head } from '../components/Head'

function Post(post) {
  const { path, title, date } = post.frontmatter
  const imageSrc = post.frontmatter.cardImage.childImageSharp.resize.src;

  return (
    <li key={post.id} className='preview' itemProp='blogPost' itemScope itemType='http://schema.org/BlogPosting'>
      <a href={path} itemProp='url'>
        <div className='image'>
          <figure className='absolute-bg' style={{backgroundImage: `url('${imageSrc}')`}} />
        </div>
        <div className='container'>
          <h2 itemProp='name'>
            {title}
          </h2>
          <time className='date' itemProp='datePublished' dateTime={date}>
            { date }
          </time>
        </div>
      </a>
    </li>
  );
}

function postTime(post) {
  return new Date(post.frontmatter.date).getTime() / 1000
}

class Index extends React.Component {
  constructor(props) {
    super(props)

    const posts = props.data.allMdx.nodes // is desc
    const range = [
      postTime(posts[posts.length - 1]),
      postTime(posts[0])
    ]

    this.state = {
      search: "",
      range: range,
      order: "desc"
    }
  }

  render() {
    const posts = this.props.data.allMdx.nodes
    const rangeBounds = [
      postTime(posts[posts.length - 1]),
      postTime(posts[0])
    ]

    const filteredPosts = posts.filter((post) => {
      // check range
      if (postTime(post) < this.state.range[0] || postTime(post) > this.state.range[1]) {
        return false
      }

      // check search
      if (this.state.search.length > 3) {
        return post.frontmatter.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(this.state.search.toLowerCase())
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
        <section id='blog' className='section-padding bg-white' style={{opacity: this.props.ready ? 1 : 0}}>
          <div className='grid'>
            <ul itemScope itemType='http://schema.org/Blog'>
              {postsToShow.map(Post)}
            </ul>
          </div>
          {showLoader ? <Loader/> : null}
        </section>
      </Layout>
    );
  }
}

export default InfinteScroll(Index, {
  uid: 'blog',
  initialSize: 6,
  loadSize: 2,
  threshold: 300
})

export const pageQuery = graphql`
  query IndexQuery {
    allMdx(sort: {frontmatter: {date: DESC}}) {
      nodes {
        excerpt(pruneLength: 250)
        id
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          path
          cardImage {
            childImageSharp {
              resize(width: 800) {
                src
              }
            }
          }
        }
      }
    }
  }
`
