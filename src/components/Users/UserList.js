import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

class UserList extends Component {
  _initFirebase = false;

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
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

      this.setState({ loading: true });

      firebase.users().on('value', snapshot => {
        const usersObject = snapshot.val();

        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));

        this.setState({
          users: usersList,
          loading: false,
        });
      });
    }
  };

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}

        <ul>
          {users.map(user => (
            <li key={user.uid}>
              <span>
                <strong>ID:</strong>
                {user.uid}
              </span>
              <span>
                <strong>E-Mail:</strong>
                {user.email}
              </span>
              <span>
                <strong>Username:</strong>
                {user.username}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withFirebase(UserList);
