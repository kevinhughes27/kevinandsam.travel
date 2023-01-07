import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

export { Head } from '../components/Head'

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

const Pagination = (pageContext) => {
  const { index, pageCount } = pageContext;

  const previousUrl = index - 1 <= 1 ? `/blog` : `/blog/${index -1}`;
  const nextUrl = index + 1 > pageCount ? `/blog/${index}` : `/blog/${index + 1}`;

  return (
    <div className="pagination">
      <div className="read-more">
        <a className="btn" href={previousUrl}>
          <div>
            <span>Previous Page</span>
            <span>Previous Page</span>
          </div>
        </a>
      </div>

      <div className="read-more">
        <a className="btn" href={nextUrl}>
          <div>
            <span>Next Page</span>
            <span>Next Page</span>
          </div>
        </a>
      </div>
    </div>
  );
}

export default function Blog({ data, pageContext }) {
  const { group } = pageContext;

  return (
    <Layout>
      <section id="blog" className="section-padding bg-white">
        <div className="grid">
          <ul itemScope itemType="http://schema.org/Blog">
            {group.map(Post)}
          </ul>
        </div>
        {Pagination(pageContext)}
      </section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
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
