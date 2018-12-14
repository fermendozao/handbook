import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import logo from '../../vo-logo.png';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <NavigationWrapper>
    <Link to="/">
      <img src={logo} alt="vo" />
    </Link>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </NavigationWrapper>
);

const NavigationNonAuth = () => (
  <NavigationWrapper>
    <Link to="/">
      <img src={logo} alt="vo" />
    </Link>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  </NavigationWrapper>
);

export default Navigation;

const NavigationWrapper = styled.nav`
  display: flex;
  justify-content: space-between;

  img {
    width: auto;
    height: 40px;
    margin: 20px 40px;
  }

  background-color: ${props => props.theme.brandSecondary};
  ul {
    display: flex;
    justify-content: flex-end;
    margin: 0;
    padding: 15px 20px;
    list-style: none;

    li {
      margin: 0 10px;
      font-size: 1em;
      line-height: 5em;
      color: white;
    }
  }
`;
