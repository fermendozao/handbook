import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

const WelcomePage = () => (
  <StaticQuery
    query={graphql`
      query TableOfContents {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                section
              }
            }
          }
        }
      }
    `}
    render={data => {
      console.log(data);
      return (
        <div>
          <h1>Handbook</h1>
        </div>
      );
    }}
  />
);

export default () => (
  <Layout>
    <WelcomePage />
  </Layout>
);
