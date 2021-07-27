import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ user }, dispatch] = useStateValue();
  let history = useHistory();

  const handleChange1 = (e) => {
    setEmail(e.target.value);
  };
  const handleChange2 = (e) => {
    setPassword(e.target.value);
  };
  const logUserIn = (e) => {
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      db.collection("users")
        .get()
        .then((data) =>
          data.docs.map((doc) => {
            if (doc.data().uid === cred.user.uid) {
              if (
                doc.data().avatarUrl ===
                  "https://cdn.discordapp.com/attachments/817706647274651659/865591208742223892/logo.png" &&
                doc.data().bio === "Hey There!!"
              )
                history.push("/edit-profile");
              else history.push("/");

              dispatch({ type: "LOGIN_USER", user: doc.data() });
            }
          })
        );
    });
  };
  return (
    <div className="loginScreen">
      <div className="login">
        <img
          src="https://cdn.discordapp.com/attachments/817706647274651659/865591208742223892/logo.png"
          alt=""
          className="login__logo"
        />
        <div className="login__loginCredentials">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleChange1}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handleChange2}
          />
          <button onClick={logUserIn}>Login</button>
          <Link
            to="/create-account"
            style={{ textDecoration: "none", color: "white" }}
          >
            <p className="login__createAccount">Create a new Account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
