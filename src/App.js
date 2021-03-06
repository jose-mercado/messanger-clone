import './App.css';
import React,  {useState, useEffect} from 'react'
import { IconButton, FormControl, Input } from '@mui/material';
import Message from './Message';
import db from './firebase';
import firebase from "firebase";
import FlipMove from "react-flip-move";
import Logo from "./pics/logo.svg"
import SendIcon from '@mui/icons-material/Send';

// to deploy: firebase deploy
//to delete: firebase hosting:disable

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState();

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, [])

  useEffect(() => {
    setUsername (prompt('enter your name here'))
  }, [])

  const sendMessage = (event) => {

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    event.preventDefault();
    setInput('');
  }

  return (
    <div className="App">

      <img src={Logo} alt="logo" className='logo' />

      <h1>
        Welcome {username}!!!
      </h1>
      
      <form className='app_form'>
        <FormControl className='app_formControl'>
          <Input className='app_input' placeholder="Enter a message..." value = {input} onChange = {event => {setInput(event.target.value)}}  />

          <IconButton className='app_iconButton' disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
            <SendIcon />
          </IconButton>

        </FormControl>
      </form>
      
      <FlipMove>
        {
          messages.map(({id, message}) =>(
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>
      
    </div>
  );
}

export default App;
