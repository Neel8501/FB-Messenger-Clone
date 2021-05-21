import "./App.css";
import { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Enter your Name"));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      text: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
    /*
    setMessages([...messages, {username:username, text:input}]);
    console.log(messages)
    */
  };

  return (
    <div className="App">
      <img alt="logo" src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&j=100" />
      <h1>Facebook Messenger</h1>
      <h2>Welcome {username}</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="Type message" value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton className="app__iconButton" disabled={!input}
            onClick={sendMessage}
            type="submit"
            variant="contained"
            color="primary">
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({id, data}) => (
          <Message key={id} username={username} message={data} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
