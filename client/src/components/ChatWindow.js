import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { addMessage } from '../actions/messages';
import ChatMessages from './ChatMessage';
import {
  Segment,
  Header,
  Form,
  TextArea,
  Button
} from 'semantic-ui-react';

class ChatWindow extends React.Component {
  state = {newMessage: '' }

  componentDidMount() {
    const { dispatch } = this.props;
    window.MessageBus.start();
    dispatch(setFlash('Welcome To My Chat App', 'green'))

    window.MessageBus.subscribe('/chat_channel', (data) => {
      dispatch(addMessage(data));
    })
  }

  componentWillUnmount() {
    window.MessageBus.unsubscribe('/chat_channel')
  }

  displayMessages = () => {
    const { messages } = this.props;

    if (messages.length)
     return messages.map( (message, i) => {
       return <ChatMessages key={i} message={message} />
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

    axios.post('/api/messages', message)
      .then( ({ headers }) => {
        dispatch({ type: 'HEADERS', headers })
        this.setState({ newMessage: '' })
      })
      .catch( ({ headers }) => {
        dispatch({ type: 'HEADERS', headers })
        dispatch(setFlash('Error Posting Messages', 'red'))
      })
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
            <TextArea value={this.state.newMessage} onChange={this.setMessage} placeholder="Write Something Nice!" autoFocus required> 
            </TextArea>
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
