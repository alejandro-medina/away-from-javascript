import React from 'react';
import { graphql } from 'gatsby';

import BaseLayout from '../layouts/BaseLayout';
import Post from '../components/Post';
import Grid from '../components/Grid';
import Row from '../components/Row';
import Col from '../components/Col';
import Page from '../components/Page';

const IndexPage = ({ data }) => {
  const posts = data.allPodcastFeedItem.edges;
  const firstPost = posts[0];

  return (
    <BaseLayout
      title="Away from Javascript"
      description={`Disfruta el capitulo mas reciente: ${firstPost.node.title}`}
    >
      <Page>
        <Grid>
          <Row>
            {posts.map(post => (
              <Col xs>
                <Post
                  published={post.node.published}
                  image={post.node.image}
                  title={post.node.title}
                  description={post.node.description}
                />
              </Col>
            ))}
          </Row>
        </Grid>
      </Page>
    </BaseLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allPodcastFeedItem {
      edges {
        node {
          guid
          title
          image
          description
          published(formatString: "DD/MM/YYYY")
        }
      }
    }
  }
`;
