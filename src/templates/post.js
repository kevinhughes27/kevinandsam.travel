import React from 'react';
import Helmet from 'react-helmet';

export default function Template({ data }) {
  const { markdownRemark: post } = data;
  const { path, title, author, date } = post.frontmatter
  const imageSrc = post.frontmatter.postImage.childImageSharp.resize.src;

  const baseUrl = 'https://kevinandsam.travel'
  const meta = [
    { property: "og:url", content: baseUrl + path + '/' },
    { property: "og:type", content: "article" },
    { property: "og:title", content: title },
    { property: "og:description", content: post.excerpt },
    { property: "og:image", content: baseUrl + imageSrc },
  ]

  return (
    <div className="post-padding">
      <Helmet title={`kevinandsam.travel - ${title}`} meta={meta}/>

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
              <time className="post-header__time" itemProp="datePublished" dateTime={data}>
                { date }
              </time>
            </header>

            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          </section>
        </div>
      </article>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
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
