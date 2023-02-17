const path = require('path');
const createPaginatedPages = require('gatsby-paginate');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const blogTemplate = path.resolve(`src/templates/blog.js`);
  const postTemplate = path.resolve(`src/templates/post.js`);

  return graphql(`{
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
    }`
  )
  .then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    createPaginatedPages({
      edges: result.data.allMdx.nodes,
      createPage: createPage,
      pageTemplate: blogTemplate,
      pageLength: 6,
      pathPrefix: "blog",
      context: {}
    });

    result.data.allMdx.nodes
      .forEach((node) => {
        createPage({
          path: node.frontmatter.path,
          component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
          context: {}
        });
      });
  });
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
