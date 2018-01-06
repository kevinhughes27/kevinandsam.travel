import React from 'react'
import GatsbyLink from 'gatsby-link';

function Post({node: post}) {
  const { path, title, date } = post.frontmatter
  const imageSrc = post.frontmatter.cardImage.childImageSharp.resize.src;

  return (
    <li key={post.id} className="preview" itemProp="blogPost" itemScope itemType="http://schema.org/BlogPosting">
      <a className="preview__link" href={path} itemProp="url">
        <div className="preview__img wow slideInUp">
          <figure className="absolute-bg wow fadeIn" data-wow-delay="900ms" style={{backgroundImage: `url('${imageSrc}')`}} />
        </div>
        <div className="preview__container">
          <div>
            <h2 itemProp="name">
              {title}
            </h2>
          </div>
          <span>
            <time className="preview__date" itemProp="datePublished" dateTime={date}>
              { date }
            </time>
          </span>
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
                resize(width: 1000, height: 1000) {
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
