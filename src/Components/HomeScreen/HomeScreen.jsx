import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import FlipMove from "react-flip-move";
import "./HomeScreen.css";
import Groups from "../Groups/Groups";

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
    setTimeout(() => {
      document.querySelector(".homeScreen__chat").scrollTop =
        document.querySelector(".homeScreen__chat").scrollHeight;
    }, 1000);
    document.querySelector(".homeScreen__input").focus();
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();

    if (text.length > 0)
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
    document.querySelector(".homeScreen__chat").scrollTop =
      document.querySelector(".homeScreen__chat").scrollHeight;
    document.querySelector(".homeScreen__input").focus();
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
      <div className="homeScreen__left">
        <Groups />
      </div>
      <div className="homeScreen__right">
        <div className="homeScreen__chat">
          <FlipMove>{chat}</FlipMove>
        </div>
        {console.log(
          document.querySelector(".homeScreen__chat")
            ? (document.querySelector(".homeScreen__chat").scrollTop =
                document.querySelector(".homeScreen__chat")?.scrollHeight)
            : null
        )}
        <div className="formContainer">
          <form action="post" className="homeScreen__form">
            <input
              type="text"
              className="homeScreen__input"
              onChange={handleChange}
              value={text}
            />
            <button onClick={handleClick}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
