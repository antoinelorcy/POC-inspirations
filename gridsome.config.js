// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require("path");

module.exports = {
  siteName: 'Inspirations',
  siteUrl: 'https://inspirations.beekast.com',
  plugins: [
    // {
    //   use: '@gridsome/source-contentful',
    //   options: {
    //     space: 'eyn4ihh29nqh', // required
    //     accessToken: 'j-IWQuVywYvw9yz1mKvkoX1qNChKpbBBIZjNP_d0FCY', // required
    //     host: 'cdn.contentful.com',
    //     environment: 'master',
    //     typeName: 'Contentful'
    //   }
    // },
    {
      use: 'gridsome-plugin-robots-txt',
      options: {
        policy: [
          {
            userAgent: "*",
            disallow: "/"
          }
        ]
      }
    },
    {
      use: '@gridsome/plugin-sitemap'
    }
  ],
  // templates: {
  //   ContentfulPage: [
  //     { 
  //       path: (node) => {
  //         return `/inspiration/${slugify(node.title)}`
  //       },
  //       component: './src/templates/Inspiration.vue'
  //     }
  //   ]
  // },
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    // or if you use scss
    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  },
  css: {
    loaderOptions: {
      sass: {
        includePaths: ["node_modules"]
      }
    }
  }
}

function slugify(text) {
  return text
    .toString()                     // Cast to string
    .toLowerCase()                  // Convert the string to lowercase letters
    .normalize('NFD')       // The normalize() method returns the Unicode Normalization Form of a given string.
    .trim()                         // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/_variables.scss'),
        path.resolve(__dirname, './src/assets/scss/_breakpoints.scss')
      ],
    })
}