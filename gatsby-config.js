module.exports = {
  siteMetadata: {
    title: `kevinandsam.travel`,
  },
  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/blog`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark'
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Fanwood`,
          `Quattrocento\:400,700`
        ]
      }
    }
  ]
}
