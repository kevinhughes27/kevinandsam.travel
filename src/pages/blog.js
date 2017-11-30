import React from 'react'
import GatsbyLink from 'gatsby-link';

function Post({node: post}) {
  const { path, title, excerpt, date } = post.frontmatter
  const imageSrc = post.frontmatter.image.childImageSharp.resize.src;

  return (
    <li key={post.id} className="preview" itemProp="blogPost" itemScope itemType="http://schema.org/BlogPosting">
      <a className="preview__link" href={path} itemProp="url">
        <div className="preview__img bg-grey wow slideInUp">
          <figure className="absolute-bg wow fadeIn" data-wow-delay="900ms" style={{backgroundImage: `url('${imageSrc}`}} />
        </div>
        <div className="preview__container bg-white">
          <div>
            <h2 className="wow fadeInUp" data-wow-delay="150ms" itemProp="name">
              {title}
            </h2>
            <p className="preview__excerpt wow fadeInUp" data-wow-delay="300ms" itemProp="description">
              {post.excerpt}
            </p>
          </div>
          <time className="preview__date wow fadeInUp" data-wow-delay="450ms" itemProp="datePublished" dateTime={date}>
            { date }
          </time>
        </div>
      </a>
    </li>
  );
}

export default function Blog({ data }) {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <section id="blog" className="section-padding bg-white">
      <div className="grid">
        <h1 className="section-header">Blog</h1>
        <ul className="container-double" itemScope itemType="http://schema.org/Blog">
          {posts.map(Post)}
        </ul>

        <div className="container-btn">
          <a className="btn" href="/archive">
            <div>
              <span>Read More</span>
              <span>Read More</span>
            </div>
          </a>
        </div>
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
            image {
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
