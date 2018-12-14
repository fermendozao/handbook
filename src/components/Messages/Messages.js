import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import MessageList from './MessageList';

class Messages extends Component {
  _initFirebase = false;

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  componentWillUnmount() {
    const {
      firebase: { messages },
    } = this.props;

    messages().off();
  }

  firebaseInit = () => {
    const { firebase } = this.props;
    if (firebase && !this._initFirebase) {
      this._initFirebase = true;
      this.onListenForMessages();
    }
  };

  onListenForMessages = () => {
    const { firebase } = this.props;
    const { limit } = this.state;
    this.setState({ loading: true });

    firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(limit)
      .on('value', snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key,
          }));

          this.setState({
            messages: messageList,
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    const {
      firebase: {
        messages,
        serverValue: { TIMESTAMP },
      },
    } = this.props;

    const { text } = this.state;

    messages().push({
      text,
      userId: authUser.uid,
      createdAt: TIMESTAMP,
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    const {
      firebase: {
        message: fbMessage,
        serverValue: { TIMESTAMP },
      },
    } = this.props;

    fbMessage(message.uid).set({
      ...message,
      text,
      editedAt: TIMESTAMP,
    });
  };

  onRemoveMessage = uid => {
    const {
      firebase: { message },
    } = this.props;

    message(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };

  render() {
    const { users } = this.props;
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && messages && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
                messages={messages.map(message => ({
                  ...message,
                  user: users
                    ? users[message.userId]
                    : { userId: message.userId },
                }))}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

            {!messages && <div>There are no messages ...</div>}

            <form
              onSubmit={event =>
                this.onCreateMessage(event, authUser)
              }
            >
              <input
                type="text"
                value={text}
                onChange={this.onChangeText}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Messages);
