import React, { useState } from "react";
import Login from "../Login/Login";
import CreateAccount from "../CreateAccount/CreateAccount";
import "./SignUp.css";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="signUp">
      <img
        src="https://cdn.discordapp.com/attachments/817706647274651659/865591208742223892/logo.png"
        alt="chatX-logo"
        className="signUp__logo"
      />
      <Link to="/login">
        <button className="signUp__loginBtn">Login</button>
      </Link>
      <Link to="/create-account">
        <button className="signUp__createAccountBtn">Create Account</button>
      </Link>
    </div>
  );
}

export default SignUp;
