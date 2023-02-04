// this is a clone of my blog template but gatsbygram
// https://github.com/gatsbyjs/gatsby/blob/master/examples/gatsbygram/src/pages/index.js
// would be a better starter. it already has infinite load setup even
//
import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

export { Head } from '../components/Head'

function Post(post) {
  const text = post.text
  const images = post.images
  const imageSrc = images[0].childImageSharp.resize.src

  return (
    <li key={post.id} className="preview" itemProp="blogPost" itemScope itemType="http://schema.org/BlogPosting">
      <div className="image">
        <figure className="absolute-bg" style={{backgroundImage: `url('${imageSrc}')`}} />
      </div>
      <div className="container">
        {text}
      </div>
    </li>
  );
}

export default function Index({ data }) {
  const posts = data.allPostsJson.nodes

  return (
    <Layout>
      <section id="blog" className="section-padding bg-white">
        <div className="grid">
          <ul itemScope itemType="http://schema.org/Blog">
            {posts.map(Post)}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allPostsJson {
      nodes {
        id
        text
        images {
          childImageSharp {
            resize(width: 800) {
              src
            }
          }
        }
      }
    }
  }
`
