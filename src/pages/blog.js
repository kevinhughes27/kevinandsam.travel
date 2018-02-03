import React from 'react'
import GatsbyLink from 'gatsby-link';

function Post({node: post}) {
  const { path, title, date } = post.frontmatter
  const imageSrc = post.frontmatter.cardImage.childImageSharp.resize.src;

  return (
    <li key={post.id} className="preview" itemProp="blogPost" itemScope itemType="http://schema.org/BlogPosting">
      <a href={path} itemProp="url">
        <div className="image">
          <figure className="absolute-bg" style={{backgroundImage: `url('${imageSrc}')`}} />
        </div>
        <div className="container">
          <h2 itemProp="name">
            {title}
          </h2>
          <time className="date" itemProp="datePublished" dateTime={date}>
            { date }
          </time>
        </div>
      </a>
    </li>
  );
}

const ReadMoreBtn = () => {
  <div className="read-more">
    <a className="btn" href="/blog">
      <div>
        <span>Read More</span>
        <span>Read More</span>
      </div>
    </a>
  </div>
}

export default function Blog({ data }) {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <section id="blog" className="section-padding bg-white">
      <div className="grid">
        <ul itemScope itemType="http://schema.org/Blog">
          {posts.map(Post)}
        </ul>


      </div>
    </section>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
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
  }
`
