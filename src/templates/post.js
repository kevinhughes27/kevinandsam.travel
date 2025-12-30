import React from 'react'
import Layout from '../components/Layout'

import { MDXProvider } from '@mdx-js/react'
import Quote from '../components/Quote'
import TwoColumn from '../components/TwoColumn'
import Carousel from '../components/Carousel'

import { graphql } from 'gatsby'

const mdxComponents = { Quote, TwoColumn, Carousel }

export const Head = ({ data: { mdx: post } }) => {
  const cardImage = post.frontmatter.cardImage.childImageSharp.resize;

  const baseUrl = 'https://kevinandsam.travel'
  const shareUrl = baseUrl + post.frontmatter.path + '/'
  const imageUrl = baseUrl + cardImage.src

  const meta = [
    { property: "og:url", content: shareUrl },
    { property: "og:title", content: post.frontmatter.title },
    { property: "og:description", content: post.excerpt },
    { property: "og:image", content: imageUrl },
    { property: "og:image:height", content: cardImage.height },
    { property: "og:image:width", content: cardImage.width },
  ]

  return (
    <>
      <title>{post.frontmatter.title} - kevinandsam.travel</title>
      { meta.map((m) => {
        return (<meta property={m.property} key={m.property} content={m.content}/>)
      })}
    </>
  )
}

export default function Template({ data: { mdx: post }, children }) {
  const { title, author, date } = post.frontmatter

  const postImage = post.frontmatter.postImage.childImageSharp.resize;
  const cardImage = post.frontmatter.cardImage.childImageSharp.resize;

  const baseUrl = 'https://kevinandsam.travel'
  const shareUrl = baseUrl + post.frontmatter.path + '/'
  const imageUrl = baseUrl + cardImage.src

  return (
    <Layout>
      <div className="post-padding">
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
                <time itemProp="datePublished" dateTime={date}>
                  { date }
                </time>
              </header>

              <div className="post-content">
                <MDXProvider components={mdxComponents}>
                  {children}
                </MDXProvider>
              </div>

              <div style={{ textAlign: "center", margin: "2rem 0", fontSize: "0.6rem", color: "#999", opacity: "0.5", letterSpacing: "2.5rem" }}>
                ◆ ◆ ◆
              </div>

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
    mdx(frontmatter: { path: { eq: $path } }) {
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
