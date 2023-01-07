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
            maxWidth: 640,
            linkImagesToOriginal: false
          }
        },
      ]
    }
  }
]

// const favicon = {
//   resolve: `gatsby-plugin-favicon`,
//   options: {
//     logo: "./src/favicon.png",
//     injectHTML: true,
//     icons: {
//       android: true,
//       appleIcon: true,
//       appleStartup: true,
//       coast: false,
//       favicons: true,
//       firefox: true,
//       twitter: false,
//       yandex: false,
//       windows: false
//     }
//   }
// }

const googleFonts = {
  resolve: `gatsby-plugin-google-fonts`,
  options: {
    fonts: [
      `Fanwood`,
      `Quattrocento\:400,700`
    ]
  }
}

const leaflet = {
  resolve: `gatsby-plugin-react-leaflet`,
  options: {
    linkStyles: false // (default: true) Enable/disable loading stylesheets via CDN
  }
}

module.exports = {
  siteMetadata: {
    title: `kevinandsam.travel`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    googleFonts,
    leaflet,
    // favicon,
    ...blog,
    `gatsby-plugin-netlify`, // make sure to put last in the array
  ],
  trailingSlash: "never"
}
