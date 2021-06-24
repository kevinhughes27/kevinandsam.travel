import React from 'react'
import Layout from '../components/Layout'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import rehypeReact from 'rehype-react'

import Quote from '../components/Quote'
import TwoColumn from '../components/TwoColumn'
import Slideshow from '../components/Slideshow'

import Share from '../components/Share'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "quote": Quote,
    "two-column": TwoColumn,
    "slideshow": Slideshow,
  }
}).Compiler

export default function Template({ data }) {
  const { markdownRemark: post } = data;
  const { path, title, author, date } = post.frontmatter

  const postImage = post.frontmatter.postImage.childImageSharp.resize;
  const cardImage = post.frontmatter.cardImage.childImageSharp.resize;

  const baseUrl = 'https://kevinandsam.travel'
  const shareUrl = baseUrl + path + '/'
  const imageUrl = baseUrl + cardImage.src

  const meta = [
    { property: "og:url", content: shareUrl },
    { property: "og:title", content: title },
    { property: "og:description", content: post.excerpt },
    { property: "og:image", content: imageUrl },
    { property: "og:image:height", content: cardImage.height },
    { property: "og:image:width", content: cardImage.width },
  ]

  return (
    <Layout>
      <div className="post-padding">
        <Helmet title={`${title} - kevinandsam.travel`} meta={meta}/>

        <article itemProp="blogPost" itemScope itemType="http://schema.org/BlogPosting">

          <header className="post-mast">
            <figure className="absolute-bg" style={{backgroundImage: `url('${postImage.src}')`}} />
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
              </div>

              <Share title={title} shareUrl={shareUrl} imageUrl={imageUrl} />

              <div className="post-author">
                <img src={`${__PATH_PREFIX__}/${author.toLowerCase()}.jpg`} alt={author} />
                <div>
                  <strong>Author</strong>
                  <p>{ author }</p>
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>
    </Layout>
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
        cardImage {
          childImageSharp {
            resize(width: 800) {
              width
              height
              src
            }
          }
        }
      }
    }
  }
`
