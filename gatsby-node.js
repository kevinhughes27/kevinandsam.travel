const path = require('path');
const createPaginatedPages = require("gatsby-paginate");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const blogTemplate = path.resolve(`src/templates/blog.js`);
  const postTemplate = path.resolve(`src/templates/post.js`);

  return graphql(`{
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
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
      }
    }`
  )
  .then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    createPaginatedPages({
      edges: result.data.allMarkdownRemark.edges,
      createPage: createPage,
      pageTemplate: blogTemplate,
      pageLength: 6,
      pathPrefix: "blog",
      context: {}
    });

    result.data.allMarkdownRemark.edges
      .forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: postTemplate,
          context: {}
        });
      });
  });
}
