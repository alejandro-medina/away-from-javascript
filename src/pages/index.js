import React from 'react';
import { graphql } from 'gatsby';

import { BaseLayout, Post, Grid, Row, Col, Page } from '../components';

function IndexPage({ data }) {
  const posts = data.allPodcastFeedItem.edges;
  const firstPost = posts[0];

  return (
    <BaseLayout
      title="Away from Javascript"
      description={`Disfruta el capitulo mas reciente: ${firstPost.node.title}`}
    >
      <Page>
        <Grid>
          {posts.map((post, index) => (
            <Row center="xs">
              <Col xs md={8} key={post.node.id}>
                <Post
                  ep={posts.length - index}
                  published={post.node.published}
                  image="logo.png"
                  title={post.node.title}
                  description={post.node.description}
                />
              </Col>
            </Row>
          ))}
        </Grid>
      </Page>
    </BaseLayout>
  );
}

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
          id
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
