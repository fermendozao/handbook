import React, { Component } from 'react';

class MessageItem extends Component {
  constructor(props) {
    super(props);

    const {
      message: { text },
    } = this.props;

    this.state = {
      editMode: false,
      editText: text,
    };
  }

  onToggleEditMode = () => {
    const {
      message: { text },
    } = this.props;
    this.setState(state => ({
      editMode: !state.editMode,
      editText: text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    const { onEditMessage, message } = this.props;
    const { editText } = this.state;
    onEditMessage(message, editText);

    this.setState({ editMode: false });
  };

  render() {
    const { message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <strong>
              {message.user.username || message.user.userId}
            </strong>{' '}
            {message.text} {message.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {editMode ? (
          <span>
            <button onClick={this.onSaveEditText} type="button">
              Save
            </button>
            <button onClick={this.onToggleEditMode} type="button">
              Reset
            </button>
          </span>
        ) : (
          <button onClick={this.onToggleEditMode} type="button">
            Edit
          </button>
        )}

        {!editMode && (
          <button
            type="button"
            onClick={() => onRemoveMessage(message.uid)}
          >
            Delete
          </button>
        )}
      </li>
    );
  }
}

export default MessageItem;
