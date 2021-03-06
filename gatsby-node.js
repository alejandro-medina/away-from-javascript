const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slugify = require('slugify');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allPodcastFeedItem {
            edges {
              node {
                id
                guid
                title
                description
                published(formatString: "DD/MM/YYYY")
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        console.log(result.errors);
        return reject(result.errors);
      }

      // Create Post pages.
      const postTemplate = path.resolve(`./src/templates/post.js`);
      _.each(result.data.allPodcastFeedItem.edges, edge => {
        createPage({
          path: slugify(edge.node.title, { lower: true }),
          component: postTemplate,
          context: {
            guid: edge.node.guid,
          },
        });
      });
    });

    resolve();
  });
};
