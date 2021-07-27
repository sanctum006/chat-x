import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import FlipMove from "react-flip-move";
import "./HomeScreen.css";

function HomeScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [{ user }] = useStateValue();
  const [groupID, setGroupID] = useState(null);
  useEffect(() => {
    db.collection("groups").onSnapshot((snapshot) => {
      setGroupID(snapshot.docs[0].id);
      setMessages(
        snapshot.docs[0].data().chats.sort((a, b) => {
          return a.timestamp - b.timestamp;
        })
      );
    });
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    db.collection("groups")
      .doc(groupID)
      .update({
        chats: [
          ...messages,
          {
            message: text,
            username: user.username,
            usernameid: user.usernameid,
            timestamp: `${new Date().getTime()}`,
            messageid: `${user.username}${
              user.usernameid
            }${new Date().getTime()}`,
          },
        ],
      });

    setText("");
  };

  const chat = messages.map((data) => (
    <h1
      key={data.messageid}
      className={`${
        user.username + user.usernameid == data.username + data.usernameid
          ? "myMessage"
          : ""
      }`}
    >
      {data.message}
    </h1>
  ));

  return (
    <div className="homeScreen">
      <div className="formContainer">
        <form action="post" className="homeScreen__form">
          <input type="text" onChange={handleChange} value={text} />
          <button onClick={handleClick}>Send</button>
        </form>
      </div>
      <FlipMove>{chat}</FlipMove>
    </div>
  );
}

export default HomeScreen;
