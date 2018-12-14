module.exports = {
  siteMetadata: {
    title: "VO Handbook"
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/entries`,
        name: "entries",
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-netlify-cms'
  ],
}