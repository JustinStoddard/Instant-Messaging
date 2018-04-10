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
  state = {newmessage: '' }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setFlash('Welcome To My Chat App', 'green'))
  }

  displayMessages = () => {
    const { messages } = this.props;

    if (messages.length)
     return messages.map( (message, i) => {
       return <ChatMessage key={i} message={message} />
     })
    else 
      return(
        <Segment inverted textAlign="center">
          <Header as="h1" textAlign="center">No Messages Yet</Header>
        </Segment>
      )
  }

  addMessage = (e) => {
    e.preventDefault();
    const { dispatch, user: { email } } = this.props;
    const { newMessage } = this.state;
    const message = { email, body: newMessage };
    dispatch(addMessage(message));
    this.setState({ newMessage: '' })
  }

  setMessage = (e) => {
    this.setState({ newMessage: e.target.value })
  }

  render() {
    return(
      <Segment basic>
        <Header as="h2" textAlign="center">
          React Chat
        </Header>
        <Segment basic style={styles.mainWindow}>
          <Segment basic>
            { this.displayMessages() }  {/* Calling the parentheses makes that function run right now which could be bad. */}
          </Segment>
        </Segment>
        <Segment style={styles.messageInput}>
          <Form onSubmit={addMessage}>
            <Textarea value={this.state.newMessage} onChange={setMessage} placeholder="Write Something Nice!" autoFocus required>
            </Textarea>
            <Segment basic textAlign="center">
              <Button type="submit" primary>Send message</Button>
            </Segment>
          </Form>
        </Segment>
      </Segment>
    )
  }
}

const styles = {
  underline: {
    textDecoration: 'underline'
  },
  mainWindow: {
    border: '3px solid black',
    height: '60vh',
    overflowY: 'scroll',
    backgroundColor: 'lightgrey',
    borderRadius: '10px',
  },
  messageInput: {
    border: '3px solid black',
    width: '80%',
    margin: '0 auto',
    padding: '10px',
  },
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.messages,
  }
}

export default connect(mapStateToProps)(ChatWindow);
