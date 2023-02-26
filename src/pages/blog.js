import React from 'react'
import Layout from '../components/Layout'
import InifinteScroll from '../components/InfiniteScroll'
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

function Index(props) {
  const posts = props.data.allMdx.nodes
  const postsToShow = posts.slice(0, props.show)

  return (
    <Layout>
      <section id='blog' className='section-padding bg-white' style={{opacity: props.ready ? 1 : 0}}>
        <div className='grid'>
          <ul itemScope itemType='http://schema.org/Blog'>
            {postsToShow.map(Post)}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

export default InifinteScroll(Index, {
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
