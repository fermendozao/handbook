import React, { Component, Fragment } from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { graphql, StaticQuery } from 'gatsby';

import '../css/index.css';
import theme from '../theme';
import Navigation from './Navigation';
import TableOfContents from './TableOfContents';
import getFirebase, { FirebaseContext } from './Firebase';
import withAuthentication from './Session/withAuthentication';

class Layout extends Component {
  state = {
    firebase: null,
  };

  componentDidMount() {
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);

      this.setState({ firebase });
    });
  }

  render() {
    console.log(this.props);
    return (
      <StaticQuery
        query={graphql`
          query {
            Bienvenido: allMarkdownRemark(
              filter: {
                frontmatter: { templateKey: { eq: "welcome-doc" } }
              }
            ) {
              edges {
                node {
                  id
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
            Sherpas: allMarkdownRemark(
              filter: {
                frontmatter: { templateKey: { eq: "sherpas" } }
              }
            ) {
              edges {
                node {
                  id
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
            Devs: allMarkdownRemark(
              filter: { frontmatter: { templateKey: { eq: "devs" } } }
            ) {
              edges {
                node {
                  id
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
          const { firebase } = this.state;
          return (
            <ThemeProvider theme={theme}>
              <FirebaseContext.Provider value={firebase}>
                <AppWithAuthentication data={data} {...this.props} />
              </FirebaseContext.Provider>
            </ThemeProvider>
          );
        }}
      />
    );
  }
}

const AppWithAuthentication = withAuthentication(
  ({ children, data }) => (
    <Fragment>
      <Navigation />
      <BodyGrid>
        <ToCContainer>
          <TableOfContents content={data} />
        </ToCContainer>
        <MainContentContainer>{children}</MainContentContainer>
      </BodyGrid>
    </Fragment>
  ),
);

export default Layout;

const BodyGrid = styled.div`
  height: 100vh;
  display: flex;
  transition: 500ms ease all;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: inherit;
  }
`;

const ToCContainer = styled.div`
  position: relative;
  left: 0;
  overflow: scroll;
  transition: 1 ease all;
  padding: 20px;
  width: 350px;
  height: 100vh;
  background-color: ${props => props.theme.brandSecondary};
`;

const MainContentContainer = styled.div`
  position: absolute;
  left: 350px;
  transition: 1s ease all;
  overflow: scroll;
  height: 100vh;
  width: calc(100vw - 350px);
  padding-left: 40px;
`;
