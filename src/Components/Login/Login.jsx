import React, { useState } from "react";
import "./Login.css";

function Login({ setSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange1 = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const handleChange2 = (e) => {
    setPassword(e.target.value);
  };
  return (
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
        <button>Login</button>
        <p onClick={() => setSignUp("createAccount")}>Create a new Account?</p>
      </div>
    </div>
  );
}

export default Login;
