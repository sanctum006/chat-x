import React, { useState } from "react";
import "./CreateAccount.css";
import useFormValidator from "use-form-input-validator";
import { auth } from "./../../firebase";

function CreateAccount({ setSignUp }) {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { values, errors, updateField, isAllFieldsValid } = useFormValidator({
    username: {
      value: "", // defuallt changes
      checks: "required|min:5", // checks to run on the field on change
      validate: (value) => {
        if (value.includes("kepler")) {
          return 'The word "kepler" cannot be included in your username';
        }
      },
    },
    email: {
      value: "",
      checks: "required|email",
    },
    password: {
      value: "", // defualt changes
      checks: "required|min:5",
    },
    confirmPassword: {
      value: "", // defualt changes
      checks: "required|min:5",
      validate: (value, values) => {
        if (value !== values.password) {
          return "Confirm password and password field doesn't match";
        }
      },
    },
  });

  const handleChange = (e) => {
    setInfo((data) => ({ ...data, [e.target.name]: e.target.value }));
    console.log(info);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAllFieldsValid()) {
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((authUser) => {})
        .catch((error) => alert(error));
    }
  };
  return (
    <div className="createAccount">
      <img
        src="https://cdn.discordapp.com/attachments/817706647274651659/865591208742223892/logo.png"
        alt=""
        className="createAccount__logo"
      />
      <div className="form">
        <input
          name="username"
          placeholder="Enter Username"
          onChange={updateField}
        />
        <small>{errors.username}</small>

        <input name="email" placeholder="Enter Email" onChange={updateField} />
        <small>{errors.email}</small>

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={updateField}
        />
        <small>{errors.password}</small>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={updateField}
        />
        <small>{errors.confirmPassword}</small>

        <button onClick={handleSubmit}>Submit</button>
      </div>
      <p>
        Already have an account?{" "}
        <span onClick={() => setSignUp("login")}>Login</span>
      </p>
    </div>
  );
}

export default CreateAccount;
