import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';

import Layout from '../components/layout';
import WelcomePage from './welcome';
import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
import { withFirebase } from '../components/Firebase';
import Messages from '../components/Messages';

class HomePageBase extends Component {
  _initFirebase = false;

  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.users().off();
  }

  firebaseInit = () => {
    const { firebase } = this.props;
    if (firebase && !this._initFirebase) {
      this._initFirebase = true;

      firebase.users().on('value', snapshot => {
        this.setState({
          users: snapshot.val(),
        });
      });
    }
  };

  render() {
    const { users } = this.state;
    return (
      <Fragment>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        <Messages users={users} />
        <WelcomePage />
      </Fragment>
    );
  }
}

const condition = authUser => !!authUser;

const HomePage = compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(HomePageBase);

export default () => (
  <Layout>
    <HomePage />
  </Layout>
);
