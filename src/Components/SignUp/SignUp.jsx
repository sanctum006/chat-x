import React, { useState } from "react";
import Login from "../Login/Login";
import CreateAccount from "../CreateAccount/CreateAccount";
import "./SignUp.css";

function SignUp() {
  const [signUp, setSignUp] = useState(null);
  return (
    <div className="signUp">
      {!signUp ? (
        <>
          <img
            src="https://cdn.discordapp.com/attachments/817706647274651659/865591208742223892/logo.png"
            alt="chatX-logo"
            className="signUp__logo"
          />
          <button
            onClick={() => {
              setSignUp("login");
            }}
            className="signUp__loginBtn"
          >
            Login
          </button>
          <button
            onClick={() => {
              setSignUp("createAccount");
            }}
            className="signUp__createAccountBtn"
          >
            Create Account
          </button>
        </>
      ) : signUp === "login" ? (
        <Login setSignUp={setSignUp} />
      ) : (
        <CreateAccount setSignUp={setSignUp} />
      )}
    </div>
  );
}

export default SignUp;
