const blog = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/blog`,
      name: 'blog',
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/facebook`,
      name: 'facebook',
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/instagram`,
      name: 'instagram',
    },
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.md`, `.mdx`],
      gatsbyRemarkPlugins: [
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

const manifest = {
  resolve: `gatsby-plugin-manifest`,
  options: {
    name: 'kevinandsam.travel',
    icon: './static/favicon.png',
    display: 'standalone',
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
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    googleFonts,
    manifest,
    leaflet,
    ...blog,
    `gatsby-plugin-netlify`, // make sure to put last in the array
  ],
  trailingSlash: 'never'
}
