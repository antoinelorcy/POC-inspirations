// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Inspirations',
  plugins: [
    {
      use: '@gridsome/source-contentful',
      options: {
        space: 'eyn4ihh29nqh', // required
        accessToken: 'j-IWQuVywYvw9yz1mKvkoX1qNChKpbBBIZjNP_d0FCY', // required
        host: 'cdn.contentful.com',
        environment: 'master',
        typeName: 'Contentful'
      }
    }
  ],
  templates: {
    ContentfulPage: [
      { 
        path: (node) => {
          return `/inspiration/${slugify(node.title)}`
        },
        component: './src/templates/Inspiration.vue'
      }
    ]
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