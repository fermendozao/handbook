import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';

export default ({ data }) => {
  const postNode = data.postBySlug;
  const post = data.postBySlug.frontmatter;

  return (
    <Layout>
      <BodyContainer>
        <div className="post-content">
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
        </div>
      </BodyContainer>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    postBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`;

const BodyContainer = styled.div`
  overflow: scroll;
  justify-self: center;
  width: 100%;
  padding: ${props => props.theme.sitePadding};
  @media screen and (max-width: 600px) {
    order: 2;
  }
  max-width: ${props => props.theme.contentWidthLaptop};
  margin: auto;

  .post-content {
    margin-top: ${props => props.theme.spacingUnit(3)};
  }

  a {
    color: black;
    background: ${props => props.theme.linkBackground};
    border-bottom: 2px solid ${props => props.theme.brand};
    text-decoration: none;
    transition: 500ms all ease;
    padding: 0 5px;
  }
  a:hover {
    border-bottom: 2px solid ${props => props.theme.brand};
    background: ${props => props.theme.brandLightest};
  }

  img {
    max-width: 100%;
    margin: auto;
  }

  // This is a hack for Image captions.
  // The Markdown is wrapping images in p tags for some reason?
  p + h6 {
    margin-top: -35px;
  }

  ul,
  ol,
  dl {
    margin-left: ${props => props.theme.spacingUnit(2)};
  }

  hr {
    display: block;
    border: 0.5px solid ${props => props.theme.lightGrey};
  }

  // autolink headers
  h1 > a,
  h2 > a,
  h3 > a,
  h4 > a {
    color: black;
    background: transparent;
    border-bottom: none;
    text-decoration: none;
    transition: 500ms all ease;
    padding: 0;

    &:hover {
      border-bottom: none;
      background: none;
    }
  }
`;
