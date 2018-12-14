import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    _initFirebase = false;

    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.setState({
        authUser: JSON.parse(localStorage.getItem('authUser')),
      });

      this.firebaseInit();
    }

    componentDidUpdate() {
      this.firebaseInit();
    }

    componentWillUnmount() {
      // this.listener();
    }

    firebaseInit = () => {
      const { firebase } = this.props;
      if (firebase && !this._initFirebase) {
        this._initFirebase = true;

        this.listener = firebase.onAuthUserListener(
          authUser => {
            localStorage.setItem(
              'authUser',
              JSON.stringify(authUser),
            );
            this.setState({ authUser });
          },
          () => {
            localStorage.removeItem('authUser');
            this.setState({ authUser: null });
          },
        );
      }
    };

    render() {
      const { authUser } = this.state;
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
