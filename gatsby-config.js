const blog = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/blog`,
      name: 'pages',
    },
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        'gatsby-remark-component',
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
]

const favicon = {
  resolve: `gatsby-plugin-favicon`,
  options: {
    logo: "./src/favicon.png",
    injectHTML: true,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: false,
      favicons: true,
      firefox: true,
      twitter: false,
      yandex: false,
      windows: false
    }
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

const googleAnalytics = {
  resolve: `gatsby-plugin-google-analytics`,
  options: {
    trackingId: "UA-112059908-1",
    anonymize: true
  },
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
    googleFonts,
    googleAnalytics,
    favicon,
    ...blog,
  ]
}
