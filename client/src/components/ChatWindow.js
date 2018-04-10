import React from 'react';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { addmessage } from '../actions/messages';
import ChatMessages from './ChatMessage';
import {
  Segment,
  Header,
  Form,
  Textarea,
  Button
} from 'semantic-ui-react';

class ChatWindow extends React.Components {
  render() {
    return(
      nill
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.messages,
  }
}

export default connect(mapStateToProps)(ChatWindow);
