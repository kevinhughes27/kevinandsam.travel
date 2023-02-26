const path = require('path')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`{
    allMdx(sort: {frontmatter: {date: DESC}}, limit: 1000) {
      nodes {
        id
        excerpt(pruneLength: 250)
        internal {
          contentFilePath
        }
        frontmatter {
          date
          path
          title
          cardImage {
            childImageSharp {
              resize(width: 800) {
                src
              }
            }
          }
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
  }`)

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors)
  }

  const posts = result.data.allMdx.nodes
  const postTemplate = path.resolve(`src/templates/post.js`)

  posts.forEach((node) => {
    createPage({
      path: node.frontmatter.path,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {}
    })
  })
}

// explicitly define the facebook post video type because gatsby
// doesn't infer it properly sometimes probably because it is often blank.
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type FacebookPostsJson implements Node {
      videos: [PostsJsonVideos]
    }

    type InstagramPostsJson implements Node {
      videos: [PostsJsonVideos]
    }

    type PostsJsonVideos  {
      src: File @fileByRelativePath
      width: Int
      height: Int
      duration: String
    }
  `
  createTypes(typeDefs)
}
