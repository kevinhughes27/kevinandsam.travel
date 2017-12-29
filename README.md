# kevinandsam.travel

Our travel blog written using [Gatsby](https://www.gatsbyjs.org/)

Gatsby is configured using two top level files `gatsby-config.js` and `gatsby-node.js`. The `gatsby-config.js` file specifies which plugins to use and passes some arguments to plugins if required. The `gatsby-node.js` hooks into [Gatsby's Node API](https://www.gatsbyjs.org/docs/node-apis/) and is used to dynamically create React components from Markdown files.


## Setup

1. Install `Nodejs` and `yarn`
2. Run `yarn install` to fetch the dependencies specified in `package.json`
3. Run `yarn develop` to start the development server
4. Visit http://0.0.0.0:8000 after the server has finished booting


## Debugging

Gatsby exposes a GraphiQL server at http://localhost:8000/___graphql which is useful to help build queries.


## Deploying

`yarn deploy` builds the site and pushes it to github
