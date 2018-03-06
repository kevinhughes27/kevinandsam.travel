import React from 'react'
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby-link'

import rehypeReact from 'rehype-react'
import Quote from '../components/Quote'
import Instagram from '../components/Instagram'

import Share from '../components/Share'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "quote": Quote,
    "instagram": Instagram
  }
}).Compiler

export default function Template({ data }) {
  const { markdownRemark: post } = data;
  const { path, title, author, date } = post.frontmatter
  const imageSrc = post.frontmatter.postImage.childImageSharp.resize.src;

  const baseUrl = 'https://kevinandsam.travel'
  const shareUrl = baseUrl + path + '/'
  const imageUrl = baseUrl + imageSrc

  const meta = [
    { property: "og:url", content: shareUrl },
    { property: "og:type", content: "article" },
    { property: "og:title", content: title },
    { property: "og:description", content: post.excerpt },
    { property: "og:image", content: imageUrl },
  ]

  return (
    <div className="post-padding">
      <Helmet title={`${title} - kevinandsam.travel`} meta={meta}/>

      <article itemProp="blogPost" itemScope itemType="http://schema.org/BlogPosting">

        <header className="post-mast">
          <figure className="absolute-bg" style={{backgroundImage: `url('${imageSrc}')`}} />
        </header>

        <div className="grid--double">
          <section className="post section-padding--half" itemProp="articleBody">
            <header className="post-header">
              <h1 itemProp="name headline">
                { title }
              </h1>
              <time itemProp="datePublished" dateTime={data}>
                { date }
              </time>
            </header>

            <div className="post-content">
              { renderAst(post.htmlAst) }
              <Share title={title} shareUrl={shareUrl} />
            </div>

            <div className="post-author">
              <img src={`${__PATH_PREFIX__}/${author.toLowerCase()}.jpg`} />
              <div>
                <strong>Author</strong>
                <p>{ author }</p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      excerpt(pruneLength: 250)
      frontmatter {
        title
        author
        date(formatString: "MMMM DD, YYYY")
        path
        postImage {
          childImageSharp {
            resize(width: 1920) {
              src
            }
          }
        }
      }
    }
  }
`
