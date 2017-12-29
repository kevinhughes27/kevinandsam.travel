const files = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/blog`,
      name: 'pages',
    },
  }
]

const markdownTransformer = {
  resolve: 'gatsby-transformer-remark',
  options: {
    plugins: [
      'gatsby-remark-copy-linked-files',
      {
        resolve: 'gatsby-remark-images',
        options: {
          linkImagesToOriginal: false
        }
      },
    ]
  }
}

const googleFonts = {
  resolve: `gatsby-plugin-google-fonts`,
  options: {
    fonts: [
      `Fanwood`,
      `Quattrocento\:400,700`
    ]
  }
}

module.exports = {
  siteMetadata: {
    title: `kevinandsam.travel`,
  },
  plugins: [
    `gatsby-plugin-react-next`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    markdownTransformer,
    googleFonts,
    ...files,
  ]
}
