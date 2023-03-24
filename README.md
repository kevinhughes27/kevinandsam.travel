# kevinandsam.travel

Our travel blog [kevinandsam.travel](https://kevinandsam.travel/) written using [Gatsby](https://www.gatsbyjs.org/)

For an interesting write up about most of the features of this blog read [An Over-Engineered Travel Blog](https://www.kevinhughes.ca/blog/an-over-engineered-travel-blog)

## About

Gatsby is configured using three top level files `gatsby-browser.js`, `gatsby-config.js` and `gatsby-node.js`. `gatsby-config.js` file specifies which plugins to use and passes some arguments to plugins if required. The `gatsby-node.js` hooks into [Gatsby's Node API](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/) and is used to dynamically create React components from Markdown files.

Blog posts are automatically generated for each `/blog/articles/*/index.md` directory. Images for the blog go in this folder and are referenced relatively in the code.

Social media data is exported then imported into `blog/facebook/` and `blog/instagram/`. The posts are defined in a json file and image and video assets are stored in local folders.
  * sometimes it seems that you need to clear gatsby's cache after changing this data

## Setup

1. Install `Nodejs` and `yarn`
2. Run `yarn install` to fetch the dependencies specified in `package.json`
3. Run `yarn start` to start the development server
4. Visit http://localhost:8000 after the server has finished booting


## Debugging

Gatsby exposes a GraphiQL server at http://localhost:8000/___graphql which is useful to help build queries.

Sharp is a pain in the ass. I have found that `yarn build` is more successful and `yarn start` if it is acting up.

## Tools

There some scripts in `/bin`for various purposes like printing the durations we are staying / stayed in each country.
